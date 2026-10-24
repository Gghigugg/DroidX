import "server-only";

type TaskInput = {
  title: string;
  assigned_agent_id: string;
  input: Record<string, unknown>;
  idempotency_key: string;
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("TASK_STORE_NOT_CONFIGURED");
  return { url: url.replace(/\/$/, ""), key };
}

async function request(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init.headers
    },
    cache: "no-store"
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`TASK_STORE_HTTP_${response.status}: ${detail.slice(0, 250)}`);
  }
  return response.status === 204 ? [] : response.json();
}

export async function listTasks(limit = 25) {
  return request(`agent_tasks?select=id,title,assigned_agent_id,status,input,result,error,idempotency_key,created_at,updated_at&order=created_at.desc&limit=${Math.max(1, Math.min(limit, 100))}`);
}

export async function createTask(task: TaskInput) {
  const inserted = await request("agent_tasks?on_conflict=idempotency_key", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({
      title: task.title,
      assigned_agent_id: task.assigned_agent_id,
      input: task.input,
      idempotency_key: task.idempotency_key,
      status: "pending"
    })
  });
  if (Array.isArray(inserted) && inserted[0]) return { task: inserted[0], duplicate: false };
  const existing = await request(`agent_tasks?select=id,title,assigned_agent_id,status,input,result,error,idempotency_key,created_at,updated_at&idempotency_key=eq.${encodeURIComponent(task.idempotency_key)}&limit=1`);
  if (!Array.isArray(existing) || !existing[0]) throw new Error("TASK_STORE_DUPLICATE_LOOKUP_FAILED");
  return { task: existing[0], duplicate: true };
}

export async function claimTask(taskId: string) {
  const claimed = await request(`agent_tasks?id=eq.${encodeURIComponent(taskId)}&status=eq.pending`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ status: "running", updated_at: new Date().toISOString() })
  });
  return Array.isArray(claimed) ? claimed[0] ?? null : null;
}

export async function finishTask(taskId: string, result: Record<string, unknown>) {
  return request(`agent_tasks?id=eq.${encodeURIComponent(taskId)}&status=eq.running`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ status: "completed", result, updated_at: new Date().toISOString(), error: null })
  });
}

export async function failTask(taskId: string, error: string) {
  return request(`agent_tasks?id=eq.${encodeURIComponent(taskId)}&status=eq.running`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ status: "failed", error: error.slice(0, 500), updated_at: new Date().toISOString() })
  });
}

import { NextRequest, NextResponse } from "next/server";
import { AGENTS } from "@/src/agents/registry";
import { createTask, listTasks } from "@/src/lib/task-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  const expected = process.env.IG_AGENT_INTERNAL_API_KEY;
  return Boolean(expected && request.headers.get("authorization") === `Bearer ${expected}`);
}

function storageError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message === "TASK_STORE_NOT_CONFIGURED") {
    return NextResponse.json({ error: "Task storage is not configured. Add server-only Supabase environment variables." }, { status: 503 });
  }
  // Do not return provider response bodies or credentials to callers.
  console.error("IG Agent OS task storage error:", message.slice(0, 300));
  return NextResponse.json({ error: "Task storage request failed. Check server configuration and logs." }, { status: 502 });
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rawLimit = Number(request.nextUrl.searchParams.get("limit") ?? "25");
  const limit = Number.isInteger(rawLimit) ? Math.max(1, Math.min(rawLimit, 100)) : 25;
  try {
    return NextResponse.json({ tasks: await listTasks(limit) });
  } catch (error) {
    return storageError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a task object." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const assignedAgentId = typeof data.assignedAgentId === "string" ? data.assignedAgentId : "";
  const idempotencyKey = typeof data.idempotencyKey === "string" ? data.idempotencyKey.trim() : "";
  const input = data.input && typeof data.input === "object" && !Array.isArray(data.input)
    ? data.input as Record<string, unknown>
    : {};

  if (title.length < 3 || title.length > 160) {
    return NextResponse.json({ error: "title must contain 3–160 characters." }, { status: 400 });
  }
  if (!AGENTS.some(agent => agent.id === assignedAgentId)) {
    return NextResponse.json({ error: "assignedAgentId is not in the registered agent roster." }, { status: 400 });
  }
  if (idempotencyKey.length < 8 || idempotencyKey.length > 160) {
    return NextResponse.json({ error: "idempotencyKey must contain 8–160 characters." }, { status: 400 });
  }
  if (JSON.stringify(input).length > 12000) {
    return NextResponse.json({ error: "input must be smaller than 12 KB." }, { status: 400 });
  }

  try {
    const result = await createTask({
      title,
      assigned_agent_id: assignedAgentId,
      input,
      idempotency_key: idempotencyKey
    });
    return NextResponse.json(result, { status: result.duplicate ? 200 : 201 });
  } catch (error) {
    return storageError(error);
  }
}

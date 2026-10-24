import type { AgentTask, TaskStatus } from "@/src/agents/types";

const allowedTransitions: Record<TaskStatus, TaskStatus[]> = {
  pending: ["running", "approval-required", "failed"],
  running: ["completed", "failed", "approval-required"],
  "approval-required": ["pending", "completed", "failed"],
  completed: [],
  failed: ["pending"]
};

export function canTransition(from: TaskStatus, to: TaskStatus): boolean {
  return allowedTransitions[from].includes(to);
}

export function transitionTask(task: AgentTask, status: TaskStatus, now = new Date().toISOString()): AgentTask {
  if (!canTransition(task.status, status)) {
    throw new Error(`Invalid task transition: ${task.status} -> ${status}`);
  }
  return { ...task, status, updatedAt: now };
}

export function hasDuplicateAction(tasks: AgentTask[], idempotencyKey: string): boolean {
  return tasks.some(task => task.idempotencyKey === idempotencyKey && task.status !== "failed");
}

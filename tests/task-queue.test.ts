import { describe, expect, it } from "vitest";
import type { AgentTask } from "../src/agents/types";
import { canTransition, hasDuplicateAction, transitionTask } from "../src/orchestration/task-queue";

const sample: AgentTask = {
  id: "t1", title: "Draft caption", assignedAgentId: "script-writer", status: "pending",
  input: {}, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
  idempotencyKey: "caption:campaign-1"
};

describe("task queue", () => {
  it("allows pending tasks to start", () => expect(canTransition("pending", "running")).toBe(true));
  it("rejects completing a pending task without running it", () => expect(canTransition("pending", "completed")).toBe(false));
  it("returns a new task with updated status and timestamp", () => {
    const updated = transitionTask(sample, "running", "2026-01-02T00:00:00.000Z");
    expect(updated.status).toBe("running");
    expect(updated.updatedAt).toBe("2026-01-02T00:00:00.000Z");
    expect(sample.status).toBe("pending");
  });
  it("prevents duplicate non-failed actions with the same key", () => {
    expect(hasDuplicateAction([sample], "caption:campaign-1")).toBe(true);
    expect(hasDuplicateAction([{ ...sample, status: "failed" }], "caption:campaign-1")).toBe(false);
  });
});

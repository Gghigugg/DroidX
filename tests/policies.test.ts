import { describe, expect, it } from "vitest";
import { AGENTS } from "../src/agents/registry";
import { evaluateAction } from "../src/policies/permissions";
import { planGoal } from "../src/agents/manager";

describe("action policies", () => {
  it("blocks live publish actions in the scaffold", () => {
    const publishing = AGENTS.find(agent => agent.id === "publishing")!;
    const decision = evaluateAction(publishing, "publish-content");
    expect(decision.allowed).toBe(false);
    expect(decision.requiresApproval).toBe(true);
  });
  it("creates a valid content plan with human review at the end", () => {
    const tasks = planGoal("content-plan");
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[tasks.length - 1].requiresHumanReview).toBe(true);
    expect(tasks.every(task => AGENTS.some(agent => agent.id === task.assignedAgentId))).toBe(true);
  });
});

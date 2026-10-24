import type { AgentDefinition, AgentTask } from "@/src/agents/types";

export type ActionKind = "research" | "draft" | "send-message" | "publish-content" | "account-change";

export type PolicyDecision = { allowed: boolean; requiresApproval: boolean; reason: string };

const alwaysApproval: ActionKind[] = ["send-message", "publish-content", "account-change"];

export function evaluateAction(agent: AgentDefinition, action: ActionKind, task?: AgentTask): PolicyDecision {
  if (alwaysApproval.includes(action)) {
    return { allowed: false, requiresApproval: true, reason: "Live account actions are disabled in the scaffold and require explicit human approval." };
  }
  if (agent.requiresApproval && task?.status !== "approval-required") {
    return { allowed: true, requiresApproval: true, reason: "This specialist's output must be reviewed before it is used." };
  }
  return { allowed: true, requiresApproval: false, reason: "Permitted as a draft or research-only operation." };
}

import { AGENTS } from "./registry";
import type { AgentId } from "./types";

export type GoalKind = "community" | "content-plan" | "analytics" | "brand-research";
export type PlannedTask = { title: string; assignedAgentId: AgentId; reason: string; requiresHumanReview: boolean };

const plans: Record<GoalKind, PlannedTask[]> = {
  community: [
    { title: "Classify incoming items by intent and urgency", assignedAgentId: "comment-manager", reason: "Triage before drafting responses.", requiresHumanReview: false },
    { title: "Draft suggested replies for review", assignedAgentId: "comment-reply", reason: "Responses must be reviewed before use.", requiresHumanReview: true },
    { title: "Check drafts for abuse, scams, and sensitive cases", assignedAgentId: "community-safety", reason: "Flag risky cases for a person.", requiresHumanReview: true },
    { title: "Run final quality checks", assignedAgentId: "quality-checker", reason: "Check tone and factual claims.", requiresHumanReview: true }
  ],
  "content-plan": [
    { title: "Research niche opportunities", assignedAgentId: "niche-researcher", reason: "Start from audience needs.", requiresHumanReview: false },
    { title: "Collect permitted trend signals", assignedAgentId: "trend-researcher", reason: "Use public or user-provided research.", requiresHumanReview: false },
    { title: "Generate original reel concepts", assignedAgentId: "reel-ideas", reason: "Turn research into ideas.", requiresHumanReview: false },
    { title: "Write scripts and hooks", assignedAgentId: "script-writer", reason: "Prepare drafts for the creator.", requiresHumanReview: false },
    { title: "Build a weekly calendar", assignedAgentId: "content-calendar", reason: "Arrange ideas into a practical schedule.", requiresHumanReview: true }
  ],
  analytics: [
    { title: "Summarize supplied or connected insights", assignedAgentId: "analytics", reason: "Use only permitted data.", requiresHumanReview: false },
    { title: "Recommend measurable experiments", assignedAgentId: "experiments", reason: "Translate observations into tests.", requiresHumanReview: false },
    { title: "Review recommendations for realistic claims", assignedAgentId: "quality-checker", reason: "Avoid guarantees about reach or virality.", requiresHumanReview: true }
  ],
  "brand-research": [
    { title: "Research brand-fit opportunities from permitted public sources", assignedAgentId: "brand-deals", reason: "Find relevant partnership leads.", requiresHumanReview: false },
    { title: "Match potential creator collaborations", assignedAgentId: "collaborations", reason: "Identify aligned partnership ideas.", requiresHumanReview: false },
    { title: "Review claims and contact suggestions", assignedAgentId: "quality-checker", reason: "Human review before outreach.", requiresHumanReview: true }
  ]
};

export function planGoal(goal: GoalKind): PlannedTask[] {
  const available = new Set(AGENTS.map(agent => agent.id));
  return plans[goal].filter(task => available.has(task.assignedAgentId));
}

export type AgentId =
  | "chief-manager"
  | "dm-manager" | "dm-reply" | "comment-manager" | "comment-reply" | "community-safety"
  | "trend-researcher" | "niche-researcher" | "reel-ideas" | "script-writer" | "caption-hashtag"
  | "creative-director" | "story-carousel" | "repurposing" | "content-calendar" | "publishing"
  | "quality-checker" | "analytics" | "growth-strategist" | "competitor-research" | "discovery-seo"
  | "brand-deals" | "collaborations" | "lead-qualification" | "experiments" | "brand-memory";

export type AgentDefinition = {
  id: AgentId;
  name: string;
  specialty: string;
  description: string;
  group: "management" | "community" | "research" | "content" | "growth" | "business" | "governance";
  requiresApproval: boolean;
};

export type TaskStatus = "pending" | "running" | "completed" | "failed" | "approval-required";
export type AgentTask = {
  id: string;
  title: string;
  assignedAgentId: AgentId;
  status: TaskStatus;
  input: Record<string, unknown>;
  result?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  error?: string;
  idempotencyKey: string;
};

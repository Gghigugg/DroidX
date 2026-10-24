import type { AgentDefinition } from "./types";

export const AGENTS: AgentDefinition[] = [
  { id: "chief-manager", name: "Chief AI Manager", specialty: "Orchestration", description: "Breaks goals into safe, trackable tasks and routes them to specialists.", group: "management", requiresApproval: true },
  { id: "dm-manager", name: "DM Manager", specialty: "Inbox triage", description: "Classifies incoming messages and routes them to the correct workflow.", group: "community", requiresApproval: true },
  { id: "dm-reply", name: "DM Reply Specialist", specialty: "Reply drafting", description: "Drafts context-aware responses; never sends without approved integration and permission.", group: "community", requiresApproval: true },
  { id: "comment-manager", name: "Comment Manager", specialty: "Comment triage", description: "Groups comments by intent, urgency, and risk.", group: "community", requiresApproval: true },
  { id: "comment-reply", name: "Comment Reply Specialist", specialty: "Comment drafts", description: "Creates suggested replies for human review.", group: "community", requiresApproval: true },
  { id: "community-safety", name: "Community Safety Agent", specialty: "Safety moderation", description: "Flags harassment, scams, sensitive topics, and escalation cases.", group: "governance", requiresApproval: true },
  { id: "trend-researcher", name: "Trend Researcher", specialty: "Trend discovery", description: "Collects trend signals from permitted public sources and user-provided research.", group: "research", requiresApproval: false },
  { id: "niche-researcher", name: "Niche Researcher", specialty: "Audience insight", description: "Summarizes audience needs and niche-specific content opportunities.", group: "research", requiresApproval: false },
  { id: "reel-ideas", name: "Reel Idea Agent", specialty: "Idea generation", description: "Turns research into original short-form video concepts.", group: "content", requiresApproval: false },
  { id: "script-writer", name: "Script Writer", specialty: "Video scripting", description: "Writes hooks, beats, voiceover, and calls to action.", group: "content", requiresApproval: false },
  { id: "caption-hashtag", name: "Caption & Hashtag Agent", specialty: "Captions", description: "Drafts captions and relevant discovery terms without promising virality.", group: "content", requiresApproval: false },
  { id: "creative-director", name: "Creative Director", specialty: "Creative quality", description: "Sets visual direction and checks consistency with the creator brief.", group: "content", requiresApproval: false },
  { id: "story-carousel", name: "Carousel & Story Agent", specialty: "Stories and carousels", description: "Outlines slide sequences, story frames, and interaction prompts.", group: "content", requiresApproval: false },
  { id: "repurposing", name: "Content Repurposing Agent", specialty: "Repurposing", description: "Adapts approved source content to platform-appropriate formats.", group: "content", requiresApproval: false },
  { id: "content-calendar", name: "Content Calendar Agent", specialty: "Planning", description: "Builds a realistic calendar from goals, capacity, and planned campaigns.", group: "content", requiresApproval: false },
  { id: "publishing", name: "Publishing Agent", specialty: "Publishing workflow", description: "Prepares publishing jobs; live publishing remains disabled until official API setup and approval.", group: "governance", requiresApproval: true },
  { id: "quality-checker", name: "Quality Checker", specialty: "QA review", description: "Checks claims, spelling, brand fit, accessibility, and policy risks.", group: "governance", requiresApproval: false },
  { id: "analytics", name: "Analytics Agent", specialty: "Performance analysis", description: "Analyzes connected, permitted insights or clearly labelled imported data.", group: "growth", requiresApproval: false },
  { id: "growth-strategist", name: "Growth Strategist", specialty: "Growth planning", description: "Recommends sustainable experiments without fake engagement or spam.", group: "growth", requiresApproval: false },
  { id: "competitor-research", name: "Competitor Researcher", specialty: "Competitive research", description: "Summarizes public, permitted competitor signals and content positioning.", group: "research", requiresApproval: false },
  { id: "discovery-seo", name: "SEO & Discovery Agent", specialty: "Discovery optimization", description: "Improves profile and post metadata for relevant discovery.", group: "growth", requiresApproval: false },
  { id: "brand-deals", name: "Brand Deal Finder", specialty: "Partnership research", description: "Finds potential brand-fit opportunities from permitted public sources.", group: "business", requiresApproval: false },
  { id: "collaborations", name: "Creator Collaboration Agent", specialty: "Collaboration matching", description: "Suggests relevant creator partners and collaboration concepts.", group: "business", requiresApproval: false },
  { id: "lead-qualification", name: "Lead Qualification Agent", specialty: "Lead triage", description: "Organizes opt-in inquiries and drafts qualification questions.", group: "business", requiresApproval: true },
  { id: "experiments", name: "Experiment Agent", specialty: "Testing", description: "Designs measurable content experiments and records outcomes.", group: "growth", requiresApproval: false },
  { id: "brand-memory", name: "Brand Memory & Learning Agent", specialty: "Brand context", description: "Maintains approved brand voice, preferences, and lessons learned.", group: "management", requiresApproval: false }
];

export const CHIEF_MANAGER = AGENTS[0];

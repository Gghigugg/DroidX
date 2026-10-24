export type AuditEvent = {
  eventId: string;
  action: string;
  actor: string;
  targetId?: string;
  occurredAt: string;
  outcome: "allowed" | "blocked" | "review-required" | "failed";
  details?: Record<string, unknown>;
};

export function createAuditEvent(input: Omit<AuditEvent, "eventId" | "occurredAt">, now = new Date()): AuditEvent {
  return {
    ...input,
    eventId: `audit_${now.getTime()}_${Math.random().toString(36).slice(2, 8)}`,
    occurredAt: now.toISOString()
  };
}

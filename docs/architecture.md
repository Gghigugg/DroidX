# Architecture

## Runtime layers
1. Dashboard UI — tasks, team roster, review queue, calendar, analytics placeholders.
2. Chief Manager — breaks supported goal types into typed tasks and routes them to specialist agents.
3. Task queue — legal status transitions, idempotency key, timestamps, error tracking.
4. Policy layer — approval gates and permission decisions.
5. Provider adapters — official Meta API only; dry-run adapter first.
6. Storage — Supabase migration for tasks, approvals, audit events, and content plans.
7. CI — GitHub Actions runs tests and a production build on pull requests.

## Current implementation
The dashboard uses sample rows and labels them demo data. The registry defines the Chief Manager and 25 specialists. The manager has deterministic starter plans for community triage, content planning, analytics, and brand research. Task transition helpers and policy scaffolding are unit-tested. The Instagram provider is dry-run only.

## Not implemented yet
No AI model is called, no OAuth flow exists, no Supabase connection is wired, and no Instagram messages/posts are sent. Live integration requires secure server-side implementation, permission review, rate limits, idempotency, audit logging, and human approval.

## Next milestones
- Run CI and fix any build/test issues.
- Add workspace authentication and tenant-aware row-level security policies.
- Implement server-side manager with an AI provider adapter.
- Add Meta OAuth setup for eligible professional accounts.
- Implement inbox/content calendar/analytics modules incrementally.

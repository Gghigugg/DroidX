# Architecture

## Runtime layers
1. Dashboard UI — tasks, team roster, review queue, calendar, analytics placeholders.
2. Chief Manager — plans goals into typed tasks and selects specialist agents.
3. Task queue — status transitions, idempotency key, timestamps, error tracking.
4. Policy layer — approvals, permission checks, rate limits, audit events.
5. Provider adapters — official Meta API only; mock adapter first.
6. Storage — Supabase migrations and server-side access when configured.

## Initial implementation
This commit contains a static dashboard with demo rows, typed roster, task transition helpers, and policy scaffolding. It does not call AI APIs, Supabase, or Meta.

## Next milestones
- Add tests and CI.
- Add Supabase schema for tasks, approvals, audit logs, brand profiles, and content plans.
- Implement server-side manager planner with an AI provider interface.
- Add mock Instagram provider tests, then OAuth setup for eligible professional accounts.
- Implement inbox/content calendar/analytics modules incrementally.

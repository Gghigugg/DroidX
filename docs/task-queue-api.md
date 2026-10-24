# Protected task API scaffold

The `/api/tasks` route now exists, but deliberately fails closed until persistent storage and workspace authentication are implemented. It is not a live task queue yet.

## Current behavior

- `GET /api/tasks?limit=25` returns `401` unless a server-side `IG_AGENT_INTERNAL_API_KEY` matches the Bearer token. With the key, it returns `503` because storage is not connected.
- `POST /api/tasks` applies the same auth gate, validates the JSON task title, registered agent ID, idempotency key, and input size, then returns `503` without pretending to save anything.
- No task is persisted, no agent runs, and no Instagram message or post is sent.

## Environment planning

When storage is implemented, configure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `IG_AGENT_INTERNAL_API_KEY` in the hosting provider's server-only environment. Never expose secrets in browser code, GitHub commits, screenshots, or `NEXT_PUBLIC_*` variables.

## Before enabling persistence

1. Review `supabase/migrations/202610250001_initial_schema.sql` before applying it to a Supabase project.
2. Add real user/workspace authentication and authorization, rate limiting, and per-workspace row-level security.
3. Keep service-role credentials server-side and restrict the internal key to trusted server-to-server callers.
4. Implement audit events, duplicate-action prevention, and approval records in the persistent queue.
5. Keep Instagram in dry-run mode until official Meta OAuth, approved permissions, secure token storage, and human approval flows are implemented.

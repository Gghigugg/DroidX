# Protected task queue API

The task API should remain server-to-server until workspace authentication is implemented. Never expose a server secret in client code or a NEXT_PUBLIC variable.

## Planned endpoints

- `GET /api/tasks?limit=25` lists recent tasks.
- `POST /api/tasks` creates a pending task after validating the registered agent ID and an idempotency key.

## Setup requirements

1. Review and apply `supabase/migrations/202610250001_initial_schema.sql` in your own Supabase project.
2. Configure server-only `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `IG_AGENT_INTERNAL_API_KEY` in the hosting provider.
3. Do not place the service-role key or internal API key in browser code, GitHub commits, screenshots, or `NEXT_PUBLIC_*` variables.

## Safety and current limits

The current dashboard planner is a local preview. Task storage is not connected until the protected server route is implemented and configured. The current scaffold does not run agents, call an AI provider, connect Instagram, send DMs, publish posts, or schedule content. Before exposing task creation to normal users, implement real user/workspace authentication, authorization, rate limiting, and per-workspace RLS. Keep Instagram in dry-run mode until official Meta OAuth, approved permissions, secure token storage, audit logging, and human approval flows are implemented.

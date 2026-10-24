# Protected persistent task API

The server-side `/api/tasks` endpoints now support Supabase REST persistence. They are gated by a server-to-server bearer secret and are not meant to be called directly from a public browser.

## Configure

1. Review and apply `supabase/migrations/202610250001_initial_schema.sql` in your Supabase project.
2. In the hosting provider's server-only environment, set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a long random `IG_AGENT_INTERNAL_API_KEY`.
3. Redeploy after adding variables. Never place service-role or internal keys in browser code, GitHub commits, screenshots, or `NEXT_PUBLIC_*` variables.
4. If these values are missing, the API fails closed with `503`. No successful save is reported.

## Endpoints

Both endpoints require `Authorization: Bearer <IG_AGENT_INTERNAL_API_KEY>`.

- `GET /api/tasks?limit=25` lists recent tasks (limit capped at 100).
- `POST /api/tasks` creates a pending task after validation.

Example POST body:

```json
{
  "title": "Draft three reel concepts",
  "assignedAgentId": "reel-ideas",
  "idempotencyKey": "reels-week-2026-44",
  "input": { "niche": "photo editing", "count": 3 }
}
```

The database unique constraint on `idempotency_key` prevents duplicate inserts. Reusing a key returns the existing task. Agent IDs are checked against the registry and input size is limited.

## Important limitations

- This stores task records; it does not run agent workflows, call an AI model, connect Instagram, send DMs, publish posts, or schedule content.
- The dashboard planner remains local-only because a browser must never receive the internal API key. Before user-facing task creation, implement Supabase Auth, user/workspace authorization, tenant-scoped row-level security, and rate limiting.
- The service-role key bypasses RLS and must stay server-side. The internal key is a temporary server-to-server gate, not a replacement for user authentication.
- Keep Instagram in dry-run mode until official Meta OAuth, approved permissions, secure token storage, audit logging, duplicate-action protection, and human approval flows are implemented.

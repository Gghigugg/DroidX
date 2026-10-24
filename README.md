# IG Agent OS

Original, mobile-first Instagram multi-agent workspace.

## Status
This is an early scaffold, not a live Instagram integration. The dashboard uses demo task data. No Instagram account is connected and no messages or posts are sent.

## What's included
- Chief AI Manager + 25 specialist agent definitions.
- Typed task lifecycle and duplicate-action helper.
- Deterministic starter task plans for content, community, analytics, and brand research.
- Human approval policy scaffolding and dry-run Instagram provider.
- Supabase schema for tasks, approvals, audit events, and content plans.
- Unit tests and GitHub Actions checks.

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Test and build
```bash
npm run test
npm run build
```

## Safety
Use only Meta's official APIs and permitted permissions. Respect platform rate limits and messaging windows. Never store Instagram passwords, scrape private data, or automate spam/fake engagement. Keep secrets server-side. Live actions remain disabled until proper integration and human approval.

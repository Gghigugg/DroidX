# IG Agent OS

Original, mobile-first Instagram multi-agent workspace. This repository is being rebuilt from the previous OFFX Tools site into a policy-first creator operations dashboard.

## Status
This is the first scaffold, not a live Instagram integration. The dashboard uses demo task data and clearly labels it as such. No Instagram account is connected and no messages or posts are sent.

## Architecture
- One Chief Manager coordinates 25 specialist agent definitions.
- Task lifecycle: pending, running, completed, failed, approval-required.
- Human approval gates for public-facing or account-changing actions.
- Provider interface boundary for future official Meta Instagram API integration.
- Supabase and AI provider configuration are optional and must stay server-side.

## Local development
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment
Copy `.env.example` to `.env.local` only when configuring integrations. Never commit real credentials.

## Safety
Use only Meta's official APIs and permitted permissions. Respect platform rate limits and messaging windows. Never store Instagram passwords, scrape private data, or automate spam/fake engagement. The initial scaffold is dry-run only.

# IG Agent OS — contributor guide

Build an original multi-agent creator operations product; do not copy third-party agent skills or claim integrations work before they are implemented.

## Rules
- Mobile-first, accessible UI with premium white/translucent glass styling.
- TypeScript strict mode; prefer small typed modules.
- Never place API keys, OAuth tokens, or service-role secrets in client code.
- Any live Instagram action must use an official Meta API adapter, enforce permission checks, deduplicate requests, rate-limit, and log outcomes.
- Public-facing actions require explicit approval by default.
- Demo metrics/tasks must be labeled as demo data.
- Do not add scraping, password collection, unsolicited bulk messaging, or engagement manipulation.
- Add tests for task transitions, permissions, and duplicate-action prevention.
- Explain what is implemented vs. mocked in every completion summary.

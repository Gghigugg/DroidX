# Permissions and safety

- Use Meta's official Instagram Graph API and approved permissions only.
- Never request or store the user's Instagram password.
- Keep access tokens and app secrets server-side; do not expose them via NEXT_PUBLIC variables.
- Require explicit review before sending messages, publishing content, or changing account settings.
- Respect platform messaging windows, API quotas, rate limits, and account eligibility.
- Use idempotency keys to prevent duplicate sends.
- Maintain audit records for task assignment, approvals, API calls, and failures.
- Do not scrape private accounts, send unsolicited bulk DMs, buy engagement, or impersonate users.
- Use mock/dry-run behavior until integration setup and testing are complete.

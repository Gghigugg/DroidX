-- IG Agent OS initial data model. Apply only after reviewing the migration.
create extension if not exists pgcrypto;

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  assigned_agent_id text not null,
  status text not null default 'pending'
    check (status in ('pending','running','completed','failed','approval-required')),
  input jsonb not null default '{}'::jsonb,
  result jsonb,
  idempotency_key text not null unique,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agent_tasks_status_created_idx
  on public.agent_tasks (status, created_at desc);

create table if not exists public.action_approvals (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.agent_tasks(id) on delete cascade,
  requested_action text not null check (requested_action in ('send-message','publish-content','account-change')),
  status text not null default 'pending' check (status in ('pending','approved','rejected','expired')),
  requested_by uuid,
  reviewed_by uuid,
  reason text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.agent_tasks(id) on delete set null,
  action text not null,
  actor text not null,
  outcome text not null check (outcome in ('allowed','blocked','review-required','failed')),
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.content_plans (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  channel text not null default 'instagram',
  planned_for timestamptz,
  status text not null default 'draft' check (status in ('draft','review','approved','scheduled','published','cancelled')),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS now; production policies should be added alongside a real auth/tenant model.
alter table public.agent_tasks enable row level security;
alter table public.action_approvals enable row level security;
alter table public.audit_events enable row level security;
alter table public.content_plans enable row level security;

-- Intentionally no permissive client policies are created in this scaffold.
-- Access should be mediated by authenticated server-side code after workspace membership is implemented.

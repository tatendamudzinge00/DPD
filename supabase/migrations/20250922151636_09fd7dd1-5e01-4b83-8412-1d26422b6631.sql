-- Create table to store email verification codes
create table if not exists public.email_verification_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null,
  code text not null,
  used boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '15 minutes')
);

-- Enable RLS (Edge Functions will use service role and bypass RLS)
alter table public.email_verification_codes enable row level security;

-- Helpful indexes
create index if not exists idx_email_verification_codes_email on public.email_verification_codes (email);
create index if not exists idx_email_verification_codes_email_code_active on public.email_verification_codes (email, code) where used = false;

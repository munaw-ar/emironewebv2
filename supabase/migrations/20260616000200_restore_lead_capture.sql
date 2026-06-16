-- Restore the lead-capture pipeline (2026-06-16 audit).
-- The documented edge functions (subscribe-newsletter, log-analytics,
-- capture-lead) were never deployed, so every submission 404'd and was silently
-- dropped. Re-enable controlled, WRITE-ONLY anon INSERT with email validation;
-- reads stay admin-only. Idempotent.

-- newsletter signups
grant insert on public.newsletter_subscribers to anon;
drop policy if exists "Anon can subscribe" on public.newsletter_subscribers;
create policy "Anon can subscribe" on public.newsletter_subscribers
  for insert to anon with check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- research analytics (write-only events)
grant insert on public.research_analytics to anon;
drop policy if exists "Anon can log analytics" on public.research_analytics;
create policy "Anon can log analytics" on public.research_analytics
  for insert to anon with check (content_type is not null and event_type is not null);

-- booking-funnel leads (PII: write-only for anon, admin reads/manages)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  company_name text,
  website text,
  phone text,
  goal text,
  source text default 'book',
  created_at timestamptz not null default now(),
  metadata jsonb default '{}'::jsonb
);
alter table public.leads enable row level security;
grant insert on public.leads to anon;
grant all on public.leads to authenticated, service_role;
drop policy if exists "Anon can submit a lead" on public.leads;
create policy "Anon can submit a lead" on public.leads
  for insert to anon with check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
drop policy if exists "Admins can manage leads" on public.leads;
create policy "Admins can manage leads" on public.leads
  for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

-- harden the public research-files bucket (no SVG -> avoids script-in-svg upload)
update storage.buckets
  set file_size_limit = 26214400,
      allowed_mime_types = array['application/pdf','image/png','image/jpeg','image/webp']
  where id = 'research-files';

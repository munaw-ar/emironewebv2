-- Security hardening from the 2026-06-16 defensive audit.
-- Idempotent so it is safe to re-run via `supabase db push`.

-- 1. Publish-gate methodology_page.
--    It was the only content table whose public SELECT policy used qual = true
--    (world-readable regardless of draft/edit state); every other content table
--    gates on is_published. Add the column, keep the current row published, and
--    replace the open policy with a publish-gated one.
alter table public.methodology_page
  add column if not exists is_published boolean not null default false;

update public.methodology_page
  set is_published = true
  where is_published is distinct from true;

drop policy if exists "Public can view methodology" on public.methodology_page;

create policy "Public can view published methodology"
  on public.methodology_page
  for select
  to anon, authenticated
  using (is_published = true);

-- 2. The admin-bootstrap trigger function is invoked only by triggers on
--    auth.users; it must never be directly callable as an RPC.
revoke execute on function public.handle_new_admin_user() from anon, authenticated, public;

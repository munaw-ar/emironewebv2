-- Remove redundant SELECT policies on newsletter_subscribers
-- The "Admins can manage subscribers" policy already covers ALL operations including SELECT
-- These additional policies are redundant and add confusion

DROP POLICY IF EXISTS "Only admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anon cannot view subscribers" ON public.newsletter_subscribers;

-- The remaining policies are:
-- 1. "Admins can manage subscribers" - FOR ALL (covers SELECT, INSERT, UPDATE, DELETE for admins)
-- 2. "Anyone can subscribe" - FOR INSERT (allows public subscriptions)
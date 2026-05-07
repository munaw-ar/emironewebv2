-- Fix RLS policies that use WITH CHECK (true) for INSERT operations
-- These need to be removed as inserts are now handled via edge functions with validation

-- 1. Drop the permissive INSERT policy on newsletter_subscribers
-- Subscriptions are now handled exclusively through the subscribe-newsletter edge function
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

-- 2. Drop the permissive INSERT policy on research_analytics
-- Analytics logging is now handled exclusively through the log-analytics edge function
DROP POLICY IF EXISTS "Anyone can log analytics" ON public.research_analytics;

-- Note: Both tables already have admin policies for full management
-- newsletter_subscribers: "Admins can manage subscribers" (ALL)
-- research_analytics: "Admins can view analytics" (SELECT)

-- Add admin INSERT policy for research_analytics to allow edge function with service role
-- The edge function uses service role which bypasses RLS, but this documents intent
CREATE POLICY "Service role can insert analytics"
ON public.research_analytics
FOR INSERT
TO service_role
WITH CHECK (true);

-- Add explicit admin INSERT policy for newsletter_subscribers backup
-- The edge function uses service role which bypasses RLS
CREATE POLICY "Service role can manage subscribers"
ON public.newsletter_subscribers
FOR INSERT
TO service_role
WITH CHECK (true);
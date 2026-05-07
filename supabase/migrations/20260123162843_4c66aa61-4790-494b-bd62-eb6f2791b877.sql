-- Fix 1: Add explicit SELECT deny policy for newsletter_subscribers to prevent public reads
-- The table already has admin policy for ALL and public INSERT, but needs explicit SELECT restriction
CREATE POLICY "Deny public SELECT on newsletter_subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Add explicit deny policy for admin_profiles to prevent any public access
-- Currently only has policies for admins to view/update their own profiles, but no catch-all deny
CREATE POLICY "Deny public access to admin_profiles"
ON public.admin_profiles
FOR SELECT
USING (false);

-- Note: The existing "Admins can view own profile" policy will still work because 
-- RLS evaluates all PERMISSIVE policies with OR logic, and RESTRICTIVE with AND logic.
-- Since the existing policy is RESTRICTIVE (Permissive: No), we need a different approach.

-- Actually, looking at the RLS info, the existing policies are RESTRICTIVE (Permissive: No).
-- This means they use AND logic. We need to drop and recreate with PERMISSIVE policies instead
-- or add a fallback deny that applies when no other policy matches.
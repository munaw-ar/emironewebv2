-- Fix the admin_profiles policy issue - the USING(false) policy conflicts with existing RESTRICTIVE policies
-- Drop the incorrect deny policy and ensure the existing admin-only policies are sufficient
DROP POLICY IF EXISTS "Deny public access to admin_profiles" ON public.admin_profiles;

-- The existing policies on admin_profiles are RESTRICTIVE and require both:
-- 1. user_id = auth.uid() (user can only access their own profile)
-- 2. has_role(auth.uid(), 'admin') (user must be admin)
-- This is already secure - anonymous users cannot access because auth.uid() is NULL for them
-- and the has_role check will fail. No additional policy needed.
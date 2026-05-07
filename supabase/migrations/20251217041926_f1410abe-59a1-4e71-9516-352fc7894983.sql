-- Create a secure RPC function for checking user role
-- This avoids direct client-side table queries
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;
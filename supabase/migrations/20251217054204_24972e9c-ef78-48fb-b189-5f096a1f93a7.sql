-- Fix critical vulnerability: Admin auto-provisioning without email verification
-- The current trigger grants admin role BEFORE email is confirmed, allowing attackers to register with admin email

-- Drop the existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a new function that checks email_confirmed_at
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- CRITICAL: Only grant admin AFTER email is confirmed
  -- This prevents attackers from registering with admin email and getting instant access
  IF NEW.email = 'munawar.tanjim@emirone.com' 
     AND NEW.email_confirmed_at IS NOT NULL THEN
    
    -- Use ON CONFLICT to prevent duplicate inserts
    INSERT INTO public.admin_profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Munawar Anjum'))
    ON CONFLICT (user_id) DO NOTHING;
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger that fires on UPDATE when email is confirmed
-- This ensures admin role is only granted AFTER email verification
CREATE TRIGGER on_auth_user_email_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Also add trigger for INSERT in case auto-confirm is enabled (email_confirmed_at set immediately)
CREATE TRIGGER on_auth_user_created_with_confirmed_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_admin_user();
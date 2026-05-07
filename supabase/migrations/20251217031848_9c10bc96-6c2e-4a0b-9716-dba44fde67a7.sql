-- Drop the existing trigger function and recreate with email check
DROP FUNCTION IF EXISTS public.handle_new_admin_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only grant admin role to specific email
  IF NEW.email = 'munawar.tanjim@emirone.com' THEN
    INSERT INTO public.admin_profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Munawar Anjum'));
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
-- Close the admin-bootstrap takeover vector (2026-06-16 audit).
-- The trigger granted admin to ANY account that registered + confirmed the
-- hardcoded email. With public signup open, that made the email a single point
-- of compromise. Make it bootstrap-once: never auto-grant admin when an admin
-- already exists, while preserving recovery if there are ever zero admins.
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.email = 'munawar.tanjim@emirone.com'
     AND NEW.email_confirmed_at IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::app_role) THEN

    INSERT INTO public.admin_profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Munawar Anjum'))
    ON CONFLICT (user_id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;

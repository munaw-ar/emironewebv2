-- Add explicit SELECT policy to newsletter_subscribers table
-- This ensures only admins can view subscriber email addresses
CREATE POLICY "Only admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Also explicitly deny SELECT for anon users (belt and suspenders approach)
CREATE POLICY "Anon cannot view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO anon
USING (false);
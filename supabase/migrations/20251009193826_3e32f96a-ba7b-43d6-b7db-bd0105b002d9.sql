-- Backfill profiles for existing users without profiles
INSERT INTO public.profiles (user_id, email, full_name, role, sector, is_active)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  'analyst'::user_role,
  'government'::sector_type,
  true
FROM auth.users au
LEFT JOIN public.profiles p ON p.user_id = au.id
WHERE p.id IS NULL;

-- Backfill user_roles for existing users
INSERT INTO public.user_roles (user_id, role)
SELECT 
  p.user_id,
  CASE 
    WHEN p.role = 'admin'::user_role THEN 'admin'::app_role
    WHEN p.role = 'sector-lead'::user_role THEN 'sector-lead'::app_role
    ELSE 'analyst'::app_role
  END
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.user_id
WHERE ur.id IS NULL;

-- Add RLS policies for email_verification_codes
CREATE POLICY "Users can view their own verification codes"
  ON public.email_verification_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "System can insert verification codes"
  ON public.email_verification_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "System can update verification codes"
  ON public.email_verification_codes
  FOR UPDATE
  TO authenticated
  USING (true);
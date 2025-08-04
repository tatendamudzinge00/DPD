-- Drop and recreate the trigger function with proper type casting
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role, sector)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(
      CASE 
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'admin' THEN 'admin'::user_role
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'sector-lead' THEN 'sector-lead'::user_role
        ELSE 'analyst'::user_role
      END,
      'analyst'::user_role
    ),
    COALESCE(
      CASE 
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'government' THEN 'government'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'banking' THEN 'banking'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'private' THEN 'private'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'education' THEN 'education'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'industrial' THEN 'industrial'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'telecoms' THEN 'telecoms'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'health' THEN 'health'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'energy' THEN 'energy'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'transport' THEN 'transport'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'media' THEN 'media'::sector_type
        WHEN (NEW.raw_user_meta_data ->> 'sector') = 'zchpc' THEN 'zchpc'::sector_type
        ELSE 'government'::sector_type
      END,
      'government'::sector_type
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
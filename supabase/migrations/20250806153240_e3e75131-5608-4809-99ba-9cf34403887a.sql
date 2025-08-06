-- Fix authentication system completely

-- First, drop and recreate the trigger function with proper security
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the handle_new_user function with proper security and error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_role_val user_role;
    sector_val sector_type;
BEGIN
    -- Safely extract and cast role with proper validation
    user_role_val := CASE 
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'admin' THEN 'admin'::user_role
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'sector-lead' THEN 'sector-lead'::user_role
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'analyst' THEN 'analyst'::user_role
        ELSE 'analyst'::user_role
    END;
    
    -- Safely extract and cast sector with proper validation
    sector_val := CASE 
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
    END;

    -- Insert the profile with proper error handling
    INSERT INTO public.profiles (user_id, email, full_name, role, sector, is_active)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
        user_role_val,
        sector_val,
        true
    );
    
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log the specific error for debugging
        RAISE LOG 'Error in handle_new_user for user %: % - %', NEW.id, SQLSTATE, SQLERRM;
        -- Still return NEW to allow signup to continue
        RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing function security settings for linter warnings
ALTER FUNCTION public.get_current_user_role() SET search_path = public;
ALTER FUNCTION public.get_current_user_sector() SET search_path = public;
ALTER FUNCTION public.has_role(user_role) SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
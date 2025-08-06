-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the enums if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'sector-lead');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sector_type') THEN
        CREATE TYPE sector_type AS ENUM ('government', 'banking', 'private', 'education', 'industrial', 'telecoms', 'health', 'energy', 'transport', 'media', 'zchpc');
    END IF;
END $$;

-- Create the handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_role_val user_role;
    sector_val sector_type;
BEGIN
    -- Safely extract and cast role
    user_role_val := CASE 
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'admin' THEN 'admin'::user_role
        WHEN (NEW.raw_user_meta_data ->> 'role') = 'sector-lead' THEN 'sector-lead'::user_role
        ELSE 'analyst'::user_role
    END;
    
    -- Safely extract and cast sector
    sector_val := CASE 
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

    -- Insert the profile
    INSERT INTO public.profiles (user_id, email, full_name, role, sector)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
        user_role_val,
        sector_val
    );
    
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log the error and continue
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
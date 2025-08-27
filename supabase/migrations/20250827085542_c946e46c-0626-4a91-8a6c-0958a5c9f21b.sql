-- Clear all user accounts and profiles
DELETE FROM public.profiles;

-- Note: This will also clear the corresponding auth.users entries via the trigger
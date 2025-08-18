-- Delete all profiles from the profiles table
DELETE FROM public.profiles;

-- Delete all users from auth.users table
-- Note: This will cascade delete profiles due to foreign key relationships
DELETE FROM auth.users;
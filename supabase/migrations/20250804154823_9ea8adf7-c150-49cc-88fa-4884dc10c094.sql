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

-- Create incidents table for real-time tracking
CREATE TABLE IF NOT EXISTS public.incidents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  severity text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  sector text NOT NULL,
  reported_by uuid REFERENCES public.profiles(user_id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on incidents
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- Create policies for incidents
CREATE POLICY "Users can view incidents in their sector or admins can view all" 
ON public.incidents 
FOR SELECT 
USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'
);

CREATE POLICY "Users can create incidents" 
ON public.incidents 
FOR INSERT 
WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can update incidents in their sector or admins can update all" 
ON public.incidents 
FOR UPDATE 
USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'
);

-- Create logs table for real-time monitoring
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  severity text NOT NULL DEFAULT 'info',
  source text NOT NULL,
  target text,
  description text,
  sector text NOT NULL,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on security_logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for security_logs
CREATE POLICY "Users can view logs in their sector or admins can view all" 
ON public.security_logs 
FOR SELECT 
USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'
);

CREATE POLICY "System can insert logs" 
ON public.security_logs 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for both tables
ALTER TABLE public.incidents REPLICA IDENTITY FULL;
ALTER TABLE public.security_logs REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.incidents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.security_logs;

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to incidents
CREATE TRIGGER update_incidents_updated_at
  BEFORE UPDATE ON public.incidents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
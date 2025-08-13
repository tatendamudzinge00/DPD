-- Create data_subject_requests table for GDPR compliance tracking
CREATE TABLE public.data_subject_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  request_type TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'processing',
  priority TEXT NOT NULL DEFAULT 'medium',
  requester_name TEXT,
  sector TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  assigned_to UUID,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.data_subject_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for data subject requests
CREATE POLICY "Users can view requests in their sector or admins can view all"
ON public.data_subject_requests
FOR SELECT
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR 
  (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Users can create requests in their sector"
ON public.data_subject_requests
FOR INSERT
WITH CHECK (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR 
  (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Users can update requests in their sector or admins can update all"
ON public.data_subject_requests
FOR UPDATE
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR 
  (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_data_subject_requests_updated_at
BEFORE UPDATE ON public.data_subject_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add realtime support
ALTER TABLE public.data_subject_requests REPLICA IDENTITY FULL;
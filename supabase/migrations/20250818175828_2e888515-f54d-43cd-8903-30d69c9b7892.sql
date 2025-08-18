-- Create threat intelligence tables for TISP
CREATE TABLE public.threat_feeds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  feed_type TEXT NOT NULL, -- 'misp', 'stix', 'taxii', 'otx', 'virustotal', 'abuse_ch', 'custom'
  url TEXT,
  api_key_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE,
  sector TEXT,
  confidence_score INTEGER DEFAULT 50, -- 0-100
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.indicators_of_compromise (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ioc_type TEXT NOT NULL, -- 'ip', 'domain', 'hash', 'url', 'email', 'file'
  value TEXT NOT NULL,
  description TEXT,
  threat_type TEXT, -- 'malware', 'phishing', 'botnet', 'apt', 'ransomware'
  severity TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  confidence_score INTEGER DEFAULT 50, -- 0-100
  source_feed_id UUID REFERENCES public.threat_feeds(id),
  first_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  sector TEXT,
  tags TEXT[],
  mitre_attack_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.threat_actors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  aliases TEXT[],
  description TEXT,
  motivation TEXT, -- 'financial', 'espionage', 'activism', 'warfare'
  sophistication TEXT, -- 'low', 'medium', 'high', 'expert'
  origin_country TEXT,
  target_sectors TEXT[],
  active_since DATE,
  last_activity TIMESTAMP WITH TIME ZONE,
  mitre_attack_techniques TEXT[],
  known_campaigns TEXT[],
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.shared_intelligence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  intelligence_type TEXT NOT NULL, -- 'ioc', 'ttp', 'campaign', 'vulnerability'
  sharing_level TEXT NOT NULL DEFAULT 'sector', -- 'internal', 'sector', 'national', 'international'
  stix_package JSONB,
  taxii_collection TEXT,
  source_sector TEXT NOT NULL,
  target_sectors TEXT[],
  confidence_score INTEGER DEFAULT 50,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'validated', 'distributed', 'rejected'
  validated_by UUID,
  validated_at TIMESTAMP WITH TIME ZONE,
  distribution_count INTEGER DEFAULT 0,
  feedback_score DECIMAL(3,2),
  tags TEXT[],
  related_incidents UUID[],
  shared_by UUID NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.compliance_frameworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  framework_type TEXT NOT NULL, -- 'gdpr', 'iso27001', 'popia', 'zim_data_protection'
  version TEXT,
  requirements JSONB,
  sector TEXT,
  compliance_percentage DECIMAL(5,2) DEFAULT 0.00,
  last_assessment TIMESTAMP WITH TIME ZONE,
  next_assessment TIMESTAMP WITH TIME ZONE,
  responsible_person UUID,
  status TEXT NOT NULL DEFAULT 'in_progress', -- 'not_started', 'in_progress', 'compliant', 'non_compliant'
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.training_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  session_type TEXT NOT NULL, -- 'awareness', 'technical', 'incident_response', 'compliance'
  target_audience TEXT NOT NULL, -- 'all_staff', 'technical_team', 'management', 'sector_specific'
  sector TEXT,
  trainer TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  duration_hours INTEGER,
  max_participants INTEGER,
  registered_count INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
  materials_url TEXT,
  assessment_required BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.threat_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicators_of_compromise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for threat_feeds
CREATE POLICY "Users can view feeds in their sector or admins can view all" ON public.threat_feeds
FOR SELECT USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
  OR sector IS NULL -- public feeds
);

CREATE POLICY "Admins can manage feeds" ON public.threat_feeds
FOR ALL USING ((SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role);

-- RLS Policies for indicators_of_compromise
CREATE POLICY "Users can view IOCs in their sector or admins can view all" ON public.indicators_of_compromise
FOR SELECT USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
  OR sector IS NULL -- global IOCs
);

CREATE POLICY "Users can create IOCs" ON public.indicators_of_compromise
FOR INSERT WITH CHECK (true);

-- RLS Policies for threat_actors
CREATE POLICY "All users can view threat actors" ON public.threat_actors
FOR SELECT USING (true);

CREATE POLICY "Admins can manage threat actors" ON public.threat_actors
FOR ALL USING ((SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role);

-- RLS Policies for shared_intelligence
CREATE POLICY "Users can view shared intel in their sector or admins can view all" ON public.shared_intelligence
FOR SELECT USING (
  source_sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text 
  OR (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text = ANY(target_sectors)
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Users can create shared intelligence" ON public.shared_intelligence
FOR INSERT WITH CHECK (
  source_sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Users can update their shared intelligence" ON public.shared_intelligence
FOR UPDATE USING (
  shared_by = auth.uid()
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for compliance_frameworks
CREATE POLICY "Users can view compliance in their sector or admins can view all" ON public.compliance_frameworks
FOR SELECT USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins and sector leads can manage compliance" ON public.compliance_frameworks
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'sector-lead'::user_role)
);

-- RLS Policies for training_sessions
CREATE POLICY "Users can view training in their sector or admins can view all" ON public.training_sessions
FOR SELECT USING (
  sector = (SELECT sector FROM public.profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'::user_role
  OR sector IS NULL -- general training
);

CREATE POLICY "Admins and sector leads can manage training" ON public.training_sessions
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'sector-lead'::user_role)
);

-- Create indexes for performance
CREATE INDEX idx_ioc_type ON public.indicators_of_compromise(ioc_type);
CREATE INDEX idx_ioc_value ON public.indicators_of_compromise(value);
CREATE INDEX idx_ioc_sector ON public.indicators_of_compromise(sector);
CREATE INDEX idx_shared_intel_sector ON public.shared_intelligence(source_sector);
CREATE INDEX idx_shared_intel_status ON public.shared_intelligence(status);
CREATE INDEX idx_threat_feeds_active ON public.threat_feeds(is_active);

-- Create triggers for updated_at
CREATE TRIGGER update_threat_feeds_updated_at
BEFORE UPDATE ON public.threat_feeds
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ioc_updated_at
BEFORE UPDATE ON public.indicators_of_compromise
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threat_actors_updated_at
BEFORE UPDATE ON public.threat_actors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shared_intelligence_updated_at
BEFORE UPDATE ON public.shared_intelligence
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_frameworks_updated_at
BEFORE UPDATE ON public.compliance_frameworks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_sessions_updated_at
BEFORE UPDATE ON public.training_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
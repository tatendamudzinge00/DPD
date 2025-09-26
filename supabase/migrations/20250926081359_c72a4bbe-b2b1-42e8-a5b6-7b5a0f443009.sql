-- Create tables for security tool integrations

-- Security Tools Configuration
CREATE TABLE public.security_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  tool_type TEXT NOT NULL, -- 'splunk', 'qualys', 'misp', 'nessus', 'nozomi'
  endpoint_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_frequency INTEGER DEFAULT 3600, -- seconds
  sector TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Splunk Data
CREATE TABLE public.splunk_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.security_tools(id),
  query_used TEXT,
  threat_type TEXT,
  count INTEGER,
  severity TEXT DEFAULT 'medium',
  sector TEXT,
  raw_data JSONB,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Qualys Assets
CREATE TABLE public.qualys_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.security_tools(id),
  host_ip TEXT,
  hostname TEXT,
  asset_type TEXT,
  vulnerabilities_count INTEGER DEFAULT 0,
  severity_score NUMERIC,
  last_scanned TIMESTAMP WITH TIME ZONE,
  sector TEXT,
  raw_data JSONB,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- MISP Events
CREATE TABLE public.misp_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.security_tools(id),
  event_id TEXT,
  event_title TEXT,
  threat_level INTEGER,
  analysis_status TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  attributes_count INTEGER DEFAULT 0,
  sector TEXT,
  raw_data JSONB,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Nessus Scans
CREATE TABLE public.nessus_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.security_tools(id),
  scan_id TEXT,
  scan_name TEXT,
  scan_status TEXT,
  target_count INTEGER,
  vulnerabilities_found INTEGER DEFAULT 0,
  critical_count INTEGER DEFAULT 0,
  high_count INTEGER DEFAULT 0,
  medium_count INTEGER DEFAULT 0,
  low_count INTEGER DEFAULT 0,
  scan_date TIMESTAMP WITH TIME ZONE,
  sector TEXT,
  raw_data JSONB,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Nozomi Alerts
CREATE TABLE public.nozomi_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES public.security_tools(id),
  alert_id TEXT,
  alert_type TEXT,
  severity TEXT DEFAULT 'medium',
  source_ip TEXT,
  destination_ip TEXT,
  protocol TEXT,
  description TEXT,
  alert_time TIMESTAMP WITH TIME ZONE,
  sector TEXT,
  raw_data JSONB,
  collected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.splunk_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualys_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.misp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nessus_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nozomi_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for security_tools
CREATE POLICY "Users can view tools in their sector or admins can view all"
ON public.security_tools FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage security tools"
ON public.security_tools FOR ALL
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role);

-- RLS Policies for data tables (similar pattern for all)
CREATE POLICY "Users can view splunk data in their sector or admins can view all"
ON public.splunk_data FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert splunk data"
ON public.splunk_data FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view qualys assets in their sector or admins can view all"
ON public.qualys_assets FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert qualys assets"
ON public.qualys_assets FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view misp events in their sector or admins can view all"
ON public.misp_events FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert misp events"
ON public.misp_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view nessus scans in their sector or admins can view all"
ON public.nessus_scans FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert nessus scans"
ON public.nessus_scans FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view nozomi alerts in their sector or admins can view all"
ON public.nozomi_alerts FOR SELECT
USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text OR
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert nozomi alerts"
ON public.nozomi_alerts FOR INSERT
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_security_tools_sector ON public.security_tools(sector);
CREATE INDEX idx_splunk_data_sector_collected ON public.splunk_data(sector, collected_at DESC);
CREATE INDEX idx_qualys_assets_sector_collected ON public.qualys_assets(sector, collected_at DESC);
CREATE INDEX idx_misp_events_sector_collected ON public.misp_events(sector, collected_at DESC);
CREATE INDEX idx_nessus_scans_sector_collected ON public.nessus_scans(sector, collected_at DESC);
CREATE INDEX idx_nozomi_alerts_sector_collected ON public.nozomi_alerts(sector, collected_at DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_security_tools_updated_at
BEFORE UPDATE ON public.security_tools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
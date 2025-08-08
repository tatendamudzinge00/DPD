-- Create comprehensive security logs table for multi-source ingestion
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_tool TEXT NOT NULL, -- suricata, wazuh, opendlp, openvas, pfsense, etc.
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info', -- info, low, medium, high, critical
  description TEXT,
  src_ip INET,
  dst_ip INET,
  src_port INTEGER,
  dst_port INTEGER,
  protocol TEXT,
  user_name TEXT,
  host_name TEXT,
  file_path TEXT,
  file_hash TEXT,
  cve TEXT,
  vuln_severity TEXT,
  sector TEXT NOT NULL,
  metadata JSONB,
  raw_log TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_security_logs_timestamp ON public.security_logs(timestamp);
CREATE INDEX idx_security_logs_source_tool ON public.security_logs(source_tool);
CREATE INDEX idx_security_logs_severity ON public.security_logs(severity);
CREATE INDEX idx_security_logs_sector ON public.security_logs(sector);
CREATE INDEX idx_security_logs_event_type ON public.security_logs(event_type);
CREATE INDEX idx_security_logs_src_ip ON public.security_logs(src_ip);
CREATE INDEX idx_security_logs_dst_ip ON public.security_logs(dst_ip);

-- Enable Row Level Security
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for security logs access
CREATE POLICY "Users can view logs in their sector or admins can view all" 
ON public.security_logs 
FOR SELECT 
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert logs" 
ON public.security_logs 
FOR INSERT 
WITH CHECK (true);

-- Create threat intelligence table
CREATE TABLE public.threat_intelligence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  threat_id TEXT NOT NULL UNIQUE,
  threat_type TEXT NOT NULL, -- malware, phishing, vulnerability, etc.
  severity TEXT NOT NULL DEFAULT 'medium',
  target_sector TEXT,
  description TEXT NOT NULL,
  source TEXT NOT NULL,
  iocs TEXT[], -- Indicators of Compromise
  mitre_tactics TEXT[],
  confidence_score INTEGER DEFAULT 50,
  first_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for threat intelligence
ALTER TABLE public.threat_intelligence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view threat intelligence" 
ON public.threat_intelligence 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert threat intelligence" 
ON public.threat_intelligence 
FOR INSERT 
WITH CHECK (true);

-- Create vulnerability scans table
CREATE TABLE public.vulnerability_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id TEXT NOT NULL,
  target_host INET NOT NULL,
  cve TEXT,
  cvss_score DECIMAL(3,1),
  severity TEXT NOT NULL DEFAULT 'medium',
  vulnerability_name TEXT NOT NULL,
  description TEXT,
  solution TEXT,
  port INTEGER,
  service TEXT,
  sector TEXT NOT NULL,
  scan_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'open', -- open, patched, mitigated, false_positive
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for vulnerability scans
ALTER TABLE public.vulnerability_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view vulnerabilities in their sector or admins can view all" 
ON public.vulnerability_scans 
FOR SELECT 
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

-- Create compliance monitoring table
CREATE TABLE public.compliance_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  check_name TEXT NOT NULL,
  compliance_framework TEXT NOT NULL, -- GDPR, ISO27001, PCI-DSS, etc.
  check_type TEXT NOT NULL, -- policy, technical, procedural
  status TEXT NOT NULL DEFAULT 'pending', -- compliant, non_compliant, pending, not_applicable
  sector TEXT NOT NULL,
  description TEXT,
  evidence TEXT,
  remediation_notes TEXT,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  next_check_due TIMESTAMP WITH TIME ZONE,
  risk_level TEXT DEFAULT 'medium',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for compliance checks
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view compliance checks in their sector or admins can view all" 
ON public.compliance_checks 
FOR SELECT 
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

-- Create data protection incidents table (enhanced)
CREATE TABLE public.data_protection_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  incident_type TEXT NOT NULL, -- breach, leak, unauthorized_access, etc.
  severity TEXT NOT NULL DEFAULT 'medium',
  sector TEXT NOT NULL,
  affected_individuals INTEGER DEFAULT 0,
  data_types TEXT[], -- personal_data, financial, health, etc.
  notification_required BOOLEAN DEFAULT false,
  regulatory_body_notified BOOLEAN DEFAULT false,
  individuals_notified BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'investigating', -- investigating, contained, resolved, monitoring
  reported_by UUID,
  assigned_to UUID,
  breach_date TIMESTAMP WITH TIME ZONE,
  discovered_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  containment_date TIMESTAMP WITH TIME ZONE,
  resolution_date TIMESTAMP WITH TIME ZONE,
  estimated_cost DECIMAL(10,2),
  lessons_learned TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for data protection incidents
ALTER TABLE public.data_protection_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view incidents in their sector or admins can view all" 
ON public.data_protection_incidents 
FOR SELECT 
USING (
  (sector = (SELECT profiles.sector FROM profiles WHERE profiles.user_id = auth.uid())::text) 
  OR (SELECT profiles.role FROM profiles WHERE profiles.user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Users can create incidents" 
ON public.data_protection_incidents 
FOR INSERT 
WITH CHECK (auth.uid() = reported_by);

-- Create trigger for updating timestamps
CREATE TRIGGER update_security_logs_updated_at
  BEFORE UPDATE ON public.security_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threat_intelligence_updated_at
  BEFORE UPDATE ON public.threat_intelligence
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vulnerability_scans_updated_at
  BEFORE UPDATE ON public.vulnerability_scans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_checks_updated_at
  BEFORE UPDATE ON public.compliance_checks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_protection_incidents_updated_at
  BEFORE UPDATE ON public.data_protection_incidents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
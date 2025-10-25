-- Network Traffic Analysis
CREATE TABLE IF NOT EXISTS public.network_traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_ip TEXT NOT NULL,
  destination_ip TEXT NOT NULL,
  source_port INTEGER,
  destination_port INTEGER,
  protocol TEXT NOT NULL,
  packet_size BIGINT,
  geolocation JSONB,
  anomaly_detected BOOLEAN DEFAULT false,
  anomaly_score NUMERIC,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- System Health Monitoring
CREATE TABLE IF NOT EXISTS public.system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_name TEXT NOT NULL,
  server_type TEXT NOT NULL,
  cpu_usage NUMERIC NOT NULL,
  memory_usage NUMERIC NOT NULL,
  disk_usage NUMERIC NOT NULL,
  uptime_seconds BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'healthy',
  response_time_ms NUMERIC,
  sector TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Endpoint Security
CREATE TABLE IF NOT EXISTS public.endpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  mac_address TEXT,
  os_type TEXT NOT NULL,
  os_version TEXT,
  antivirus_status TEXT NOT NULL,
  last_scan TIMESTAMPTZ,
  patch_level TEXT,
  compliance_status TEXT NOT NULL,
  sector TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Intrusion Detection System
CREATE TABLE IF NOT EXISTS public.ids_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_ip TEXT NOT NULL,
  destination_ip TEXT NOT NULL,
  attack_type TEXT NOT NULL,
  attack_signature TEXT NOT NULL,
  severity TEXT NOT NULL,
  confidence_score NUMERIC NOT NULL,
  is_false_positive BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- SIEM Events
CREATE TABLE IF NOT EXISTS public.siem_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL,
  source_system TEXT NOT NULL,
  severity TEXT NOT NULL,
  correlation_id UUID,
  user_id UUID,
  ip_address TEXT,
  description TEXT,
  raw_log JSONB,
  sector TEXT NOT NULL,
  indexed BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Threat Intelligence IOCs (enhanced)
CREATE TABLE IF NOT EXISTS public.threat_iocs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ioc_type TEXT NOT NULL,
  ioc_value TEXT NOT NULL,
  threat_level TEXT NOT NULL,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL,
  industry_specific BOOLEAN DEFAULT false,
  dark_web_source BOOLEAN DEFAULT false,
  confidence_score NUMERIC NOT NULL,
  sector TEXT,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Data Loss Prevention
CREATE TABLE IF NOT EXISTS public.dlp_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_type TEXT NOT NULL,
  classification TEXT NOT NULL,
  action_taken TEXT NOT NULL,
  user_id UUID,
  source_location TEXT NOT NULL,
  destination_location TEXT,
  policy_violated TEXT NOT NULL,
  data_size BIGINT,
  blocked BOOLEAN DEFAULT false,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Personal Data Inventory
CREATE TABLE IF NOT EXISTS public.personal_data_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_category TEXT NOT NULL,
  data_location TEXT NOT NULL,
  data_owner TEXT NOT NULL,
  purpose TEXT NOT NULL,
  legal_basis TEXT NOT NULL,
  retention_period TEXT NOT NULL,
  encryption_status BOOLEAN DEFAULT false,
  consent_obtained BOOLEAN DEFAULT false,
  sector TEXT NOT NULL,
  last_reviewed TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Incident Forensics
CREATE TABLE IF NOT EXISTS public.forensic_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT NOT NULL UNIQUE,
  incident_id UUID,
  opened_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_date TIMESTAMPTZ,
  investigator_id UUID NOT NULL,
  case_status TEXT NOT NULL DEFAULT 'open',
  evidence_collected JSONB,
  timeline JSONB,
  findings TEXT,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business Continuity
CREATE TABLE IF NOT EXISTS public.business_continuity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_name TEXT NOT NULL,
  rto_minutes INTEGER NOT NULL,
  rpo_minutes INTEGER NOT NULL,
  backup_status TEXT NOT NULL,
  last_backup TIMESTAMPTZ,
  last_test TIMESTAMPTZ,
  test_result TEXT,
  failover_ready BOOLEAN DEFAULT false,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vulnerability Scans
CREATE TABLE IF NOT EXISTS public.vulnerability_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  asset_id UUID NOT NULL,
  vulnerability_name TEXT NOT NULL,
  cvss_score NUMERIC NOT NULL,
  cve_id TEXT,
  severity TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  remediation_priority INTEGER,
  patch_available BOOLEAN DEFAULT false,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assets Inventory
CREATE TABLE IF NOT EXISTS public.assets_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  ip_address TEXT,
  mac_address TEXT,
  location TEXT NOT NULL,
  owner TEXT NOT NULL,
  criticality TEXT NOT NULL,
  last_scanned TIMESTAMPTZ,
  sector TEXT NOT NULL,
  is_cloud BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Penetration Testing
CREATE TABLE IF NOT EXISTS public.pentest_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_date TIMESTAMPTZ NOT NULL,
  test_type TEXT NOT NULL,
  tester TEXT NOT NULL,
  target_system TEXT NOT NULL,
  vulnerabilities_found INTEGER NOT NULL,
  critical_findings INTEGER DEFAULT 0,
  high_findings INTEGER DEFAULT 0,
  medium_findings INTEGER DEFAULT 0,
  low_findings INTEGER DEFAULT 0,
  status TEXT NOT NULL,
  sector TEXT NOT NULL,
  report_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Authentication Logs
CREATE TABLE IF NOT EXISTS public.auth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID,
  username TEXT NOT NULL,
  auth_method TEXT NOT NULL,
  mfa_used BOOLEAN DEFAULT false,
  result TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  geolocation JSONB,
  is_privileged BOOLEAN DEFAULT false,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Access Control
CREATE TABLE IF NOT EXISTS public.access_control (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  resource TEXT NOT NULL,
  permission TEXT NOT NULL,
  granted_by UUID,
  granted_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expiry_date TIMESTAMPTZ,
  last_review TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Risk Assessments
CREATE TABLE IF NOT EXISTS public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  risk_name TEXT NOT NULL,
  risk_category TEXT NOT NULL,
  likelihood_score NUMERIC NOT NULL,
  impact_score NUMERIC NOT NULL,
  risk_score NUMERIC NOT NULL,
  mitigation_strategy TEXT,
  residual_risk NUMERIC,
  owner TEXT NOT NULL,
  status TEXT NOT NULL,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Policy Management
CREATE TABLE IF NOT EXISTS public.security_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_name TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  version TEXT NOT NULL,
  effective_date DATE NOT NULL,
  review_date DATE NOT NULL,
  owner TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  acknowledgment_required BOOLEAN DEFAULT true,
  acknowledgment_count INTEGER DEFAULT 0,
  sector TEXT,
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Training and Awareness
CREATE TABLE IF NOT EXISTS public.training_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  training_name TEXT NOT NULL,
  training_type TEXT NOT NULL,
  completion_date TIMESTAMPTZ,
  score NUMERIC,
  passed BOOLEAN DEFAULT false,
  certificate_url TEXT,
  expiry_date TIMESTAMPTZ,
  sector TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.network_traffic ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ids_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.siem_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_iocs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dlp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_data_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forensic_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_continuity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vulnerability_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pentest_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_control ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for network_traffic
CREATE POLICY "Users can view traffic in their sector" ON public.network_traffic FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert traffic data" ON public.network_traffic FOR INSERT WITH CHECK (true);

-- RLS Policies for system_health
CREATE POLICY "Users can view health in their sector" ON public.system_health FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert health data" ON public.system_health FOR INSERT WITH CHECK (true);

-- RLS Policies for endpoints
CREATE POLICY "Users can view endpoints in their sector" ON public.endpoints FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage endpoints" ON public.endpoints FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for ids_alerts
CREATE POLICY "Users can view IDS alerts in their sector" ON public.ids_alerts FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert IDS alerts" ON public.ids_alerts FOR INSERT WITH CHECK (true);

-- RLS Policies for siem_events
CREATE POLICY "Users can view SIEM events in their sector" ON public.siem_events FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert SIEM events" ON public.siem_events FOR INSERT WITH CHECK (true);

-- RLS Policies for threat_iocs
CREATE POLICY "Users can view IOCs" ON public.threat_iocs FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
  OR sector IS NULL
);

CREATE POLICY "Admins can manage IOCs" ON public.threat_iocs FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for dlp_events
CREATE POLICY "Users can view DLP events in their sector" ON public.dlp_events FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert DLP events" ON public.dlp_events FOR INSERT WITH CHECK (true);

-- RLS Policies for personal_data_inventory
CREATE POLICY "Users can view data inventory in their sector" ON public.personal_data_inventory FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins and sector leads can manage data inventory" ON public.personal_data_inventory FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'sector-lead'::user_role)
);

-- RLS Policies for forensic_cases
CREATE POLICY "Users can view forensic cases in their sector" ON public.forensic_cases FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Analysts can manage forensic cases" ON public.forensic_cases FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'analyst'::user_role)
);

-- RLS Policies for business_continuity
CREATE POLICY "Users can view BC in their sector" ON public.business_continuity FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage BC" ON public.business_continuity FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for vulnerability_scans
CREATE POLICY "Users can view vulns in their sector" ON public.vulnerability_scans FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert vulnerability scans" ON public.vulnerability_scans FOR INSERT WITH CHECK (true);

-- RLS Policies for assets_inventory
CREATE POLICY "Users can view assets in their sector" ON public.assets_inventory FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage assets" ON public.assets_inventory FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for pentest_results
CREATE POLICY "Users can view pentests in their sector" ON public.pentest_results FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Analysts can manage pentests" ON public.pentest_results FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'analyst'::user_role)
);

-- RLS Policies for auth_logs
CREATE POLICY "Users can view auth logs in their sector" ON public.auth_logs FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "System can insert auth logs" ON public.auth_logs FOR INSERT WITH CHECK (true);

-- RLS Policies for access_control
CREATE POLICY "Users can view their own access" ON public.access_control FOR SELECT USING (
  user_id = auth.uid() 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage access control" ON public.access_control FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for risk_assessments
CREATE POLICY "Users can view risks in their sector" ON public.risk_assessments FOR SELECT USING (
  sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins and sector leads can manage risks" ON public.risk_assessments FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'sector-lead'::user_role)
);

-- RLS Policies for security_policies
CREATE POLICY "All users can view active policies" ON public.security_policies FOR SELECT USING (
  status = 'active' AND (sector IS NULL OR sector = (SELECT sector FROM profiles WHERE user_id = auth.uid())::text)
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can manage policies" ON public.security_policies FOR ALL USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'admin'::user_role
);

-- RLS Policies for training_records
CREATE POLICY "Users can view their own training" ON public.training_records FOR SELECT USING (
  user_id = auth.uid() 
  OR (SELECT role FROM profiles WHERE user_id = auth.uid()) IN ('admin'::user_role, 'sector-lead'::user_role)
);

CREATE POLICY "Users can insert their own training" ON public.training_records FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

-- Add indexes for performance
CREATE INDEX idx_network_traffic_sector ON public.network_traffic(sector);
CREATE INDEX idx_network_traffic_timestamp ON public.network_traffic(timestamp DESC);
CREATE INDEX idx_system_health_sector ON public.system_health(sector);
CREATE INDEX idx_endpoints_sector ON public.endpoints(sector);
CREATE INDEX idx_ids_alerts_sector ON public.ids_alerts(sector);
CREATE INDEX idx_siem_events_sector ON public.siem_events(sector);
CREATE INDEX idx_vulnerability_scans_sector ON public.vulnerability_scans(sector);
CREATE INDEX idx_auth_logs_sector ON public.auth_logs(sector);
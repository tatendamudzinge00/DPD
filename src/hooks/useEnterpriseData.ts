import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Network Traffic Analysis
export function useNetworkTraffic() {
  return useQuery({
    queryKey: ['network-traffic'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('network_traffic')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000,
  });
}

// System Health Monitoring
export function useSystemHealth() {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_health')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 15000,
  });
}

// Endpoint Security
export function useEndpoints() {
  return useQuery({
    queryKey: ['endpoints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('endpoints')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

// IDS Alerts
export function useIDSAlerts() {
  return useQuery({
    queryKey: ['ids-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ids_alerts')
        .select('*')
        .order('alert_time', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 5000,
  });
}

// SIEM Events
export function useSIEMEvents() {
  return useQuery({
    queryKey: ['siem-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('siem_events')
        .select('*')
        .order('event_time', { ascending: false })
        .limit(200);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 5000,
  });
}

// Threat IOCs
export function useThreatIOCs() {
  return useQuery({
    queryKey: ['threat-iocs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threat_iocs')
        .select('*')
        .order('last_seen', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// DLP Events
export function useDLPEvents() {
  return useQuery({
    queryKey: ['dlp-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dlp_events')
        .select('*')
        .order('event_time', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000,
  });
}

// Personal Data Inventory
export function usePersonalDataInventory() {
  return useQuery({
    queryKey: ['personal-data-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('personal_data_inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Forensic Cases
export function useForensicCases() {
  return useQuery({
    queryKey: ['forensic-cases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forensic_cases')
        .select('*')
        .order('opened_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

// Business Continuity
export function useBusinessContinuity() {
  return useQuery({
    queryKey: ['business-continuity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_continuity')
        .select('*')
        .order('last_test', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Vulnerability Scans
export function useVulnerabilityScans() {
  return useQuery({
    queryKey: ['vulnerability-scans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vulnerability_scans')
        .select('*')
        .order('scan_date', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

// Assets Inventory
export function useAssetsInventory() {
  return useQuery({
    queryKey: ['assets-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets_inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Penetration Testing
export function usePentestResults() {
  return useQuery({
    queryKey: ['pentest-results'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pentest_results')
        .select('*')
        .order('test_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Authentication Logs
export function useAuthLogs() {
  return useQuery({
    queryKey: ['auth-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('auth_logs')
        .select('*')
        .order('log_time', { ascending: false })
        .limit(200);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000,
  });
}

// Access Control
export function useAccessControl() {
  return useQuery({
    queryKey: ['access-control'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('access_control')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

// Risk Assessments
export function useRiskAssessments() {
  return useQuery({
    queryKey: ['risk-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .order('assessment_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Security Policies
export function useSecurityPolicies() {
  return useQuery({
    queryKey: ['security-policies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_policies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

// Training Records
export function useTrainingRecords() {
  return useQuery({
    queryKey: ['training-records'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_records')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

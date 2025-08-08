import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Types for the new data protection tables
export interface ThreatIntelligence {
  id: string;
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  indicators_of_compromise: string[];
  affected_sectors: string[];
  created_at: string;
  updated_at: string;
}

export interface VulnerabilityScan {
  id: string;
  scanner_type: string;
  target_system: string;
  vulnerability_id: string;
  cvss_score: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affected_component: string;
  remediation: string;
  sector: string;
  scan_date: string;
  status: 'open' | 'patched' | 'mitigated' | 'false_positive';
  created_at: string;
  updated_at: string;
}

export interface ComplianceCheck {
  id: string;
  framework: string;
  control_id: string;
  control_name: string;
  sector: string;
  compliance_status: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  assessment_date: string;
  findings: string;
  remediation_plan: string;
  responsible_party: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface DataProtectionIncident {
  id: string;
  incident_type: string;
  data_types_affected: string[];
  number_of_records: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  sector: string;
  description: string;
  detection_method: string;
  containment_status: 'contained' | 'ongoing' | 'uncontained';
  notification_required: boolean;
  notification_sent: boolean;
  reported_by: string;
  assigned_to: string;
  incident_date: string;
  created_at: string;
  updated_at: string;
}

// Threat Intelligence hooks - Using security_logs for now until migration is complete
export function useThreatIntelligence() {
  return useQuery({
    queryKey: ['threat-intelligence'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_logs')
        .select('*')
        .eq('event_type', 'threat_intelligence')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform security_logs data to ThreatIntelligence format
      return (data || []).map(log => {
        const metadata = log.metadata as any;
        return {
          id: log.id,
          threat_type: metadata?.threat_type || 'Unknown',
          severity: log.severity as 'low' | 'medium' | 'high' | 'critical',
          source: log.source,
          description: log.description || '',
          indicators_of_compromise: metadata?.indicators_of_compromise || [],
          affected_sectors: metadata?.affected_sectors || [log.sector],
          created_at: log.created_at,
          updated_at: log.created_at
        };
      }) as ThreatIntelligence[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useCreateThreatIntelligence() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (threat: Omit<ThreatIntelligence, 'id' | 'created_at' | 'updated_at'>) => {
      // Insert as security_log for now
      const { data, error } = await supabase
        .from('security_logs')
        .insert({
          event_type: 'threat_intelligence',
          severity: threat.severity,
          source: threat.source,
          description: threat.description,
          sector: threat.affected_sectors[0] || 'unknown',
          metadata: {
            threat_type: threat.threat_type,
            indicators_of_compromise: threat.indicators_of_compromise,
            affected_sectors: threat.affected_sectors
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threat-intelligence'] });
    },
  });
}

// Vulnerability Scan hooks - Using security_logs for now
export function useVulnerabilityScans() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['vulnerability-scans', profile?.sector],
    queryFn: async () => {
      let query = supabase
        .from('security_logs')
        .select('*')
        .eq('event_type', 'vulnerability_scan')
        .order('created_at', { ascending: false });
      
      // Filter by sector for non-admin users
      if (profile?.role !== 'admin' && profile?.sector) {
        query = query.eq('sector', profile.sector);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Transform to VulnerabilityScan format
      return (data || []).map(log => {
        const metadata = log.metadata as any;
        return {
          id: log.id,
          scanner_type: metadata?.scanner_type || 'Unknown',
          target_system: log.target || 'Unknown',
          vulnerability_id: metadata?.vulnerability_id || 'CVE-UNKNOWN',
          cvss_score: metadata?.cvss_score || 0,
          severity: log.severity as 'low' | 'medium' | 'high' | 'critical',
          description: log.description || '',
          affected_component: metadata?.affected_component || 'Unknown',
          remediation: metadata?.remediation || '',
          sector: log.sector,
          scan_date: log.created_at,
          status: metadata?.status || 'open',
          created_at: log.created_at,
          updated_at: log.created_at
        };
      }) as VulnerabilityScan[];
    },
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useCreateVulnerabilityScan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (scan: Omit<VulnerabilityScan, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('security_logs')
        .insert({
          event_type: 'vulnerability_scan',
          severity: scan.severity,
          source: scan.scanner_type,
          description: scan.description,
          sector: scan.sector,
          target: scan.target_system,
          metadata: {
            scanner_type: scan.scanner_type,
            vulnerability_id: scan.vulnerability_id,
            cvss_score: scan.cvss_score,
            affected_component: scan.affected_component,
            remediation: scan.remediation,
            status: scan.status
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vulnerability-scans'] });
    },
  });
}

// Compliance Check hooks - Using security_logs for now
export function useComplianceChecks() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['compliance-checks', profile?.sector],
    queryFn: async () => {
      let query = supabase
        .from('security_logs')
        .select('*')
        .eq('event_type', 'compliance_check')
        .order('created_at', { ascending: false });
      
      // Filter by sector for non-admin users
      if (profile?.role !== 'admin' && profile?.sector) {
        query = query.eq('sector', profile.sector);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Transform to ComplianceCheck format
      return (data || []).map(log => {
        const metadata = log.metadata as any;
        return {
          id: log.id,
          framework: metadata?.framework || 'Unknown',
          control_id: metadata?.control_id || 'CTRL-UNKNOWN',
          control_name: metadata?.control_name || 'Unknown Control',
          sector: log.sector,
          compliance_status: metadata?.compliance_status || 'not_applicable',
          assessment_date: log.created_at,
          findings: metadata?.findings || '',
          remediation_plan: metadata?.remediation_plan || '',
          responsible_party: metadata?.responsible_party || 'Unknown',
          due_date: metadata?.due_date || log.created_at,
          created_at: log.created_at,
          updated_at: log.created_at
        };
      }) as ComplianceCheck[];
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
}

export function useCreateComplianceCheck() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (check: Omit<ComplianceCheck, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('security_logs')
        .insert({
          event_type: 'compliance_check',
          severity: 'info',
          source: 'Compliance System',
          description: `Compliance check for ${check.framework} ${check.control_id}`,
          sector: check.sector,
          metadata: {
            framework: check.framework,
            control_id: check.control_id,
            control_name: check.control_name,
            compliance_status: check.compliance_status,
            findings: check.findings,
            remediation_plan: check.remediation_plan,
            responsible_party: check.responsible_party,
            due_date: check.due_date
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-checks'] });
    },
  });
}

// Data Protection Incident hooks - Using security_logs for now  
export function useDataProtectionIncidents() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['data-protection-incidents', profile?.sector],
    queryFn: async () => {
      let query = supabase
        .from('security_logs')
        .select('*')
        .eq('event_type', 'data_protection_incident')
        .order('created_at', { ascending: false });
      
      // Filter by sector for non-admin users
      if (profile?.role !== 'admin' && profile?.sector) {
        query = query.eq('sector', profile.sector);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Transform to DataProtectionIncident format
      return (data || []).map(log => {
        const metadata = log.metadata as any;
        return {
          id: log.id,
          incident_type: metadata?.incident_type || 'Unknown',
          data_types_affected: metadata?.data_types_affected || [],
          number_of_records: metadata?.number_of_records || 0,
          severity: log.severity as 'low' | 'medium' | 'high' | 'critical',
          sector: log.sector,
          description: log.description || '',
          detection_method: metadata?.detection_method || 'Unknown',
          containment_status: metadata?.containment_status || 'uncontained',
          notification_required: metadata?.notification_required || false,
          notification_sent: metadata?.notification_sent || false,
          reported_by: metadata?.reported_by || 'Unknown',
          assigned_to: metadata?.assigned_to || 'Unknown',
          incident_date: log.created_at,
          created_at: log.created_at,
          updated_at: log.created_at
        };
      }) as DataProtectionIncident[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useCreateDataProtectionIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (incident: Omit<DataProtectionIncident, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('security_logs')
        .insert({
          event_type: 'data_protection_incident',
          severity: incident.severity,
          source: 'Data Protection System',
          description: incident.description,
          sector: incident.sector,
          metadata: {
            incident_type: incident.incident_type,
            data_types_affected: incident.data_types_affected,
            number_of_records: incident.number_of_records,
            detection_method: incident.detection_method,
            containment_status: incident.containment_status,
            notification_required: incident.notification_required,
            notification_sent: incident.notification_sent,
            reported_by: incident.reported_by,
            assigned_to: incident.assigned_to
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-protection-incidents'] });
    },
  });
}

export function useUpdateDataProtectionIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DataProtectionIncident> & { id: string }) => {
      const { data, error } = await supabase
        .from('security_logs')
        .update({
          metadata: updates
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-protection-incidents'] });
    },
  });
}

// Real-time subscription hooks
export function useRealtimeThreatIntelligence() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['realtime-threat-intelligence'],
    queryFn: () => {
      const channel = supabase
        .channel('security_logs_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'security_logs' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['threat-intelligence'] });
          }
        )
        .subscribe();
      
      return channel;
    },
    refetchOnWindowFocus: false,
  });
}

export function useRealtimeDataProtectionIncidents() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['realtime-data-protection-incidents'],
    queryFn: () => {
      const channel = supabase
        .channel('security_logs_incidents_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'security_logs' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['data-protection-incidents'] });
          }
        )
        .subscribe();
      
      return channel;
    },
    refetchOnWindowFocus: false,
  });
}
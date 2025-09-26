import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSecurityTools() {
  return useQuery({
    queryKey: ['security-tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_tools')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });
}

export function useSplunkData() {
  return useQuery({
    queryKey: ['splunk-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('splunk_data')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

export function useQualysData() {
  return useQuery({
    queryKey: ['qualys-assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qualys_assets')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

export function useMispData() {
  return useQuery({
    queryKey: ['misp-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('misp_events')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

export function useNessusData() {
  return useQuery({
    queryKey: ['nessus-scans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nessus_scans')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}

export function useNozomiData() {
  return useQuery({
    queryKey: ['nozomi-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nozomi_alerts')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });
}
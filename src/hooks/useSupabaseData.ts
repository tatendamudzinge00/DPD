import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

// Incident types
export interface Incident {
  id: string;
  title: string;
  description?: string;
  severity: string;
  status: string;
  sector: string;
  reported_by?: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityLog {
  id: string;
  event_type: string;
  severity: string;
  source: string;
  target?: string;
  description?: string;
  sector: string;
  metadata?: any;
  created_at: string;
}

// Incidents hooks
export function useIncidents() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Incident[];
    },
    enabled: !!profile,
  });
}

export function useCreateIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (incident: Omit<Incident, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('incidents')
        .insert(incident)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
}

export function useUpdateIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Incident> & { id: string }) => {
      const { data, error } = await supabase
        .from('incidents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
}

// Security logs hooks
export function useSecurityLogs() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['security-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as SecurityLog[];
    },
    enabled: !!profile,
  });
}

export function useCreateSecurityLog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (log: Omit<SecurityLog, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('security_logs')
        .insert(log)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-logs'] });
    },
  });
}

// Real-time subscription hooks
export function useRealtimeIncidents() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  
  useEffect(() => {
    if (!profile) return;
    
    const channel = supabase
      .channel('incidents-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'incidents'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['incidents'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, profile]);
}

export function useRealtimeSecurityLogs() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  
  useEffect(() => {
    if (!profile) return;
    
    const channel = supabase
      .channel('security-logs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'security_logs'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['security-logs'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, profile]);
}
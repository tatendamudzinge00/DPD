import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

export interface DataSubjectRequest {
  id: string;
  email: string;
  request_type: string;
  description?: string;
  status: string;
  priority: string;
  requester_name?: string;
  sector: string;
  submitted_at: string;
  completed_at?: string;
  assigned_to?: string;
  notes?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

// Data subject requests hooks
export function useDataSubjectRequests() {
  const { profile } = useAuth();
  
  return useQuery({
    queryKey: ['data-subject-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_subject_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DataSubjectRequest[];
    },
    enabled: !!profile,
  });
}

export function useCreateDataSubjectRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: Omit<DataSubjectRequest, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('data_subject_requests')
        .insert(request)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-subject-requests'] });
    },
  });
}

export function useUpdateDataSubjectRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DataSubjectRequest> & { id: string }) => {
      const { data, error } = await supabase
        .from('data_subject_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-subject-requests'] });
    },
  });
}

// Real-time subscription for data subject requests
export function useRealtimeDataSubjectRequests() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  
  useEffect(() => {
    if (!profile) return;
    
    const channel = supabase
      .channel('data-subject-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'data_subject_requests'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['data-subject-requests'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, profile]);
}
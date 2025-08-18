import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ThreatFeed {
  id: string;
  name: string;
  description?: string;
  feed_type: string;
  url?: string;
  api_key_required: boolean;
  is_active: boolean;
  last_updated?: string;
  sector?: string;
  confidence_score: number;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface IOC {
  id: string;
  ioc_type: string;
  value: string;
  description?: string;
  threat_type?: string;
  severity: string;
  confidence_score: number;
  source_feed_id?: string;
  first_seen: string;
  last_seen: string;
  is_active: boolean;
  sector?: string;
  tags?: string[];
  mitre_attack_id?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface ThreatActor {
  id: string;
  name: string;
  aliases?: string[];
  description?: string;
  motivation?: string;
  sophistication?: string;
  origin_country?: string;
  target_sectors?: string[];
  active_since?: string;
  last_activity?: string;
  mitre_attack_techniques?: string[];
  known_campaigns?: string[];
  is_active: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface SharedIntelligence {
  id: string;
  title: string;
  description?: string;
  intelligence_type: string;
  sharing_level: string;
  stix_package?: any;
  taxii_collection?: string;
  source_sector: string;
  target_sectors?: string[];
  confidence_score: number;
  status: string;
  validated_by?: string;
  validated_at?: string;
  distribution_count: number;
  feedback_score?: number;
  tags?: string[];
  related_incidents?: string[];
  shared_by: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

// Threat Feeds
export function useThreatFeeds() {
  return useQuery({
    queryKey: ['threat-feeds'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threat_feeds')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ThreatFeed[];
    },
  });
}

export function useCreateThreatFeed() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (feed: Omit<ThreatFeed, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('threat_feeds')
        .insert(feed)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threat-feeds'] });
    },
  });
}

// IOCs
export function useIOCs() {
  return useQuery({
    queryKey: ['iocs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('indicators_of_compromise')
        .select('*')
        .order('last_seen', { ascending: false });
      
      if (error) throw error;
      return data as IOC[];
    },
    refetchInterval: 30000,
  });
}

export function useCreateIOC() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (ioc: Omit<IOC, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('indicators_of_compromise')
        .insert(ioc)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iocs'] });
    },
  });
}

// Threat Actors
export function useThreatActors() {
  return useQuery({
    queryKey: ['threat-actors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threat_actors')
        .select('*')
        .order('last_activity', { ascending: false });
      
      if (error) throw error;
      return data as ThreatActor[];
    },
  });
}

export function useCreateThreatActor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (actor: Omit<ThreatActor, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('threat_actors')
        .insert(actor)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threat-actors'] });
    },
  });
}

// Shared Intelligence
export function useSharedIntelligence() {
  return useQuery({
    queryKey: ['shared-intelligence'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shared_intelligence')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SharedIntelligence[];
    },
  });
}

export function useCreateSharedIntelligence() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (intel: Omit<SharedIntelligence, 'id' | 'created_at' | 'updated_at' | 'shared_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('shared_intelligence')
        .insert({ ...intel, shared_by: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared-intelligence'] });
    },
  });
}

export function useValidateSharedIntelligence() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('shared_intelligence')
        .update({ 
          status, 
          validated_by: user.id,
          validated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shared-intelligence'] });
    },
  });
}

// Real-time subscriptions
export function useRealtimeIOCs() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['realtime-iocs'],
    queryFn: () => null,
    enabled: false,
    meta: {
      subscription: supabase
        .channel('iocs-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'indicators_of_compromise' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['iocs'] });
          }
        )
        .subscribe(),
    },
  });
}

export function useRealtimeSharedIntelligence() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['realtime-shared-intelligence'],
    queryFn: () => null,
    enabled: false,
    meta: {
      subscription: supabase
        .channel('shared-intel-changes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'shared_intelligence' },
          () => {
            queryClient.invalidateQueries({ queryKey: ['shared-intelligence'] });
          }
        )
        .subscribe(),
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, LogEntry, IncidentData, ThreatData } from '../services/api';

// Logs
export function useLogs() {
  return useQuery({
    queryKey: ['logs'],
    queryFn: apiService.getLogs,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useSendLog() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (log: LogEntry) => apiService.sendLog(log),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
}

// Incidents
export function useCreateIncident() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (incident: IncidentData) => apiService.createIncident(incident),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
}

// Threat Intelligence
export function useThreatIntelligence() {
  return useQuery({
    queryKey: ['threats'],
    queryFn: apiService.getThreatIntelligence,
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useSendThreat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (threat: ThreatData) => apiService.sendThreatIntelligence(threat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
  });
}

// System Health
export function useSystemHealth() {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: apiService.getSystemHealth,
    refetchInterval: 30000, // Check every 30 seconds
  });
}

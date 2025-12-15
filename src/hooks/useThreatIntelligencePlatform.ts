import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  threatIntelligencePlatform, 
  ThreatIntelligencePlatform,
  SecurityAlert,
  ThreatMetrics,
  ComplianceStatus,
  DataSourceType
} from '@/lib/threatIntelligenceEngine';

// Hook for real-time threat intelligence data
export function useThreatIntelligencePlatform() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['threat-intelligence-platform'],
    queryFn: () => {
      threatIntelligencePlatform.clearAlerts();
      threatIntelligencePlatform.processSecurityTools();
      return threatIntelligencePlatform.getDashboardData();
    },
    refetchInterval: 15000, // Update every 15 seconds like Python code
    staleTime: 10000
  });
}

// Individual data source hooks
export function useSimulatedSplunkData() {
  return useQuery({
    queryKey: ['simulated-splunk'],
    queryFn: () => threatIntelligencePlatform.getSplunkData(),
    refetchInterval: 30000
  });
}

export function useSimulatedQualysData() {
  return useQuery({
    queryKey: ['simulated-qualys'],
    queryFn: () => threatIntelligencePlatform.getQualysData(),
    refetchInterval: 30000
  });
}

export function useSimulatedMISPData() {
  return useQuery({
    queryKey: ['simulated-misp'],
    queryFn: () => threatIntelligencePlatform.getMISPData(),
    refetchInterval: 30000
  });
}

export function useSimulatedNessusData() {
  return useQuery({
    queryKey: ['simulated-nessus'],
    queryFn: () => threatIntelligencePlatform.getNessusData(),
    refetchInterval: 30000
  });
}

export function useSimulatedNozomiData() {
  return useQuery({
    queryKey: ['simulated-nozomi'],
    queryFn: () => threatIntelligencePlatform.getNozomiData(),
    refetchInterval: 30000
  });
}

export function useSimulatedNozomiAssets() {
  return useQuery({
    queryKey: ['simulated-nozomi-assets'],
    queryFn: () => threatIntelligencePlatform.getNozomiAssets(),
    refetchInterval: 60000
  });
}

// Combined dashboard metrics hook
export function useDashboardMetrics() {
  const { data, isLoading, error } = useThreatIntelligencePlatform();
  
  const [historicalMetrics, setHistoricalMetrics] = useState<ThreatMetrics[]>([]);
  
  useEffect(() => {
    if (data?.metrics) {
      setHistoricalMetrics(prev => [...prev.slice(-10), data.metrics]);
    }
  }, [data?.metrics]);
  
  return {
    currentMetrics: data?.metrics,
    historicalMetrics,
    alerts: data?.alerts || [],
    recentAlerts: data?.recentAlerts || [],
    compliance: data?.compliance || [],
    isLoading,
    error
  };
}

// Alert filtering and search hook
export function useAlertFiltering(alerts: SecurityAlert[]) {
  const [filters, setFilters] = useState({
    severity: 'all',
    source: 'all',
    searchTerm: ''
  });
  
  const filteredAlerts = alerts.filter(alert => {
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    if (filters.source !== 'all' && alert.source !== filters.source) return false;
    if (filters.searchTerm && !JSON.stringify(alert).toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });
  
  return {
    filters,
    setFilters,
    filteredAlerts,
    totalCount: alerts.length,
    filteredCount: filteredAlerts.length
  };
}

// Real-time alert stream simulation
export function useAlertStream() {
  const [streamedAlerts, setStreamedAlerts] = useState<SecurityAlert[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  
  useEffect(() => {
    if (!isStreaming) return;
    
    const interval = setInterval(() => {
      threatIntelligencePlatform.processSecurityTools();
      const data = threatIntelligencePlatform.getDashboardData();
      
      if (data.recentAlerts.length > 0) {
        const newAlert = data.recentAlerts[0];
        setStreamedAlerts(prev => [newAlert, ...prev.slice(0, 49)]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isStreaming]);
  
  const toggleStreaming = useCallback(() => {
    setIsStreaming(prev => !prev);
  }, []);
  
  const clearStream = useCallback(() => {
    setStreamedAlerts([]);
  }, []);
  
  return {
    streamedAlerts,
    isStreaming,
    toggleStreaming,
    clearStream
  };
}


import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CyberSecuritySidebar } from "@/components/CyberSecuritySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DataProtectionDashboard } from "@/components/DataProtectionDashboard";
import { ComplianceMonitor } from "@/components/ComplianceMonitor";
import { SectorDetail } from "@/components/SectorDetail";
import { SectorOverview } from "@/components/SectorOverview";
import SecurityAnalyticsDashboard from "@/components/SecurityAnalyticsDashboard";
import ThreatMapDashboard from "@/components/ThreatMapDashboard";
import IncidentReportingPanel from "@/components/IncidentReportingPanel";
import InteractiveSecurityMap from "@/components/InteractiveSecurityMap";
import SecurityToolsIntegration from "@/components/SecurityToolsIntegration";
import { NetworkTrafficDashboard } from "@/components/NetworkTrafficDashboard";
import { SystemHealthDashboard } from "@/components/SystemHealthDashboard";
import { EndpointSecurityDashboard } from "@/components/EndpointSecurityDashboard";
import { IDSSIEMDashboard } from "@/components/IDSSIEMDashboard";
import { VulnerabilityManagementDashboard } from "@/components/VulnerabilityManagementDashboard";
import { IAMDashboard } from "@/components/IAMDashboard";
import { RiskGovernanceDashboard } from "@/components/RiskGovernanceDashboard";
import { DLPPrivacyDashboard } from "@/components/DLPPrivacyDashboard";
import { ForensicsDashboard } from "@/components/ForensicsDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRealtimeIncidents, useRealtimeSecurityLogs } from "@/hooks/useSupabaseData";

export type SectorType = 'government' | 'banking' | 'private' | 'education' | 'industrial' | 'telecoms' | 'health' | 'energy' | 'transport' | 'media' | 'overview' | 'zchpc' | 'analytics' | 'threat-map' | 'incident-reporting' | 'security-map' | 'security-tools' | 'network-traffic' | 'system-health' | 'endpoint-security' | 'ids-siem' | 'vulnerability-management' | 'iam' | 'risk-governance' | 'dlp-privacy' | 'forensics' | 'business-continuity';

const Index = () => {
  const [activeSector, setActiveSector] = useState<SectorType>('overview');
  const [showEnhancedIncidents, setShowEnhancedIncidents] = useState(false);
  
  // Enable real-time updates
  useRealtimeIncidents();
  useRealtimeSecurityLogs();

  const renderDashboardContent = () => {
    if (showEnhancedIncidents) {
      return <ComplianceMonitor />;
    }

    switch (activeSector) {
      case 'analytics':
        return <SecurityAnalyticsDashboard />;
      case 'threat-map':
        return <ThreatMapDashboard />;
      case 'incident-reporting':
        return <IncidentReportingPanel />;
      case 'security-map':
        return <InteractiveSecurityMap />;
      case 'security-tools':
        return <SecurityToolsIntegration />;
      case 'network-traffic':
        return <NetworkTrafficDashboard />;
      case 'system-health':
        return <SystemHealthDashboard />;
      case 'endpoint-security':
        return <EndpointSecurityDashboard />;
      case 'ids-siem':
        return <IDSSIEMDashboard />;
      case 'vulnerability-management':
        return <VulnerabilityManagementDashboard />;
      case 'iam':
        return <IAMDashboard />;
      case 'risk-governance':
        return <RiskGovernanceDashboard />;
      case 'dlp-privacy':
        return <DLPPrivacyDashboard />;
      case 'forensics':
      case 'business-continuity':
        return <ForensicsDashboard />;
      case 'overview':
        return <DataProtectionDashboard />;
      default:
        return <SectorDetail sector={activeSector} />;
    }
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-950">
          <CyberSecuritySidebar 
            activeSector={activeSector} 
            setActiveSector={setActiveSector}
          />
          <main className="flex-1 overflow-hidden">
            <div className="flex flex-col h-screen">
              <div className="flex items-center p-4">
                <SidebarTrigger className="mr-4" />
                <DashboardHeader 
                  onShowEnhancedIncidents={() => setShowEnhancedIncidents(!showEnhancedIncidents)}
                  showEnhancedIncidents={showEnhancedIncidents}
                />
              </div>
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {renderDashboardContent()}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Index;


import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CyberSecuritySidebar } from "@/components/CyberSecuritySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DataProtectionDashboard } from "@/components/DataProtectionDashboard";
import { ComplianceMonitor } from "@/components/ComplianceMonitor";
import { SectorDetail } from "@/components/SectorDetail";
import { SectorOverview } from "@/components/SectorOverview";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from '@/hooks/useAuth';
import { useRealtimeIncidents, useRealtimeSecurityLogs } from "@/hooks/useSupabaseData";

export type SectorType = 'government' | 'banking' | 'private' | 'education' | 'industrial' | 'telecoms' | 'health' | 'energy' | 'transport' | 'media' | 'overview' | 'zchpc';

const Index = () => {
  const { profile } = useAuth();
  const [activeSector, setActiveSector] = useState<SectorType>('overview');
  const [showEnhancedIncidents, setShowEnhancedIncidents] = useState(false);
  
  // Enable real-time updates
  useRealtimeIncidents();
  useRealtimeSecurityLogs();

  const renderDashboardContent = () => {
    if (showEnhancedIncidents) {
      return <ComplianceMonitor />;
    }

    if (!profile) return null;

    // Role-based dashboard rendering
    switch (profile.role) {
      case 'admin':
        return <DataProtectionDashboard />;
      case 'analyst':
        return <DataProtectionDashboard />;
      case 'sector-lead':
        return <DataProtectionDashboard />;
      default:
        // Sector-specific or overview dashboard
        if (activeSector && activeSector !== 'overview') {
          return <SectorDetail sector={activeSector} />;
        }
        return <SectorOverview />;
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

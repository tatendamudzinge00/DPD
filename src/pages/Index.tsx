
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CyberSecuritySidebar } from "@/components/CyberSecuritySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SectorOverview } from "@/components/SectorOverview";
import { ThreatMap } from "@/components/ThreatMap";
import { ThreatIntelligence } from "@/components/ThreatIntelligence";
import { IncidentTracker } from "@/components/IncidentTracker";
import { FeatureRequirements } from "@/components/FeatureRequirements";
import { SectorDetail } from "@/components/SectorDetail";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AnalystDashboard } from "@/components/AnalystDashboard";
import { SectorLeadDashboard } from "@/components/SectorLeadDashboard";
import { EnhancedIncidentTracker } from "@/components/EnhancedIncidentTracker";

export type SectorType = 'government' | 'banking' | 'private' | 'education' | 'industrial' | 'telecoms' | 'health' | 'energy' | 'transport' | 'media' | 'overview' | 'zchpc';

const Index = () => {
  const [activeSector, setActiveSector] = useState<SectorType>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'sector-lead'>('admin');
  const [showEnhancedIncidents, setShowEnhancedIncidents] = useState(false);

  const renderDashboardContent = () => {
    if (showEnhancedIncidents) {
      return <EnhancedIncidentTracker />;
    }

    // Role-based dashboard rendering
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'analyst':
        return <AnalystDashboard />;
      case 'sector-lead':
        return <SectorLeadDashboard sector={activeSector} />;
      default:
        // Default overview dashboard for backward compatibility
        if (activeSector === 'overview') {
          return (
            <>
              <SectorOverview />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ThreatMap />
                <ThreatIntelligence />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <IncidentTracker />
                <FeatureRequirements />
              </div>
            </>
          );
        } else {
          return <SectorDetail sector={activeSector} />;
        }
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-950">
        <CyberSecuritySidebar 
          activeSector={activeSector} 
          setActiveSector={setActiveSector}
          userRole={userRole}
        />
        <main className="flex-1 overflow-hidden">
          <div className="flex flex-col h-screen">
            <div className="flex items-center p-4">
              <SidebarTrigger className="mr-4" />
              <DashboardHeader 
                userRole={userRole} 
                setUserRole={setUserRole}
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
  );
};

export default Index;

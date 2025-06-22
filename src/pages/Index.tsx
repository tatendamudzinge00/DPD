
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

export type SectorType = 'government' | 'banking' | 'private' | 'education' | 'industrial' | 'telecoms' | 'health' | 'energy' | 'transport' | 'media' | 'overview';

const Index = () => {
  const [activeSector, setActiveSector] = useState<SectorType>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'sector-lead'>('admin');

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
            <DashboardHeader userRole={userRole} setUserRole={setUserRole} />
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {activeSector === 'overview' ? (
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
              ) : (
                <SectorDetail sector={activeSector} />
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

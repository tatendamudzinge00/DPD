import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CyberSecuritySidebar } from "@/components/CyberSecuritySidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SectorDashboard as SectorDashboardComponent } from "@/components/SectorDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRealtimeIncidents, useRealtimeSecurityLogs } from "@/hooks/useSupabaseData";

const SectorDashboard = () => {
  // Enable real-time updates
  useRealtimeIncidents();
  useRealtimeSecurityLogs();

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-950">
          <CyberSecuritySidebar 
            activeSector="overview" 
            setActiveSector={() => {}}
          />
          <main className="flex-1 overflow-hidden">
            <div className="flex flex-col h-screen">
              <div className="flex items-center p-4">
                <SidebarTrigger className="mr-4" />
                <DashboardHeader 
                  onShowEnhancedIncidents={() => {}}
                  showEnhancedIncidents={false}
                />
              </div>
              <div className="flex-1 overflow-auto">
                <SectorDashboardComponent />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default SectorDashboard;
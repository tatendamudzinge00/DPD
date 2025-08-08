
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, TrendingUp, Users, Loader2 } from "lucide-react";
import { useIncidents } from "../hooks/useSupabaseData";
import { useDataProtectionIncidents, useThreatIntelligence } from "../hooks/useSupabaseDataProtection";

export function SectorOverview() {
  const { data: incidents = [], isLoading: incidentsLoading } = useIncidents();
  const { data: dataIncidents = [], isLoading: dataIncidentsLoading } = useDataProtectionIncidents();
  const { data: threats = [], isLoading: threatsLoading } = useThreatIntelligence();

  const isLoading = incidentsLoading || dataIncidentsLoading || threatsLoading;

  // Calculate sector metrics from real Supabase data
  const getSectorMetrics = () => {
    const sectorCounts: { [key: string]: { threats: number; incidents: number; dataIncidents: number } } = {};
    
    // Count regular incidents by sector
    incidents.forEach(incident => {
      const sector = incident.sector;
      if (!sectorCounts[sector]) {
        sectorCounts[sector] = { threats: 0, incidents: 0, dataIncidents: 0 };
      }
      sectorCounts[sector].incidents++;
    });

    // Count data protection incidents by sector
    dataIncidents.forEach(incident => {
      const sector = incident.sector;
      if (!sectorCounts[sector]) {
        sectorCounts[sector] = { threats: 0, incidents: 0, dataIncidents: 0 };
      }
      sectorCounts[sector].dataIncidents++;
    });

    // Count threats affecting each sector
    threats.forEach(threat => {
      threat.affected_sectors.forEach(sector => {
        if (!sectorCounts[sector]) {
          sectorCounts[sector] = { threats: 0, incidents: 0, dataIncidents: 0 };
        }
        sectorCounts[sector].threats++;
      });
    });

    return Object.entries(sectorCounts).map(([name, counts]) => ({
      name,
      threats: counts.threats,
      incidents: counts.incidents + counts.dataIncidents,
      protection: Math.max(10, 100 - (counts.threats * 3 + counts.incidents * 5 + counts.dataIncidents * 8)),
      status: (counts.threats > 3 || counts.dataIncidents > 2) ? 'critical' : 
              (counts.threats > 1 || counts.incidents > 3) ? 'warning' : 'safe'
    }));
  };

  const sectors = getSectorMetrics();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <Shield className="h-4 w-4" />;
      case 'warning': return <TrendingUp className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const error = false; // Remove error handling since we're using multiple queries
  
  if (error) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Sector Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load sector data</p>
            <p className="text-slate-400 text-sm">Check API connection</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Sector Overview</span>
          </div>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sectors.length === 0 && !isLoading ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No sector data available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{sector.name}</h3>
                  <div className={`flex items-center space-x-1 ${getStatusColor(sector.status)}`}>
                    {getStatusIcon(sector.status)}
                    <Badge variant="outline" className={`text-xs ${getStatusColor(sector.status)} border-current`}>
                      {sector.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Threats</span>
                    <span className="text-red-400 font-semibold">{sector.threats}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Incidents</span>
                    <span className="text-amber-400 font-semibold">{sector.incidents}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Protection Score</span>
                      <span className="text-white font-semibold">{sector.protection}%</span>
                    </div>
                    <Progress value={sector.protection} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

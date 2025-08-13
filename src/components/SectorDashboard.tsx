import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Building2, Landmark, GraduationCap, Factory, Radio, 
  Heart, Zap, Truck, Tv, Server, Users, AlertTriangle, 
  Activity, TrendingUp, Clock, CheckCircle, XCircle 
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useIncidents, useSecurityLogs } from '@/hooks/useSupabaseData';

interface SectorInfo {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  color: string;
}

const allSectors: SectorInfo[] = [
  {
    id: 'government',
    title: 'Government',
    icon: Building2,
    description: 'Public sector agencies and government institutions',
    threatLevel: 'high',
    color: 'bg-blue-600'
  },
  {
    id: 'banking',
    title: 'Banking & Finance',
    icon: Landmark,
    description: 'Financial institutions and banking services',
    threatLevel: 'high',
    color: 'bg-green-600'
  },
  {
    id: 'private',
    title: 'Private Sector',
    icon: Users,
    description: 'Private companies and commercial enterprises',
    threatLevel: 'medium',
    color: 'bg-purple-600'
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    description: 'Educational institutions and research facilities',
    threatLevel: 'low',
    color: 'bg-indigo-600'
  },
  {
    id: 'industrial',
    title: 'Industrial & Mining',
    icon: Factory,
    description: 'Manufacturing and mining operations',
    threatLevel: 'medium',
    color: 'bg-orange-600'
  },
  {
    id: 'telecoms',
    title: 'Telecoms & ICT',
    icon: Radio,
    description: 'Telecommunications and ICT infrastructure',
    threatLevel: 'high',
    color: 'bg-cyan-600'
  },
  {
    id: 'health',
    title: 'Health Sector',
    icon: Heart,
    description: 'Healthcare facilities and medical services',
    threatLevel: 'medium',
    color: 'bg-red-600'
  },
  {
    id: 'energy',
    title: 'Energy',
    icon: Zap,
    description: 'Power generation and energy infrastructure',
    threatLevel: 'high',
    color: 'bg-yellow-600'
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: Truck,
    description: 'Transportation systems and logistics',
    threatLevel: 'low',
    color: 'bg-teal-600'
  },
  {
    id: 'media',
    title: 'Media',
    icon: Tv,
    description: 'Media outlets and broadcasting services',
    threatLevel: 'low',
    color: 'bg-pink-600'
  },
  {
    id: 'zchpc',
    title: 'Zimbabwe Centre For High Performance Computing (ZCHPC)',
    icon: Server,
    description: 'High-performance computing and research infrastructure',
    threatLevel: 'high',
    color: 'bg-slate-600'
  }
];

const getThreatLevelColor = (level: string) => {
  switch (level) {
    case 'critical': return 'bg-red-700 text-red-100';
    case 'high': return 'bg-red-600 text-red-100';
    case 'medium': return 'bg-amber-600 text-amber-100';
    case 'low': return 'bg-green-600 text-green-100';
    default: return 'bg-gray-600 text-gray-100';
  }
};

export function SectorDashboard() {
  const { profile } = useAuth();
  const { data: incidents = [] } = useIncidents();
  const { data: securityLogs = [] } = useSecurityLogs();

  // Determine which sectors to show based on user role
  const sectorsToShow = React.useMemo(() => {
    if (!profile) return [];
    
    // Admins see all sectors (National Overview)
    if (profile.role === 'admin') {
      return allSectors;
    }
    
    // Sector-specific users only see their sector
    return allSectors.filter(sector => sector.id === profile.sector);
  }, [profile]);

  const getSectorMetrics = (sectorId: string) => {
    const sectorIncidents = incidents.filter(inc => inc.sector === sectorId);
    const sectorLogs = securityLogs.filter(log => log.sector === sectorId);
    
    return {
      totalIncidents: sectorIncidents.length,
      activeIncidents: sectorIncidents.filter(inc => inc.status === 'open').length,
      criticalIncidents: sectorIncidents.filter(inc => inc.severity === 'critical').length,
      recentLogs: sectorLogs.slice(0, 5),
      lastActivity: sectorLogs.length > 0 ? sectorLogs[0].created_at : null
    };
  };

  const renderSectorCard = (sector: SectorInfo) => {
    const metrics = getSectorMetrics(sector.id);
    const Icon = sector.icon;

    return (
      <Card key={sector.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${sector.color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">{sector.title}</CardTitle>
                <p className="text-slate-400 text-sm mt-1">{sector.description}</p>
              </div>
            </div>
            <Badge className={getThreatLevelColor(sector.threatLevel)}>
              {sector.threatLevel.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{metrics.totalIncidents}</div>
              <div className="text-xs text-slate-400">Total Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{metrics.activeIncidents}</div>
              <div className="text-xs text-slate-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{metrics.criticalIncidents}</div>
              <div className="text-xs text-slate-400">Critical</div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">System Status</span>
              <div className="flex items-center space-x-2">
                {metrics.criticalIncidents > 0 ? (
                  <>
                    <XCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm">Alert</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm">Operational</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Last Activity</span>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400 text-sm">
                  {metrics.lastActivity 
                    ? new Date(metrics.lastActivity).toLocaleString()
                    : 'No recent activity'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {metrics.recentLogs.length > 0 && (
            <div className="mt-4">
              <h4 className="text-slate-300 text-sm font-medium mb-2">Recent Security Events</h4>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {metrics.recentLogs.map((log, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      log.severity === 'critical' ? 'bg-red-400' :
                      log.severity === 'high' ? 'bg-orange-400' :
                      log.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <span className="text-slate-400 truncate flex-1">{log.event_type}</span>
                    <span className="text-slate-500">{new Date(log.created_at).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (!profile) {
    return <div className="text-slate-400">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {profile.role === 'admin' ? 'National Overview' : `${sectorsToShow[0]?.title} Dashboard`}
          </h1>
          <p className="text-slate-400 mt-1">
            {profile.role === 'admin' 
              ? 'Comprehensive view of all sectors in Zimbabwe\'s cybersecurity landscape'
              : `Security monitoring and incident management for ${sectorsToShow[0]?.description.toLowerCase()}`
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            {profile.role === 'admin' ? 'National Administrator' : `${profile.sector} Sector`}
          </Badge>
        </div>
      </div>

      {/* Summary Statistics for Admins */}
      {profile.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Sectors</CardTitle>
              <Shield className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{allSectors.length}</div>
              <p className="text-xs text-slate-400">Active sectors monitored</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{incidents.length}</div>
              <p className="text-xs text-slate-400">Across all sectors</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Incidents</CardTitle>
              <Activity className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {incidents.filter(inc => inc.status === 'open').length}
              </div>
              <p className="text-xs text-slate-400">Requiring attention</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Security Events</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityLogs.length}</div>
              <p className="text-xs text-slate-400">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sector Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sectorsToShow.map(renderSectorCard)}
      </div>

      {/* Empty State for users with no sector access */}
      {sectorsToShow.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Sector Access</h3>
          <p className="text-slate-400">
            Your account doesn't have access to any specific sector. Please contact your administrator.
          </p>
        </div>
      )}
    </div>
  );
}
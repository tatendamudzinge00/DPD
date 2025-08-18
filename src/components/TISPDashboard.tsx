import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Share2, 
  Database, 
  Users, 
  TrendingUp,
  Globe,
  Activity,
  Bell,
  FileSearch,
  Zap,
  Lock,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useThreatFeeds, useIOCs, useThreatActors, useSharedIntelligence } from '@/hooks/useThreatIntelligence';
import { useIncidents } from '@/hooks/useSupabaseData';

interface TISPDashboardProps {
  onNavigate: (section: string) => void;
}

export const TISPDashboard: React.FC<TISPDashboardProps> = ({ onNavigate }) => {
  const { profile } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  const { data: threatFeeds = [] } = useThreatFeeds();
  const { data: iocs = [] } = useIOCs();
  const { data: threatActors = [] } = useThreatActors();
  const { data: sharedIntel = [] } = useSharedIntelligence();
  const { data: incidents = [] } = useIncidents();

  // Calculate KPIs
  const activeThreatAlerts = iocs.filter(ioc => ioc.severity === 'critical' || ioc.severity === 'high').length;
  const totalIOCs = iocs.length;
  const sharedIntelCount = sharedIntel.length;
  const activeThreatActors = threatActors.filter(actor => actor.is_active).length;
  
  // Threat level calculation
  const criticalThreats = iocs.filter(ioc => ioc.severity === 'critical').length;
  const highThreats = iocs.filter(ioc => ioc.severity === 'high').length;
  const threatLevel = criticalThreats > 0 ? 'CRITICAL' : highThreats > 0 ? 'HIGH' : 'MEDIUM';
  
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-destructive';
      case 'HIGH': return 'text-orange-500';
      case 'MEDIUM': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'default';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex-1 space-y-6 p-6 bg-slate-950 text-white min-h-screen overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            National Threat Intelligence Sharing Platform
          </h1>
          <p className="text-slate-400 mt-2">
            Zimbabwe Cyber Security Operations Center • {profile?.role} • {profile?.sector}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getThreatLevelColor(threatLevel)}>
            <AlertTriangle className="w-4 h-4 mr-1" />
            Threat Level: {threatLevel}
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Threat Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeThreatAlerts}</div>
            <p className="text-xs text-slate-400">Critical & High severity</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">IOC Count</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalIOCs}</div>
            <p className="text-xs text-slate-400">Indicators of Compromise</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Shared Intel Packages</CardTitle>
            <Share2 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{sharedIntelCount}</div>
            <p className="text-xs text-slate-400">Cross-sector sharing</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Threat Actors</CardTitle>
            <Users className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{activeThreatActors}</div>
            <p className="text-xs text-slate-400">Known APT groups</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="threat-feeds">Threat Feeds</TabsTrigger>
          <TabsTrigger value="iocs">IOCs</TabsTrigger>
          <TabsTrigger value="shared-intel">Shared Intel</TabsTrigger>
          <TabsTrigger value="actors">Threat Actors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Map Placeholder */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Global Threat Map
                </CardTitle>
                <CardDescription>Real-time threat activity visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Interactive threat map will be displayed here</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => onNavigate('threat-map')}
                    >
                      View Full Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IOC Trends */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  IOC Detection Trends
                </CardTitle>
                <CardDescription>Daily threat indicator patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Malicious IPs</span>
                    <span className="text-sm font-medium">{iocs.filter(i => i.ioc_type === 'ip').length}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Malicious Domains</span>
                    <span className="text-sm font-medium">{iocs.filter(i => i.ioc_type === 'domain').length}</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">File Hashes</span>
                    <span className="text-sm font-medium">{iocs.filter(i => i.ioc_type === 'hash').length}</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Threat Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {iocs.slice(0, 10).map((ioc) => (
                      <div key={ioc.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(ioc.severity)}>
                              {ioc.severity}
                            </Badge>
                            <span className="text-sm font-medium text-slate-300">{ioc.ioc_type.toUpperCase()}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 truncate">{ioc.value}</p>
                        </div>
                        <span className="text-xs text-slate-500">{getTimeAgo(ioc.last_seen)}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Intelligence Sharing Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {sharedIntel.slice(0, 10).map((intel) => (
                      <div key={intel.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{intel.status}</Badge>
                            <span className="text-sm font-medium text-slate-300">{intel.intelligence_type}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 truncate">{intel.title}</p>
                          <p className="text-xs text-slate-500">From: {intel.source_sector}</p>
                        </div>
                        <span className="text-xs text-slate-500">{getTimeAgo(intel.created_at)}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threat-feeds">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Threat Feed Management
              </CardTitle>
              <CardDescription>Monitor and manage external threat intelligence feeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {threatFeeds.map((feed) => (
                  <Card key={feed.id} className="border-slate-700 bg-slate-800/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{feed.name}</CardTitle>
                        <Badge variant={feed.is_active ? "default" : "secondary"}>
                          {feed.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-400 mb-2">{feed.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Type: {feed.feed_type}</span>
                        <span className="text-slate-500">Score: {feed.confidence_score}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iocs">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-primary" />
                Indicators of Compromise
              </CardTitle>
              <CardDescription>Monitor and analyze threat indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {iocs.map((ioc) => (
                    <div key={ioc.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                        <Badge variant={getSeverityColor(ioc.severity)}>
                          {ioc.severity}
                        </Badge>
                        <Badge variant="outline">{ioc.ioc_type}</Badge>
                        {ioc.threat_type && (
                          <Badge variant="secondary">{ioc.threat_type}</Badge>
                        )}
                        </div>
                        <p className="text-sm font-mono text-slate-300 mb-1">{ioc.value}</p>
                        {ioc.description && (
                          <p className="text-xs text-slate-400">{ioc.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>First seen: {getTimeAgo(ioc.first_seen)}</span>
                          <span>Last seen: {getTimeAgo(ioc.last_seen)}</span>
                          <span>Confidence: {ioc.confidence_score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared-intel">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Shared Intelligence Packages
              </CardTitle>
              <CardDescription>Cross-sector threat intelligence sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedIntel.map((intel) => (
                  <Card key={intel.id} className="border-slate-700 bg-slate-800/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{intel.title}</CardTitle>
                        <Badge variant={intel.status === 'validated' ? 'default' : 'secondary'}>
                          {intel.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-400 mb-3">{intel.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-500">Type: {intel.intelligence_type}</span>
                          <span className="text-slate-500">From: {intel.source_sector}</span>
                          <span className="text-slate-500">Level: {intel.sharing_level}</span>
                        </div>
                        <span className="text-slate-500">{getTimeAgo(intel.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actors">
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Threat Actor Profiles
              </CardTitle>
              <CardDescription>Known threat actors and APT groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {threatActors.map((actor) => (
                  <Card key={actor.id} className="border-slate-700 bg-slate-800/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{actor.name}</CardTitle>
                        <Badge variant={actor.is_active ? "destructive" : "secondary"}>
                          {actor.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-slate-400 mb-3">{actor.description}</p>
                      <div className="space-y-2 text-xs">
                        {actor.motivation && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Motivation:</span>
                            <span className="text-slate-300">{actor.motivation}</span>
                          </div>
                        )}
                        {actor.sophistication && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Sophistication:</span>
                            <span className="text-slate-300">{actor.sophistication}</span>
                          </div>
                        )}
                        {actor.origin_country && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Origin:</span>
                            <span className="text-slate-300">{actor.origin_country}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
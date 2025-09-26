import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Database, 
  AlertTriangle, 
  Activity, 
  Search,
  BarChart3,
  Cpu,
  Network,
  FileText
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const SecurityToolsIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch security tools data
  const { data: splunkData } = useQuery({
    queryKey: ['splunk-data'],
    queryFn: async () => {
      const { data } = await supabase
        .from('splunk_data')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 30000
  });

  const { data: qualysData } = useQuery({
    queryKey: ['qualys-assets'],
    queryFn: async () => {
      const { data } = await supabase
        .from('qualys_assets')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 30000
  });

  const { data: mispData } = useQuery({
    queryKey: ['misp-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('misp_events')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 30000
  });

  const { data: nessusData } = useQuery({
    queryKey: ['nessus-scans'],
    queryFn: async () => {
      const { data } = await supabase
        .from('nessus_scans')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 30000
  });

  const { data: nozomiData } = useQuery({
    queryKey: ['nozomi-alerts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('nozomi_alerts')
        .select('*')
        .order('collected_at', { ascending: false })
        .limit(10);
      return data || [];
    },
    refetchInterval: 30000
  });

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getThreatLevelColor = (level: number) => {
    if (level >= 3) return 'destructive';
    if (level === 2) return 'default';
    return 'secondary';
  };

  const triggerDataCollection = async () => {
    try {
      const response = await supabase.functions.invoke('security-tools-collector');
      console.log('Data collection triggered:', response);
    } catch (error) {
      console.error('Error triggering data collection:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Tools Integration</h2>
          <p className="text-muted-foreground">
            Real-time data from integrated security tools and platforms
          </p>
        </div>
        <Button onClick={triggerDataCollection} className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Collect Latest Data
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Splunk Threats</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{splunkData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Recent threat detections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualys Assets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qualysData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Vulnerability scanned assets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MISP Events</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mispData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Threat intelligence events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nessus Scans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nessusData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Recent vulnerability scans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nozomi Alerts</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nozomiData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              ICS/OT security alerts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="splunk">Splunk</TabsTrigger>
          <TabsTrigger value="qualys">Qualys</TabsTrigger>
          <TabsTrigger value="misp">MISP</TabsTrigger>
          <TabsTrigger value="nessus">Nessus</TabsTrigger>
          <TabsTrigger value="nozomi">Nozomi</TabsTrigger>
        </TabsList>

        <TabsContent value="splunk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Splunk Threat Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {splunkData?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{item.threat_type}</p>
                      <p className="text-sm text-muted-foreground">Count: {item.count}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.collected_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={getSeverityColor(item.severity)}>
                      {item.severity}
                    </Badge>
                  </div>
                ))}
                {!splunkData?.length && (
                  <p className="text-center text-muted-foreground py-8">
                    No Splunk data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Qualys Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualysData?.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{asset.hostname || asset.host_ip}</p>
                      <p className="text-sm text-muted-foreground">
                        Vulnerabilities: {asset.vulnerabilities_count}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Score: {asset.severity_score}
                      </p>
                    </div>
                    <Badge variant={asset.vulnerabilities_count > 10 ? 'destructive' : 'secondary'}>
                      {asset.asset_type}
                    </Badge>
                  </div>
                ))}
                {!qualysData?.length && (
                  <p className="text-center text-muted-foreground py-8">
                    No Qualys data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="misp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                MISP Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mispData?.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{event.event_title}</p>
                      <p className="text-sm text-muted-foreground">
                        Attributes: {event.attributes_count}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                    <Badge variant={getThreatLevelColor(event.threat_level)}>
                      Level {event.threat_level}
                    </Badge>
                  </div>
                ))}
                {!mispData?.length && (
                  <p className="text-center text-muted-foreground py-8">
                    No MISP data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nessus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Nessus Vulnerability Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nessusData?.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{scan.scan_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Critical: {scan.critical_count} | High: {scan.high_count} | Medium: {scan.medium_count}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: {scan.scan_status}
                      </p>
                    </div>
                    <Badge variant={scan.critical_count > 0 ? 'destructive' : 'secondary'}>
                      {scan.vulnerabilities_found} vulns
                    </Badge>
                  </div>
                ))}
                {!nessusData?.length && (
                  <p className="text-center text-muted-foreground py-8">
                    No Nessus data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nozomi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Nozomi ICS/OT Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nozomiData?.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{alert.alert_type}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.source_ip} → {alert.destination_ip} ({alert.protocol})
                      </p>
                    </div>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
                {!nozomiData?.length && (
                  <p className="text-center text-muted-foreground py-8">
                    No Nozomi data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityToolsIntegration;
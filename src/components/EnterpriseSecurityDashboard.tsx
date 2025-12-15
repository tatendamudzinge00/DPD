import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  Eye,
  Search,
  RefreshCw,
  Globe,
  Server,
  Database,
  Network,
  Lock,
  FileWarning,
  BarChart3,
  PieChart
} from 'lucide-react';
import { 
  useDashboardMetrics, 
  useAlertFiltering, 
  useAlertStream,
  useSimulatedSplunkData,
  useSimulatedQualysData,
  useSimulatedMISPData,
  useSimulatedNessusData,
  useSimulatedNozomiData
} from '@/hooks/useThreatIntelligencePlatform';
import { SecurityAlert } from '@/lib/threatIntelligenceEngine';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const SEVERITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e'
};

const SOURCE_COLORS = {
  Splunk: '#8884d8',
  Qualys: '#82ca9d',
  MISP: '#ffc658',
  Nessus: '#ff7c7c',
  Nozomi: '#8dd1e1'
};

export function EnterpriseSecurityDashboard() {
  const { currentMetrics, alerts, recentAlerts, compliance, isLoading } = useDashboardMetrics();
  const { streamedAlerts, isStreaming, toggleStreaming, clearStream } = useAlertStream();
  const { filters, setFilters, filteredAlerts } = useAlertFiltering(alerts);
  
  const splunkData = useSimulatedSplunkData();
  const qualysData = useSimulatedQualysData();
  const mispData = useSimulatedMISPData();
  const nessusData = useSimulatedNessusData();
  const nozomiData = useSimulatedNozomiData();

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      default: return 'secondary';
    }
  };

  const severityData = currentMetrics ? [
    { name: 'Critical', value: currentMetrics.critical_alerts, color: SEVERITY_COLORS.Critical },
    { name: 'High', value: currentMetrics.high_alerts, color: SEVERITY_COLORS.High },
    { name: 'Medium', value: currentMetrics.medium_alerts, color: SEVERITY_COLORS.Medium },
    { name: 'Low', value: currentMetrics.low_alerts, color: SEVERITY_COLORS.Low }
  ] : [];

  const sourceData = currentMetrics?.alerts_by_source 
    ? Object.entries(currentMetrics.alerts_by_source).map(([name, value]) => ({
        name,
        value,
        color: SOURCE_COLORS[name as keyof typeof SOURCE_COLORS] || '#888888'
      }))
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with Live Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Threat Intelligence Platform</h1>
          <p className="text-muted-foreground">
            Real-time security monitoring across all integrated tools
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isStreaming ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-muted-foreground">{isStreaming ? 'Live' : 'Paused'}</span>
          </div>
          <Button variant="outline" size="sm" onClick={toggleStreaming}>
            {isStreaming ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm" onClick={clearStream}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{currentMetrics?.critical_alerts || 0}</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <FileWarning className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{currentMetrics?.high_alerts || 0}</div>
            <p className="text-xs text-muted-foreground">Priority investigation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{currentMetrics?.total_alerts || 0}</div>
            <p className="text-xs text-muted-foreground">Across all sources</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Correlated</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">{currentMetrics?.correlated_attacks || 0}</div>
            <p className="text-xs text-muted-foreground">Related attack chains</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTTD</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{currentMetrics?.mttd_hours || 0}h</div>
            <p className="text-xs text-muted-foreground">Mean time to detect</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTTR</CardTitle>
            <Zap className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-500">{currentMetrics?.mttr_hours || 0}h</div>
            <p className="text-xs text-muted-foreground">Mean time to respond</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Alert Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Alerts by Source
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compliance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.framework}</span>
                    <Badge variant={item.status === 'Compliant' ? 'default' : 'secondary'}>
                      {item.score}%
                    </Badge>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Riskiest Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Riskiest Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {currentMetrics?.riskiest_assets.slice(0, 5).map((asset, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={asset.risk_score > 150 ? 'destructive' : asset.risk_score > 100 ? 'default' : 'secondary'}>
                    {asset.risk_score}
                  </Badge>
                </div>
                <p className="text-sm font-medium truncate" title={asset.asset}>{asset.asset}</p>
                <Progress value={Math.min(asset.risk_score, 200) / 2} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="live-alerts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="live-alerts">Live Alerts</TabsTrigger>
          <TabsTrigger value="splunk">Splunk</TabsTrigger>
          <TabsTrigger value="qualys">Qualys</TabsTrigger>
          <TabsTrigger value="misp">MISP</TabsTrigger>
          <TabsTrigger value="nessus">Nessus</TabsTrigger>
          <TabsTrigger value="nozomi">Nozomi</TabsTrigger>
        </TabsList>

        <TabsContent value="live-alerts">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Live Alert Stream ({streamedAlerts.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search alerts..." 
                    className="w-64"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                  />
                  <Select value={filters.severity} onValueChange={(v) => setFilters({ ...filters, severity: v })}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {streamedAlerts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Waiting for alerts...
                    </p>
                  ) : (
                    streamedAlerts.map((alert, index) => (
                      <div key={alert.id || index} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant={getSeverityVariant(alert.severity)}>{alert.severity}</Badge>
                              <Badge variant="outline">{alert.source}</Badge>
                              {alert.correlation_id && (
                                <Badge variant="secondary" className="text-xs">
                                  Correlated
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-semibold">{alert.threat_type}</h4>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                              <span>Confidence: {alert.confidence}%</span>
                              <span>Risk Score: {alert.risk_score}</span>
                              <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2 p-2 bg-muted rounded text-xs">
                          <strong>Recommendation:</strong> {alert.recommended_action}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splunk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Splunk SIEM Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {splunkData.data?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={item.severity === 'critical' ? 'destructive' : 'default'}>
                          {item.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item._time}</span>
                      </div>
                      <p className="font-medium">{item.message}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                        <span>Source: {item.src_ip}</span>
                        <span>Destination: {item.dest_ip}</span>
                        <span>User: {item.user}</span>
                        <span>Host: {item.host}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualys">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Qualys Vulnerability Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {qualysData.data?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.title}</span>
                        <Badge variant={item.severity >= 4 ? 'destructive' : 'default'}>
                          CVSS: {item.cvss_base}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <span>Host: {item.hostname}</span>
                        <span>Port: {item.port}/{item.protocol}</span>
                        <span>Vulns: {item.vulnerabilities_count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="misp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                MISP Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {mispData.data?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.event_title}</span>
                        <Badge variant={item.threat_level <= 2 ? 'destructive' : 'default'}>
                          Level {item.threat_level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.tags?.map((tag: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span>Type: {item.type}</span>
                        <span>Value: <code className="text-xs">{item.value?.slice(0, 30)}...</code></span>
                        <span>Category: {item.category}</span>
                        <span>Attributes: {item.attributes_count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nessus">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Nessus Scan Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {nessusData.data?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.scan_name}</span>
                        <Badge variant={item.critical_count > 0 ? 'destructive' : 'default'}>
                          {item.scan_status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="text-center p-2 bg-red-500/10 rounded">
                          <div className="font-bold text-red-500">{item.critical_count}</div>
                          <div className="text-xs text-muted-foreground">Critical</div>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 rounded">
                          <div className="font-bold text-orange-500">{item.high_count}</div>
                          <div className="text-xs text-muted-foreground">High</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-500/10 rounded">
                          <div className="font-bold text-yellow-500">{item.medium_count}</div>
                          <div className="text-xs text-muted-foreground">Medium</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 rounded">
                          <div className="font-bold text-green-500">{item.low_count}</div>
                          <div className="text-xs text-muted-foreground">Low</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Targets: {item.target_count} | Total Vulns: {item.vulnerabilities_found}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nozomi">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Nozomi OT/ICS Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {nozomiData.data?.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.alert_type}</span>
                        <Badge variant={item.severity === 'Critical' ? 'destructive' : 'default'}>
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span>Source: {item.source_ip}</span>
                        <span>Destination: {item.destination_ip}</span>
                        <span>Protocol: {item.protocol}</span>
                        <span>Asset: {item.asset_id}</span>
                      </div>
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <strong>Recommendation:</strong> {item.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EnterpriseSecurityDashboard;

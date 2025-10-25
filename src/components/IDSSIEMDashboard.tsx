import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIDSAlerts, useSIEMEvents } from "@/hooks/useEnterpriseData";
import { Shield, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IDSSIEMDashboard() {
  const { data: idsAlerts, isLoading: idsLoading } = useIDSAlerts();
  const { data: siemEvents, isLoading: siemLoading } = useSIEMEvents();

  const criticalAlerts = idsAlerts?.filter(a => a.severity === 'critical').length || 0;
  const highAlerts = idsAlerts?.filter(a => a.severity === 'high').length || 0;
  const falsePositives = idsAlerts?.filter(a => a.is_false_positive).length || 0;
  
  const criticalEvents = siemEvents?.filter(e => e.severity === 'critical').length || 0;
  const highEvents = siemEvents?.filter(e => e.severity === 'high').length || 0;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  if (idsLoading || siemLoading) {
    return <div className="text-muted-foreground">Loading IDS/SIEM data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Intrusion Detection & SIEM</h2>
        <p className="text-muted-foreground">Real-time threat detection and event correlation</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IDS Alerts</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{idsAlerts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Active alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SIEM Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{siemEvents?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Total events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positives</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{falsePositives}</div>
            <p className="text-xs text-muted-foreground">Marked as safe</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ids" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ids">IDS Alerts</TabsTrigger>
          <TabsTrigger value="siem">SIEM Events</TabsTrigger>
        </TabsList>

        <TabsContent value="ids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent IDS Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {idsAlerts?.slice(0, 20).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`h-5 w-5 ${alert.severity === 'critical' ? 'text-destructive' : 'text-yellow-500'}`} />
                        <div>
                          <div className="font-medium">{alert.attack_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.source_ip} → {alert.destination_ip}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Signature: {alert.attack_signature}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="font-medium">Confidence: {Number(alert.confidence_score).toFixed(0)}%</div>
                        <div className="text-muted-foreground">
                          {new Date(alert.alert_time).toLocaleTimeString()}
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!idsAlerts || idsAlerts.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No IDS alerts detected
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="siem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent SIEM Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {siemEvents?.slice(0, 20).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{event.event_type}</div>
                          <div className="text-sm text-muted-foreground">
                            Source: {event.source_system} | IP: {event.ip_address || 'N/A'}
                          </div>
                          {event.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {event.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="text-muted-foreground">
                          {new Date(event.event_time).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!siemEvents || siemEvents.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No SIEM events logged
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEndpoints } from "@/hooks/useEnterpriseData";
import { Monitor, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function EndpointSecurityDashboard() {
  const { data: endpoints, isLoading } = useEndpoints();

  const compliantCount = endpoints?.filter(e => e.compliance_status === 'compliant').length || 0;
  const nonCompliantCount = endpoints?.filter(e => e.compliance_status === 'non-compliant').length || 0;
  const protectedCount = endpoints?.filter(e => e.antivirus_status === 'protected').length || 0;
  
  const complianceRate = endpoints?.length ? (compliantCount / endpoints.length) * 100 : 0;

  if (isLoading) {
    return <div className="text-muted-foreground">Loading endpoint data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Endpoint Security Management</h2>
        <p className="text-muted-foreground">Device inventory and compliance monitoring</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Endpoints</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{endpoints?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Active devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{protectedCount}</div>
            <p className="text-xs text-muted-foreground">Antivirus active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{compliantCount}</div>
            <p className="text-xs text-muted-foreground">Meeting standards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Compliant</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{nonCompliantCount}</div>
            <p className="text-xs text-muted-foreground">Require action</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Compliance</span>
              <span className="text-2xl font-bold">{complianceRate.toFixed(1)}%</span>
            </div>
            <Progress value={complianceRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {endpoints?.map((endpoint) => (
              <div key={endpoint.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{endpoint.device_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {endpoint.device_type} | {endpoint.ip_address}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {endpoint.os_type} {endpoint.os_version}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <div className="font-medium">AV: {endpoint.antivirus_status}</div>
                    <div className="text-muted-foreground">Patch: {endpoint.patch_level}</div>
                  </div>
                  <Badge 
                    variant={endpoint.compliance_status === 'compliant' ? 'default' : 'destructive'}
                  >
                    {endpoint.compliance_status}
                  </Badge>
                </div>
              </div>
            ))}
            {(!endpoints || endpoints.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                No endpoints registered yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

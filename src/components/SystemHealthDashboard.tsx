import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSystemHealth } from "@/hooks/useEnterpriseData";
import { Server, Cpu, HardDrive, Activity, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function SystemHealthDashboard() {
  const { data: systems, isLoading } = useSystemHealth();

  const healthyCount = systems?.filter(s => s.status === 'healthy').length || 0;
  const warningCount = systems?.filter(s => s.status === 'warning').length || 0;
  const criticalCount = systems?.filter(s => s.status === 'critical').length || 0;
  
  const avgCpu = systems?.reduce((acc, curr) => acc + Number(curr.cpu_usage), 0) / (systems?.length || 1);
  const avgMemory = systems?.reduce((acc, curr) => acc + Number(curr.memory_usage), 0) / (systems?.length || 1);
  const avgDisk = systems?.reduce((acc, curr) => acc + Number(curr.disk_usage), 0) / (systems?.length || 1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Loading system health data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">System Health & Performance</h2>
        <p className="text-muted-foreground">Real-time infrastructure monitoring</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Systems</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{healthyCount}</div>
            <p className="text-xs text-muted-foreground">Operating normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{warningCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Systems</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systems?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Monitored servers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Average CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{avgCpu.toFixed(1)}%</div>
            <Progress value={avgCpu} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Average Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{avgMemory.toFixed(1)}%</div>
            <Progress value={avgMemory} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Average Disk Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{avgDisk.toFixed(1)}%</div>
            <Progress value={avgDisk} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systems?.map((system) => (
              <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(system.status)}`} />
                    <div>
                      <div className="font-medium">{system.server_name}</div>
                      <div className="text-sm text-muted-foreground">{system.server_type}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">CPU</div>
                    <div className="text-sm font-medium">{Number(system.cpu_usage).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Memory</div>
                    <div className="text-sm font-medium">{Number(system.memory_usage).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Disk</div>
                    <div className="text-sm font-medium">{Number(system.disk_usage).toFixed(1)}%</div>
                  </div>
                </div>
                <Badge variant={system.status === 'healthy' ? 'default' : system.status === 'warning' ? 'secondary' : 'destructive'}>
                  {system.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

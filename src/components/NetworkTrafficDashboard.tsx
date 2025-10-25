import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetworkTraffic } from "@/hooks/useEnterpriseData";
import { Activity, Globe, Shield, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function NetworkTrafficDashboard() {
  const { data: traffic, isLoading } = useNetworkTraffic();

  const anomalyCount = traffic?.filter(t => t.anomaly_detected).length || 0;
  const totalPackets = traffic?.length || 0;
  
  const protocolStats = traffic?.reduce((acc: any, curr) => {
    acc[curr.protocol] = (acc[curr.protocol] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(protocolStats || {}).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  if (isLoading) {
    return <div className="text-muted-foreground">Loading network traffic data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Network Traffic Analysis</h2>
        <p className="text-muted-foreground">Real-time packet inspection and anomaly detection</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPackets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 100 captured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{anomalyCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalPackets > 0 ? ((anomalyCount / totalPackets) * 100).toFixed(2) : 0}% of traffic
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique IPs</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(traffic?.map(t => t.source_ip)).size}
            </div>
            <p className="text-xs text-muted-foreground">Source addresses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protocols</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(protocolStats || {}).length}</div>
            <p className="text-xs text-muted-foreground">Different protocols</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Traffic Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] overflow-auto">
            <div className="space-y-2">
              {traffic?.slice(0, 15).map((t) => (
                <div key={t.id} className={`flex items-center justify-between p-2 rounded border ${t.anomaly_detected ? 'border-destructive bg-destructive/10' : 'border-border'}`}>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{t.source_ip} → {t.destination_ip}</div>
                    <div className="text-xs text-muted-foreground">{t.protocol} | Port {t.destination_port}</div>
                  </div>
                  {t.anomaly_detected && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

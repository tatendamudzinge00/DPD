import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForensicCases, useBusinessContinuity } from "@/hooks/useEnterpriseData";
import { FileSearch, Shield, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ForensicsDashboard() {
  const { data: forensics, isLoading: forensicsLoading } = useForensicCases();
  const { data: businessContinuity, isLoading: bcLoading } = useBusinessContinuity();

  const openCases = forensics?.filter(f => f.case_status === 'open').length || 0;
  const closedCases = forensics?.filter(f => f.case_status === 'closed').length || 0;
  
  const backupsHealthy = businessContinuity?.filter(bc => bc.backup_status === 'healthy').length || 0;
  const failoverReady = businessContinuity?.filter(bc => bc.failover_ready).length || 0;

  if (forensicsLoading || bcLoading) {
    return <div className="text-muted-foreground">Loading forensics data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Forensics & Business Continuity</h2>
        <p className="text-muted-foreground">Incident investigation and disaster recovery monitoring</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <FileSearch className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openCases}</div>
            <p className="text-xs text-muted-foreground">Active investigations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{closedCases}</div>
            <p className="text-xs text-muted-foreground">Investigations completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Systems</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{backupsHealthy}</div>
            <p className="text-xs text-muted-foreground">Healthy backups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failover Ready</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failoverReady}</div>
            <p className="text-xs text-muted-foreground">Systems prepared</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forensics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forensics">Forensic Cases</TabsTrigger>
          <TabsTrigger value="continuity">Business Continuity</TabsTrigger>
        </TabsList>

        <TabsContent value="forensics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forensic Investigation Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {forensics?.map((forensicCase) => (
                  <div key={forensicCase.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-medium">Case #{forensicCase.case_number}</div>
                        <div className="text-sm text-muted-foreground">
                          Opened: {new Date(forensicCase.opened_date).toLocaleDateString()}
                        </div>
                        {forensicCase.closed_date && (
                          <div className="text-sm text-muted-foreground">
                            Closed: {new Date(forensicCase.closed_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <Badge variant={forensicCase.case_status === 'open' ? 'secondary' : 'default'}>
                        {forensicCase.case_status}
                      </Badge>
                    </div>
                    {forensicCase.findings && (
                      <div className="text-sm text-muted-foreground mt-2">
                        <strong>Findings:</strong> {forensicCase.findings}
                      </div>
                    )}
                  </div>
                ))}
                {(!forensics || forensics.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No forensic cases available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="continuity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Continuity Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessContinuity?.map((bc) => (
                  <div key={bc.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-medium">{bc.system_name}</div>
                        <div className="text-sm text-muted-foreground">
                          RTO: {bc.rto_minutes}min | RPO: {bc.rpo_minutes}min
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {bc.failover_ready && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Failover Ready
                          </Badge>
                        )}
                        <Badge variant={bc.backup_status === 'healthy' ? 'default' : 'destructive'}>
                          {bc.backup_status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Last Backup</div>
                        <div>{bc.last_backup ? new Date(bc.last_backup).toLocaleString() : 'Never'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Last Test</div>
                        <div>{bc.last_test ? new Date(bc.last_test).toLocaleDateString() : 'Never'}</div>
                      </div>
                    </div>
                    {bc.test_result && (
                      <div className="mt-3 text-sm">
                        <div className="text-xs text-muted-foreground">Test Result</div>
                        <div>{bc.test_result}</div>
                      </div>
                    )}
                  </div>
                ))}
                {(!businessContinuity || businessContinuity.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No business continuity data available
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

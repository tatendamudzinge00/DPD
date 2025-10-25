import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthLogs, useAccessControl } from "@/hooks/useEnterpriseData";
import { Lock, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IAMDashboard() {
  const { data: authLogs, isLoading: authLoading } = useAuthLogs();
  const { data: accessControl, isLoading: accessLoading } = useAccessControl();

  const failedLogins = authLogs?.filter(l => l.result === 'failed').length || 0;
  const mfaLogins = authLogs?.filter(l => l.mfa_used).length || 0;
  const privilegedAccess = authLogs?.filter(l => l.is_privileged).length || 0;
  
  const activePermissions = accessControl?.filter(a => a.is_active).length || 0;
  const expiringPermissions = accessControl?.filter(a => {
    if (!a.expiry_date) return false;
    const daysUntilExpiry = (new Date(a.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  }).length || 0;

  if (authLoading || accessLoading) {
    return <div className="text-muted-foreground">Loading IAM data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Identity & Access Management</h2>
        <p className="text-muted-foreground">Authentication monitoring and access control</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedLogins}</div>
            <p className="text-xs text-muted-foreground">Recent failed attempts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Usage</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{mfaLogins}</div>
            <p className="text-xs text-muted-foreground">
              {authLogs?.length ? ((mfaLogins / authLogs.length) * 100).toFixed(1) : 0}% adoption
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Privileged Access</CardTitle>
            <Lock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{privilegedAccess}</div>
            <p className="text-xs text-muted-foreground">Admin/elevated sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Permissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePermissions}</div>
            <p className="text-xs text-muted-foreground">{expiringPermissions} expiring soon</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="auth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="auth">Authentication Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Authentication Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {authLogs?.slice(0, 20).map((log) => (
                  <div key={log.id} className={`flex items-center justify-between p-4 border rounded-lg ${log.result === 'failed' ? 'border-destructive bg-destructive/5' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Lock className={`h-5 w-5 ${log.result === 'failed' ? 'text-destructive' : 'text-green-500'}`} />
                        <div>
                          <div className="font-medium">{log.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {log.auth_method} | IP: {log.ip_address}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(log.log_time).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {log.mfa_used && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          MFA
                        </Badge>
                      )}
                      {log.is_privileged && (
                        <Badge variant="secondary">Privileged</Badge>
                      )}
                      <Badge variant={log.result === 'success' ? 'default' : 'destructive'}>
                        {log.result}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!authLogs || authLogs.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No authentication logs available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessControl?.map((access) => {
                  const expiryDate = access.expiry_date ? new Date(access.expiry_date) : null;
                  const isExpiring = expiryDate && (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 30;
                  
                  return (
                    <div key={access.id} className={`flex items-center justify-between p-4 border rounded-lg ${isExpiring ? 'border-yellow-500 bg-yellow-500/5' : ''}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{access.resource}</div>
                            <div className="text-sm text-muted-foreground">
                              Permission: {access.permission}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Granted: {new Date(access.granted_date).toLocaleDateString()}
                              {expiryDate && ` | Expires: ${expiryDate.toLocaleDateString()}`}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isExpiring && (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                            Expiring Soon
                          </Badge>
                        )}
                        <Badge variant={access.is_active ? 'default' : 'secondary'}>
                          {access.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {(!accessControl || accessControl.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No access control records available
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDLPEvents, usePersonalDataInventory } from "@/hooks/useEnterpriseData";
import { Shield, Database, AlertTriangle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DLPPrivacyDashboard() {
  const { data: dlpEvents, isLoading: dlpLoading } = useDLPEvents();
  const { data: dataInventory, isLoading: inventoryLoading } = usePersonalDataInventory();

  const blockedEvents = dlpEvents?.filter(e => e.blocked).length || 0;
  const criticalEvents = dlpEvents?.filter(e => e.classification === 'confidential' || e.classification === 'restricted').length || 0;
  
  const encryptedData = dataInventory?.filter(d => d.encryption_status).length || 0;
  const consentObtained = dataInventory?.filter(d => d.consent_obtained).length || 0;

  const getClassificationColor = (classification: string) => {
    switch (classification.toLowerCase()) {
      case 'confidential':
      case 'restricted':
        return 'destructive';
      case 'internal':
        return 'secondary';
      case 'public':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (dlpLoading || inventoryLoading) {
    return <div className="text-muted-foreground">Loading DLP & privacy data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Data Loss Prevention & Privacy</h2>
        <p className="text-muted-foreground">Data protection compliance and personal data management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DLP Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dlpEvents?.length || 0}</div>
            <p className="text-xs text-muted-foreground">{blockedEvents} blocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalEvents}</div>
            <p className="text-xs text-muted-foreground">Confidential/Restricted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Categories</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataInventory?.length || 0}</div>
            <p className="text-xs text-muted-foreground">{encryptedData} encrypted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consent Obtained</CardTitle>
            <Lock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{consentObtained}</div>
            <p className="text-xs text-muted-foreground">
              {dataInventory?.length ? ((consentObtained / dataInventory.length) * 100).toFixed(1) : 0}% compliance
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dlp" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dlp">DLP Events</TabsTrigger>
          <TabsTrigger value="inventory">Personal Data Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="dlp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent DLP Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dlpEvents?.slice(0, 20).map((event) => (
                  <div key={event.id} className={`flex items-center justify-between p-4 border rounded-lg ${event.blocked ? 'border-destructive bg-destructive/5' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Shield className={`h-5 w-5 ${event.blocked ? 'text-destructive' : 'text-yellow-500'}`} />
                        <div>
                          <div className="font-medium">{event.data_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.source_location} → {event.destination_location || 'N/A'}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Policy: {event.policy_violated} | Action: {event.action_taken}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.event_time).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getClassificationColor(event.classification)}>
                        {event.classification}
                      </Badge>
                      {event.blocked && (
                        <Badge variant="destructive">Blocked</Badge>
                      )}
                    </div>
                  </div>
                ))}
                {(!dlpEvents || dlpEvents.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No DLP events recorded
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Data Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dataInventory?.map((data) => (
                  <div key={data.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-medium">{data.data_category}</div>
                        <div className="text-sm text-muted-foreground">
                          Location: {data.data_location} | Owner: {data.data_owner}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {data.encryption_status && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Encrypted
                          </Badge>
                        )}
                        {data.consent_obtained && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                            Consent
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Purpose</div>
                        <div>{data.purpose}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Legal Basis</div>
                        <div>{data.legal_basis}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div>
                        <div className="text-xs text-muted-foreground">Retention Period</div>
                        <div>{data.retention_period}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Last Reviewed</div>
                        <div>{data.last_reviewed ? new Date(data.last_reviewed).toLocaleDateString() : 'Never'}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {(!dataInventory || dataInventory.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No personal data inventory available
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

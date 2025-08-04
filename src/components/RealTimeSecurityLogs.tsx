import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, AlertTriangle, Info, AlertCircle, Activity, Plus } from 'lucide-react';
import { useSecurityLogs, useCreateSecurityLog } from '../hooks/useSupabaseData';
import { useAuth } from '../hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export function RealTimeSecurityLogs() {
  const { data: logs, isLoading, error } = useSecurityLogs();
  const createLog = useCreateSecurityLog();
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [newLog, setNewLog] = useState({
    event_type: 'security_alert',
    severity: 'info',
    source: '',
    target: '',
    description: '',
    sector: profile?.sector || 'government'
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateLog = async () => {
    if (!newLog.source.trim() || !newLog.description.trim()) {
      toast({
        title: "Error",
        description: "Source and description are required",
        variant: "destructive"
      });
      return;
    }

    try {
      await createLog.mutateAsync(newLog);
      
      setNewLog({
        event_type: 'security_alert',
        severity: 'info',
        source: '',
        target: '',
        description: '',
        sector: profile?.sector || 'government'
      });
      setIsCreateOpen(false);
      
      toast({
        title: "Success",
        description: "Security log created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create security log",
        variant: "destructive"
      });
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'security_alert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'malware_detected': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'unauthorized_access': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'data_breach': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'system_anomaly': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Security Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading security logs...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Security Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            Failed to load security logs
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Security Logs
            <Badge variant="secondary">{logs?.length || 0}</Badge>
          </CardTitle>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Log
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Security Log</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium mb-1">
                    Event Type
                  </label>
                  <Select
                    value={newLog.event_type}
                    onValueChange={(value) => setNewLog({ ...newLog, event_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security_alert">Security Alert</SelectItem>
                      <SelectItem value="malware_detected">Malware Detected</SelectItem>
                      <SelectItem value="unauthorized_access">Unauthorized Access</SelectItem>
                      <SelectItem value="data_breach">Data Breach</SelectItem>
                      <SelectItem value="system_anomaly">System Anomaly</SelectItem>
                      <SelectItem value="login_attempt">Login Attempt</SelectItem>
                      <SelectItem value="configuration_change">Configuration Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium mb-1">
                    Severity
                  </label>
                  <Select
                    value={newLog.severity}
                    onValueChange={(value) => setNewLog({ ...newLog, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="source" className="block text-sm font-medium mb-1">
                    Source *
                  </label>
                  <Input
                    id="source"
                    value={newLog.source}
                    onChange={(e) => setNewLog({ ...newLog, source: e.target.value })}
                    placeholder="e.g., firewall, server, workstation"
                  />
                </div>
                
                <div>
                  <label htmlFor="target" className="block text-sm font-medium mb-1">
                    Target
                  </label>
                  <Input
                    id="target"
                    value={newLog.target}
                    onChange={(e) => setNewLog({ ...newLog, target: e.target.value })}
                    placeholder="Target system or IP address"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    value={newLog.description}
                    onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                    placeholder="Detailed description of the security event"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateLog}
                    disabled={createLog.isPending}
                  >
                    {createLog.isPending ? 'Creating...' : 'Create Log'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!logs || logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4" />
            <p>No security logs available</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(log.severity)}
                      <span className="font-medium text-sm">{log.description}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getSeverityColor(log.severity)} variant="secondary">
                        {log.severity}
                      </Badge>
                      <Badge className={getEventTypeColor(log.event_type)} variant="secondary">
                        {log.event_type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Source: {log.source}</span>
                      {log.target && <span>Target: {log.target}</span>}
                    </div>
                    <div className="flex justify-between">
                      <span>Sector: {log.sector}</span>
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
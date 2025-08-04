import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, AlertCircle, Plus, Clock } from 'lucide-react';
import { useIncidents, useCreateIncident, useUpdateIncident } from '../hooks/useSupabaseData';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

export function RealTimeIncidents() {
  const { data: incidents, isLoading, error } = useIncidents();
  const createIncident = useCreateIncident();
  const updateIncident = useUpdateIncident();
  const { profile } = useAuth();
  const { toast } = useToast();
  
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'medium',
    sector: profile?.sector || 'government'
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateIncident = async () => {
    if (!newIncident.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await createIncident.mutateAsync({
        ...newIncident,
        status: 'open',
        reported_by: profile?.user_id
      });
      
      setNewIncident({
        title: '',
        description: '',
        severity: 'medium',
        sector: profile?.sector || 'government'
      });
      setIsCreateOpen(false);
      
      toast({
        title: "Success",
        description: "Incident created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create incident",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateIncident.mutateAsync({ id, status });
      toast({
        title: "Success",
        description: "Incident status updated"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update incident",
        variant: "destructive"
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500 text-white';
      case 'investigating': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Real-Time Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading incidents...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Real-Time Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            Failed to load incidents
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
            <AlertTriangle className="h-5 w-5" />
            Real-Time Incidents
            <Badge variant="secondary">{incidents?.length || 0}</Badge>
          </CardTitle>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <Input
                    id="title"
                    value={newIncident.title}
                    onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                    placeholder="Brief description of the incident"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newIncident.description}
                    onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                    placeholder="Detailed description of the incident"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium mb-1">
                    Severity
                  </label>
                  <Select
                    value={newIncident.severity}
                    onValueChange={(value) => setNewIncident({ ...newIncident, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateIncident}
                    disabled={createIncident.isPending}
                  >
                    {createIncident.isPending ? 'Creating...' : 'Create Incident'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!incidents || incidents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <p>No incidents reported</p>
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{incident.title}</h4>
                  <div className="flex gap-2">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
                
                {incident.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(incident.created_at).toLocaleString()}
                  </div>
                  <div className="text-xs">
                    Sector: {incident.sector}
                  </div>
                </div>
                
                {incident.status === 'open' && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(incident.id, 'investigating')}
                      disabled={updateIncident.isPending}
                    >
                      Start Investigation
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(incident.id, 'resolved')}
                      disabled={updateIncident.isPending}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
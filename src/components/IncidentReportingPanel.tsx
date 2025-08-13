import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertTriangle, FileText, Users, Shield } from "lucide-react";

const IncidentReportingPanel = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: '',
    type: '',
    affectedSystems: ''
  });

  const handleSubmitIncident = async () => {
    setIsReporting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsReporting(false);
    setNewIncident({
      title: '',
      description: '',
      severity: '',
      type: '',
      affectedSystems: ''
    });
  };

  const incidentTypes = [
    { value: 'data_breach', label: 'Data Breach', icon: Shield },
    { value: 'malware', label: 'Malware Detection', icon: AlertTriangle },
    { value: 'phishing', label: 'Phishing Attack', icon: FileText },
    { value: 'unauthorized_access', label: 'Unauthorized Access', icon: Users }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Report Panel */}
      <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Report New Incident
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="incident-title">Incident Title</Label>
            <Input
              id="incident-title"
              placeholder="Brief description of the incident"
              value={newIncident.title}
              onChange={(e) => setNewIncident(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Incident Type</Label>
              <Select value={newIncident.type} onValueChange={(value) => setNewIncident(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Severity Level</Label>
              <Select value={newIncident.severity} onValueChange={(value) => setNewIncident(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <Badge variant="secondary" className={level.color}>
                        {level.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incident-description">Description</Label>
            <Textarea
              id="incident-description"
              placeholder="Detailed description of the incident..."
              value={newIncident.description}
              onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affected-systems">Affected Systems</Label>
            <Input
              id="affected-systems"
              placeholder="List affected systems, networks, or applications"
              value={newIncident.affectedSystems}
              onChange={(e) => setNewIncident(prev => ({ ...prev, affectedSystems: e.target.value }))}
            />
          </div>

          <Button 
            onClick={handleSubmitIncident}
            disabled={isReporting || !newIncident.title || !newIncident.type}
            className="w-full"
          >
            {isReporting ? 'Submitting...' : 'Submit Incident Report'}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span className="text-sm">Emergency Response</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="text-sm">Security Advisory</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6 text-green-500" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6 text-purple-500" />
              <span className="text-sm">Notify Team</span>
            </Button>
          </div>

          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              For critical incidents, contact the emergency response team immediately at ext. 911
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentReportingPanel;
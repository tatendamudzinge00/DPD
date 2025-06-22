
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function IncidentTracker() {
  const incidents = [
    {
      id: 'INC-2024-001',
      title: 'Government Email Compromise',
      sector: 'Government',
      severity: 'critical',
      status: 'investigating',
      assigned: 'Cyber Response Team Alpha',
      progress: 65,
      timeElapsed: '4h 23m',
      estimatedResolution: '2h 15m'
    },
    {
      id: 'INC-2024-002',
      title: 'Banking System Anomaly',
      sector: 'Banking',
      severity: 'high',
      status: 'contained',
      assigned: 'Financial Sector CERT',
      progress: 90,
      timeElapsed: '1h 45m',
      estimatedResolution: '30m'
    },
    {
      id: 'INC-2024-003',
      title: 'Telecom Infrastructure DDoS',
      sector: 'Telecoms',
      severity: 'medium',
      status: 'resolved',
      assigned: 'Network Security Team',
      progress: 100,
      timeElapsed: '6h 12m',
      estimatedResolution: 'Completed'
    },
    {
      id: 'INC-2024-004',
      title: 'Hospital Database Breach Attempt',
      sector: 'Health',
      severity: 'high',
      status: 'monitoring',
      assigned: 'Healthcare CERT',
      progress: 45,
      timeElapsed: '2h 8m',
      estimatedResolution: '4h 30m'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'bg-amber-600';
      case 'contained': return 'bg-blue-600';
      case 'resolved': return 'bg-green-600';
      case 'monitoring': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating': return <AlertTriangle className="h-4 w-4" />;
      case 'contained': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'monitoring': return <Users className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'default';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Incident Tracker</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              New Incident
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              Export Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{incident.id}</span>
                    <Badge variant={getSeverityVariant(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-slate-300 border-slate-500">
                      {incident.sector}
                    </Badge>
                  </div>
                  <h4 className="text-white font-medium">{incident.title}</h4>
                </div>
                
                <div className={`flex items-center space-x-1 px-2 py-1 rounded text-white text-sm ${getStatusColor(incident.status)}`}>
                  {getStatusIcon(incident.status)}
                  <span className="capitalize">{incident.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-slate-400 text-sm">Assigned To:</span>
                  <p className="text-white text-sm font-medium">{incident.assigned}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Time Elapsed:</span>
                  <p className="text-white text-sm font-medium">{incident.timeElapsed}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Est. Resolution:</span>
                  <p className="text-white text-sm font-medium">{incident.estimatedResolution}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Resolution Progress</span>
                  <span className="text-white font-medium">{incident.progress}%</span>
                </div>
                <Progress value={incident.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4 text-center">
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-sm text-slate-300">Critical</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-400">2</div>
            <div className="text-sm text-slate-300">High</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-sm text-slate-300">Medium</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">1</div>
            <div className="text-sm text-slate-300">Resolved</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

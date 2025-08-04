
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RealTimeIncidents } from "./RealTimeIncidents";
import { RealTimeSecurityLogs } from "./RealTimeSecurityLogs";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Brain,
  Download,
  Calendar
} from "lucide-react";

interface SectorLeadDashboardProps {
  sector: string;
}

export function SectorLeadDashboard({ sector = 'Government' }: SectorLeadDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const sectorData = {
    Government: {
      threatLevel: 'critical',
      activeThreats: 23,
      protectionScore: 89,
      responseTime: '24 min',
      incidentCount: 8,
      targetScore: 95,
      complianceScore: 92
    },
    Banking: {
      threatLevel: 'high',
      activeThreats: 18,
      protectionScore: 95,
      responseTime: '18 min',
      incidentCount: 3,
      targetScore: 98,
      complianceScore: 97
    }
  };

  const currentData = sectorData[sector as keyof typeof sectorData] || sectorData.Government;

  const recommendations = [
    {
      priority: 'high',
      title: 'Enforce Multi-Factor Authentication',
      description: 'Deploy MFA across all critical government systems within 7 days',
      impact: 'Reduces credential-based attacks by 85%',
      effort: 'Medium'
    },
    {
      priority: 'medium',
      title: 'Patch Critical Servers',
      description: 'Update 12 servers with critical security patches',
      impact: 'Closes 8 high-severity vulnerabilities',
      effort: 'High'
    },
    {
      priority: 'low',
      title: 'Security Awareness Training',
      description: 'Conduct phishing simulation for all staff',
      impact: 'Improves detection rates by 40%',
      effort: 'Low'
    }
  ];

  const escalations = [
    {
      id: 'ESC-2025-001',
      incident: 'Government Email Compromise',
      analyst: 'John Mukamuri',
      severity: 'critical',
      escalatedTime: '2h ago',
      requestedAction: 'Isolate affected email servers',
      status: 'pending'
    },
    {
      id: 'ESC-2025-002',
      incident: 'Suspicious Network Activity',
      analyst: 'Sarah Chikwanha',
      severity: 'high',
      escalatedTime: '4h ago',
      requestedAction: 'Deploy additional monitoring',
      status: 'approved'
    }
  ];

  const complianceItems = [
    { framework: 'ISO 27001', score: 94, status: 'compliant' },
    { framework: 'Government IT Policy', score: 89, status: 'minor-gaps' },
    { framework: 'Data Protection Act', score: 96, status: 'compliant' },
    { framework: 'Cyber Security Framework', score: 92, status: 'compliant' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-amber-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400';
      case 'minor-gaps': return 'text-yellow-400';
      case 'major-gaps': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{sector} Sector Lead Dashboard</h2>
          <p className="text-slate-300">Strategic overview and decision support for {sector.toLowerCase()} sector</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-red-600 text-white border-0">
            {currentData.threatLevel.toUpperCase()} THREAT LEVEL
          </Badge>
          <div className="text-xs text-slate-400">
            Last Updated: 2025-06-23 10:15:00
          </div>
        </div>
      </div>

      {/* Sector Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-slate-300">Active Threats</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{currentData.activeThreats}</div>
            <div className="flex items-center space-x-1 text-sm text-slate-400 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+15% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-slate-300">Protection Score</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{currentData.protectionScore}%</div>
            <div className="text-sm text-slate-400 mt-1">
              Target: {currentData.targetScore}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">Recent Incidents</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{currentData.incidentCount}</div>
            <div className="text-sm text-slate-400 mt-1">
              Avg response: {currentData.responseTime}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-slate-300">Compliance Score</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{currentData.complianceScore}%</div>
            <div className="text-sm text-slate-400 mt-1">
              All frameworks
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI-Driven Recommendations */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI-Driven Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(rec.priority)}`} />
                      <span className="text-white font-medium">{rec.title}</span>
                    </div>
                    <Badge variant="outline" className="text-slate-300 border-slate-500">
                      {rec.effort} effort
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{rec.description}</p>
                  <p className="text-slate-400 text-xs">{rec.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Escalations */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Pending Escalations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {escalations.map((esc) => (
                <div key={esc.id} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-medium">{esc.incident}</div>
                      <div className="text-slate-400 text-sm">{esc.id} • Escalated {esc.escalatedTime}</div>
                    </div>
                    <Badge variant={esc.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {esc.severity}
                    </Badge>
                  </div>
                  <div className="text-slate-300 text-sm mb-3">
                    <strong>Requested:</strong> {esc.requestedAction}
                  </div>
                  <div className="text-slate-400 text-sm mb-3">
                    Analyst: {esc.analyst}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-green-600 text-green-300">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-300">
                      Reject
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      Request Info
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Tracker */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Compliance Tracker</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{item.framework}</span>
                    <span className={`font-semibold ${getComplianceColor(item.status)}`}>
                      {item.score}%
                    </span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <div className="text-xs text-slate-400">
                    Status: {item.status.replace('-', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Generation */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Report Generation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="border-slate-600 text-slate-300 justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Sector Brief (PDF)
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Compliance Report
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Weekly Report
                </Button>
              </div>
              <div className="p-3 bg-slate-700 rounded-lg">
                <div className="text-white text-sm font-medium mb-1">Scheduled Reports</div>
                <div className="text-slate-400 text-xs">
                  Weekly executive summary: Enabled
                </div>
                <div className="text-slate-400 text-xs">
                  Monthly board report: Next on 2025-07-01
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RealTimeIncidents />
        <RealTimeSecurityLogs />
      </div>
    </div>
  );
}

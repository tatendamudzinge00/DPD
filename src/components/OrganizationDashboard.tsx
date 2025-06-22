
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Shield, Users, Activity, TrendingUp, Building2, Clock, FileText, ArrowLeft } from "lucide-react";

interface OrganizationDashboardProps {
  organizationName: string;
  sector: string;
  onBack: () => void;
}

export function OrganizationDashboard({ organizationName, sector, onBack }: OrganizationDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  // Mock data for organization-specific dashboard
  const orgData = {
    threatLevel: 'high',
    activeThreats: 12,
    threatChange: '+15%',
    protectionScore: 87,
    totalAssets: 45,
    criticalAssets: 12,
    recentIncidents: 3,
    lastUpdated: '2025-06-22 14:30:00',
    
    securityMetrics: [
      { label: 'Email Security', value: 92, status: 'good' },
      { label: 'Network Protection', value: 78, status: 'medium' },
      { label: 'Data Encryption', value: 95, status: 'good' },
      { label: 'Endpoint Protection', value: 84, status: 'medium' },
      { label: 'Access Control', value: 91, status: 'good' },
      { label: 'Patch Compliance', value: 73, status: 'poor' }
    ],

    topThreats: [
      { name: 'Phishing & Social Engineering', count: 8, trend: 'up' },
      { name: 'Advanced Persistent Threats', count: 6, trend: 'stable' },
      { name: 'Ransomware', count: 4, trend: 'down' },
      { name: 'Insider Threats', count: 3, trend: 'up' },
      { name: 'State-sponsored Attacks', count: 2, trend: 'stable' }
    ],

    assets: [
      { name: 'Mail Server 01', type: 'Server', ip: '192.168.1.10', riskScore: 85, patchStatus: 'Critical', owner: 'IT Department' },
      { name: 'Web Application', type: 'Application', ip: '10.0.1.5', riskScore: 72, patchStatus: 'Updated', owner: 'Dev Team' },
      { name: 'Database Cluster', type: 'Database', ip: '172.16.1.20', riskScore: 91, patchStatus: 'Pending', owner: 'DBA Team' },
      { name: 'Firewall Gateway', type: 'Network', ip: '203.45.67.1', riskScore: 45, patchStatus: 'Updated', owner: 'Security Team' }
    ],

    incidents: [
      { id: 'INC-2025-001', severity: 'High', status: 'Investigating', asset: 'Mail Server 01', timestamp: '2025-06-22 12:15', team: 'SOC Team' },
      { id: 'INC-2025-002', severity: 'Medium', status: 'Mitigated', asset: 'Web Application', timestamp: '2025-06-21 18:30', team: 'Dev Team' },
      { id: 'INC-2025-003', severity: 'Critical', status: 'Resolved', asset: 'Database Cluster', timestamp: '2025-06-20 09:45', team: 'DBA Team' }
    ],

    aiInsights: [
      'Prioritize patching Mail Server 01 - high risk exposure detected',
      'Implement MFA for database access - multiple failed login attempts',
      'Review email security policies - increased phishing attempts detected'
    ]
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-amber-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-amber-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPatchStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20';
      case 'updated': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack} className="text-slate-300 border-slate-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {sector}
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-white">{organizationName}</h2>
            <p className="text-slate-300">{sector} Sector Organization</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={`${getThreatLevelColor(orgData.threatLevel)} text-white border-0`}>
            {orgData.threatLevel.toUpperCase()} THREAT LEVEL
          </Badge>
          <div className="text-xs text-slate-400">
            Last Updated: {orgData.lastUpdated}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-slate-300">Active Threats</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{orgData.activeThreats}</div>
            <div className="flex items-center space-x-1 text-sm text-slate-400 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>{orgData.threatChange} from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-slate-300">Protection Score</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{orgData.protectionScore}%</div>
            <Progress value={orgData.protectionScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Building2 className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">Total Assets</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{orgData.totalAssets}</div>
            <div className="text-sm text-slate-400 mt-1">
              {orgData.criticalAssets} critical assets
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-amber-400" />
              <span className="text-slate-300">Recent Incidents</span>
            </div>
            <div className="text-3xl font-bold text-amber-400">{orgData.recentIncidents}</div>
            <div className="text-sm text-slate-400 mt-1">Last 7 days</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Metrics */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Security Metrics Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orgData.securityMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{metric.label}</span>
                  <span className={`font-semibold ${getMetricColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Threat Vectors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Top Threat Vectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orgData.topThreats.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-slate-300">{threat.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">{threat.count}</span>
                    <Badge variant={threat.trend === 'up' ? 'destructive' : threat.trend === 'down' ? 'default' : 'secondary'} className="text-xs">
                      {threat.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Inventory */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Asset Inventory Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Asset Name</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">IP/Location</TableHead>
                  <TableHead className="text-slate-300">Risk Score</TableHead>
                  <TableHead className="text-slate-300">Patch Status</TableHead>
                  <TableHead className="text-slate-300">Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orgData.assets.map((asset, index) => (
                  <TableRow key={index} className="border-slate-700">
                    <TableCell className="text-white font-medium">{asset.name}</TableCell>
                    <TableCell className="text-slate-300">{asset.type}</TableCell>
                    <TableCell className="text-slate-300">{asset.ip}</TableCell>
                    <TableCell className="text-white">{asset.riskScore}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPatchStatusColor(asset.patchStatus)}>
                        {asset.patchStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{asset.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Incident Management */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Incident Management</span>
              <Button size="sm" variant="outline" className="text-slate-300 border-slate-600">
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orgData.incidents.map((incident, index) => (
                <div key={index} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{incident.id}</span>
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-300 space-y-1">
                    <div>Asset: {incident.asset}</div>
                    <div className="flex items-center justify-between">
                      <span>Team: {incident.team}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{incident.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI-Driven Insights */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">AI-Driven Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orgData.aiInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-700/50">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

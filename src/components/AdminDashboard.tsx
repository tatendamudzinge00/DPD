
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Users, 
  Settings, 
  Database, 
  Activity, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Mail,
  Server
} from "lucide-react";

export function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  const systemMetrics = [
    { name: 'API Response Time', value: 245, unit: 'ms', status: 'good' },
    { name: 'Data Feed Latency', value: 1.2, unit: 's', status: 'good' },
    { name: 'Dashboard Uptime', value: 99.9, unit: '%', status: 'good' },
    { name: 'SIEM Integration', value: 98.5, unit: '%', status: 'medium' }
  ];

  const users = [
    { id: 1, name: 'John Mukamuri', role: 'Analyst', sector: 'Government', status: 'active', lastLogin: '2025-06-23 09:15' },
    { id: 2, name: 'Sarah Chikwanha', role: 'Sector Lead', sector: 'Banking', status: 'active', lastLogin: '2025-06-23 08:30' },
    { id: 3, name: 'David Moyo', role: 'Analyst', sector: 'Health', status: 'inactive', lastLogin: '2025-06-20 16:45' },
    { id: 4, name: 'Grace Ndlovu', role: 'Admin', sector: 'All', status: 'active', lastLogin: '2025-06-23 10:00' }
  ];

  const dataFeeds = [
    { name: 'ZIMCERT Threat Feed', status: 'operational', lastSync: '2025-06-23 10:15', errors: 0 },
    { name: 'SIEM Connector', status: 'operational', lastSync: '2025-06-23 10:14', errors: 0 },
    { name: 'MISP Integration', status: 'warning', lastSync: '2025-06-23 09:45', errors: 3 },
    { name: 'Government SOC Feed', status: 'operational', lastSync: '2025-06-23 10:12', errors: 0 },
    { name: 'Banking CERT Feed', status: 'error', lastSync: '2025-06-23 08:30', errors: 15 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
          <p className="text-slate-300">System overview and management console</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-300 border-green-600">
            System Operational
          </Badge>
          <div className="text-xs text-slate-400">
            Last Updated: 2025-06-23 10:15:00
          </div>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300 text-sm">{metric.name}</span>
              </div>
              <div className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                {metric.value} {metric.unit}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {metric.status === 'good' ? 'Optimal' : metric.status === 'medium' ? 'Acceptable' : 'Needs Attention'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Role Management */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Add User
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  View Audit Logs
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-300">Name</TableHead>
                    <TableHead className="text-slate-300">Role</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="text-white">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-slate-300 border-slate-500">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Data Feed Health */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Feed Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataFeeds.map((feed, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(feed.status)}
                    <div>
                      <div className="text-white font-medium text-sm">{feed.name}</div>
                      <div className="text-slate-400 text-xs">Last sync: {feed.lastSync}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-300 text-sm">{feed.errors} errors</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Configuration */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Sector Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                {['Government', 'Banking', 'Health', 'Education'].map((sector) => (
                  <div key={sector} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <span className="text-white">{sector} Sector</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300">
                Configure Alert Thresholds
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Global Reports */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Global Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <div className="p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-white text-sm">Scheduled Reports</span>
                </div>
                <div className="text-slate-400 text-xs">
                  Weekly executive summary: Enabled
                </div>
                <div className="text-slate-400 text-xs">
                  Monthly compliance report: Enabled
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>System Settings & Maintenance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-white font-medium">Feature Toggles</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">AI Insights</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">Auto Alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">Geo Mapping</span>
                  <Switch />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">Localization</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">English</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">Shona</span>
                  <Switch />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">Maintenance</h4>
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300">
                Schedule Maintenance
              </Button>
              <div className="text-slate-400 text-xs">
                Next maintenance: 2025-06-30 02:00
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

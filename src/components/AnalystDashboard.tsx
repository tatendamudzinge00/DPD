
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Users, 
  Server,
  Bell,
  Eye,
  UserCheck,
  ArrowUp,
  BarChart3
} from "lucide-react";

export function AnalystDashboard() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const liveAlerts = [
    { 
      id: 'ALT-2025-001', 
      severity: 'critical', 
      sector: 'Government', 
      title: 'Suspicious Email Campaign Detected',
      timestamp: '10:15:23',
      status: 'new'
    },
    { 
      id: 'ALT-2025-002', 
      severity: 'high', 
      sector: 'Banking', 
      title: 'Multiple Failed Login Attempts',
      timestamp: '10:12:45',
      status: 'acknowledged'
    },
    { 
      id: 'ALT-2025-003', 
      severity: 'medium', 
      sector: 'Health', 
      title: 'Unusual Network Traffic Pattern',
      timestamp: '10:08:12',
      status: 'investigating'
    },
    { 
      id: 'ALT-2025-004', 
      severity: 'low', 
      sector: 'Education', 
      title: 'Outdated Security Certificate',
      timestamp: '09:45:33',
      status: 'new'
    }
  ];

  const myIncidents = [
    {
      id: 'INC-2025-001',
      title: 'Government Email Compromise',
      severity: 'critical',
      status: 'investigating',
      assigned: 'Me',
      slaHours: 2.5,
      timeElapsed: '4h 23m'
    },
    {
      id: 'INC-2025-003',
      title: 'Hospital Database Access Attempt',
      severity: 'high',
      status: 'investigating',
      assigned: 'Me',
      slaHours: 6,
      timeElapsed: '1h 15m'
    }
  ];

  const assets = [
    { 
      name: 'OPC-SERVER-01', 
      type: 'Server', 
      ip: '192.168.1.10', 
      riskScore: 85, 
      patchStatus: 'critical',
      owner: 'Office of the President',
      lastSeen: '2025-06-23 10:00'
    },
    { 
      name: 'ZIMRA-DB-MAIN', 
      type: 'Database', 
      ip: '10.20.30.40', 
      riskScore: 92, 
      patchStatus: 'up-to-date',
      owner: 'ZIMRA',
      lastSeen: '2025-06-23 10:15'
    },
    { 
      name: 'RBZ-FIREWALL-01', 
      type: 'Firewall', 
      ip: '172.16.1.1', 
      riskScore: 45, 
      patchStatus: 'pending',
      owner: 'Reserve Bank of Zimbabwe',
      lastSeen: '2025-06-23 10:10'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-amber-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-600';
      case 'acknowledged': return 'bg-purple-600';
      case 'investigating': return 'bg-amber-600';
      case 'resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getPatchStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      case 'up-to-date': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analyst Dashboard</h2>
          <p className="text-slate-300">Monitor, investigate, and respond to security events</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-blue-300 border-blue-600">
            <Bell className="h-3 w-3 mr-1" />
            12 Active Alerts
          </Badge>
          <div className="text-xs text-slate-400">
            Last Updated: 2025-06-23 10:15:23
          </div>
        </div>
      </div>

      {/* Live Threat Feed & Alerts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Live Threat Feed</span>
            </CardTitle>
            <div className="flex space-x-2">
              <select 
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select 
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Sectors</option>
                <option value="Government">Government</option>
                <option value="Banking">Banking</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-650 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                  <div>
                    <div className="text-white font-medium">{alert.title}</div>
                    <div className="text-slate-400 text-sm">{alert.id} • {alert.sector} • {alert.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={`${getStatusColor(alert.status)} text-white border-0`}>
                    {alert.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Acknowledge
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Escalate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Active Incidents */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>My Active Incidents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myIncidents.map((incident) => (
                <div key={incident.id} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white font-medium">{incident.title}</div>
                      <div className="text-slate-400 text-sm">{incident.id}</div>
                    </div>
                    <Badge variant="destructive">{incident.severity}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <span className="text-white ml-2 capitalize">{incident.status}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Time Elapsed:</span>
                      <span className="text-white ml-2">{incident.timeElapsed}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-400">SLA Progress</span>
                      <span className="text-white">{incident.slaHours}h remaining</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-amber-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                View All My Incidents
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Asset Lookup */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Asset Lookup</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by asset name, IP, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {assets.map((asset, index) => (
                  <div key={index} className="p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-white font-medium">{asset.name}</div>
                        <div className="text-slate-400 text-sm">{asset.type} • {asset.ip}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">Risk: {asset.riskScore}</div>
                        <div className={`text-sm ${getPatchStatusColor(asset.patchStatus)}`}>
                          {asset.patchStatus}
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs">
                      Owner: {asset.owner} • Last seen: {asset.lastSeen}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                <Eye className="h-4 w-4 mr-2" />
                View Full Asset Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Sector Overview */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Sector Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { sector: 'Government', threats: 23, level: 'critical' },
              { sector: 'Banking', threats: 18, level: 'high' },
              { sector: 'Health', threats: 9, level: 'medium' },
              { sector: 'Education', threats: 6, level: 'low' }
            ].map((item) => (
              <div key={item.sector} className="p-4 bg-slate-700 rounded-lg text-center">
                <div className="text-white font-medium mb-1">{item.sector}</div>
                <div className="text-2xl font-bold text-amber-400 mb-1">{item.threats}</div>
                <div className={`text-sm px-2 py-1 rounded ${getSeverityColor(item.level)} text-white`}>
                  {item.level.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

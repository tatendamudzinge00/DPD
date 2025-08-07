import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, FileText, Users, Database, Clock, CheckCircle, XCircle, Calendar, Eye, Lock, UserCheck, FileCheck, Globe, Scale } from "lucide-react";
import { useIncidents } from '@/hooks/useSupabaseData';

export function DataProtectionDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const { data: incidents = [], isLoading } = useIncidents();

  // Real metrics from incidents data
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(inc => inc.status === 'open').length;
  const criticalIncidents = incidents.filter(inc => inc.severity === 'critical').length;
  const highIncidents = incidents.filter(inc => inc.severity === 'high').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Protection Dashboard</h1>
          <p className="text-slate-400">Comprehensive privacy compliance monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{openIncidents}</div>
            <p className="text-xs text-slate-400">
              {criticalIncidents} critical, {highIncidents} high priority
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">GDPR Compliance</CardTitle>
            <Scale className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">--</div>
            <Progress value={0} className="mt-2" />
            <p className="text-xs text-slate-400 mt-1">No data available</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Data Subject Requests</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-slate-400">
              No requests recorded
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Privacy Training</CardTitle>
            <FileCheck className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">--</div>
            <Progress value={0} className="mt-2" />
            <p className="text-xs text-slate-400 mt-1">No training data available</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-400" />
                  Privacy Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 text-slate-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No risk assessment data available</p>
                  <p className="text-xs mt-2">Configure privacy risk parameters to view assessment</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Inventory */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-400" />
                  Data Inventory Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 text-slate-400">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No data inventory available</p>
                  <p className="text-xs mt-2">Start data mapping to track asset inventory</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Framework Status */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Regulatory Compliance Status</CardTitle>
              <CardDescription className="text-slate-400">
                Current compliance levels across key frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-400">
                <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No compliance framework data available</p>
                <p className="text-xs mt-2">Configure compliance monitoring to track regulatory status</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Privacy Incidents</CardTitle>
              <CardDescription className="text-slate-400">
                Data breaches and privacy violations requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-slate-400">Loading incidents...</div>
              ) : totalIncidents > 0 ? (
                <div className="space-y-3">
                  {incidents.slice(0, 5).map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          incident.severity === 'critical' ? 'bg-red-400' :
                          incident.severity === 'high' ? 'bg-orange-400' :
                          incident.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`} />
                        <div>
                          <p className="text-white font-medium">{incident.title}</p>
                          <p className="text-sm text-slate-400">
                            {incident.sector} • {new Date(incident.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={incident.status === 'open' ? 'destructive' : 'secondary'}>
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No privacy incidents reported</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Privacy Impact Assessments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Customer Analytics Platform</p>
                    <p className="text-sm text-slate-400">High Risk • Due: Dec 15, 2024</p>
                  </div>
                  <Badge variant="destructive">Overdue</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Employee Monitoring System</p>
                    <p className="text-sm text-slate-400">Medium Risk • Due: Jan 30, 2025</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-900 text-yellow-300">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Marketing Automation</p>
                    <p className="text-sm text-slate-400">Low Risk • Due: Feb 15, 2025</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">Scheduled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Audit Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">GDPR Annual Review</p>
                    <p className="text-sm text-slate-400">External Audit • Q1 2025</p>
                  </div>
                  <Badge variant="outline" className="border-blue-400 text-blue-300">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Data Retention Review</p>
                    <p className="text-sm text-slate-400">Internal Audit • Monthly</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Vendor Assessment</p>
                    <p className="text-sm text-slate-400">Risk Assessment • Quarterly</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Data Subject Rights Requests</CardTitle>
              <CardDescription className="text-slate-400">
                GDPR Article 15-22 requests and processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Data Access Request</p>
                      <p className="text-sm text-slate-400">john.doe@example.com • Submitted 3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-900 text-yellow-300">Processing</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-white font-medium">Data Deletion Request</p>
                      <p className="text-sm text-slate-400">sara.smith@example.com • Submitted 1 week ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-900 text-green-300">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Data Portability Request</p>
                      <p className="text-sm text-slate-400">mike.johnson@example.com • Submitted 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-900 text-blue-300">Under Review</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Training Completion Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">GDPR Fundamentals</span>
                      <span className="text-white font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">154/167 employees completed</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Data Breach Response</span>
                      <span className="text-white font-semibold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">130/167 employees completed</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Privacy by Design</span>
                      <span className="text-white font-semibold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">108/167 employees completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Training Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-white font-medium">Advanced GDPR Workshop</p>
                  <p className="text-sm text-slate-400">January 15, 2025 • 2:00 PM</p>
                  <p className="text-xs text-slate-500">For DPOs and senior staff</p>
                </div>
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-white font-medium">Incident Response Training</p>
                  <p className="text-sm text-slate-400">January 22, 2025 • 10:00 AM</p>
                  <p className="text-xs text-slate-500">All departments</p>
                </div>
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-white font-medium">Third-Party Risk Management</p>
                  <p className="text-sm text-slate-400">February 5, 2025 • 3:00 PM</p>
                  <p className="text-xs text-slate-500">Procurement team</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
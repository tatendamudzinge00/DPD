import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, FileText, Shield, Scale, Globe, Users, Database, Lock } from "lucide-react";

export function ComplianceMonitor() {
  const [selectedFramework, setSelectedFramework] = useState<'gdpr' | 'ccpa' | 'iso27001'>('gdpr');

  const complianceFrameworks = {
    gdpr: {
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      overallScore: 0,
      requirements: []
    },
    ccpa: {
      name: 'CCPA',
      fullName: 'California Consumer Privacy Act',
      overallScore: 0,
      requirements: []
    },
    iso27001: {
      name: 'ISO 27001',
      fullName: 'Information Security Management',
      overallScore: 0,
      requirements: []
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'minor-gap':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'major-gap':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-900 text-green-300';
      case 'minor-gap':
        return 'bg-yellow-900 text-yellow-300';
      case 'major-gap':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-900 text-red-300';
      case 'high':
        return 'bg-orange-900 text-orange-300';
      case 'medium':
        return 'bg-yellow-900 text-yellow-300';
      case 'low':
        return 'bg-blue-900 text-blue-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const currentFramework = complianceFrameworks[selectedFramework];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Compliance Monitor</h1>
          <p className="text-slate-400">Real-time regulatory compliance tracking</p>
        </div>
        <Button variant="outline" className="border-slate-600 text-slate-300">
          <FileText className="h-4 w-4 mr-2" />
          Generate Compliance Report
        </Button>
      </div>

      {/* Framework Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(complianceFrameworks).map(([key, framework]) => (
          <Card 
            key={key} 
            className={`bg-slate-800 border-slate-700 cursor-pointer transition-all ${
              selectedFramework === key ? 'ring-2 ring-blue-400' : 'hover:border-slate-600'
            }`}
            onClick={() => setSelectedFramework(key as any)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">{framework.name}</CardTitle>
                <Scale className="h-5 w-5 text-blue-400" />
              </div>
              <CardDescription className="text-slate-400">{framework.fullName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Overall Compliance</span>
                  <span className="text-lg font-bold text-white">{framework.overallScore}%</span>
                </div>
                <Progress value={framework.overallScore} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">No data available</span>
                  <span className="text-slate-400">Configure framework</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Framework View */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white flex items-center">
                <Scale className="h-6 w-6 mr-2 text-blue-400" />
                {currentFramework.fullName} Compliance
              </CardTitle>
              <CardDescription className="text-slate-400">
                Detailed requirement assessment and gap analysis
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{currentFramework.overallScore}%</div>
              <div className="text-sm text-slate-400">Overall Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requirements" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
              <TabsTrigger value="actions">Action Items</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="space-y-4 mt-6">
              <div className="text-center py-12 text-slate-400">
                <Scale className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No compliance requirements configured</p>
                <p className="text-sm">Set up compliance framework to monitor requirements</p>
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="space-y-4 mt-6">
              <div className="text-center py-12 text-slate-400">
                <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No compliance gaps identified</p>
                <p className="text-sm">Configure compliance framework to identify gaps</p>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4 mt-6">
              <div className="text-center py-12 text-slate-400">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No action items available</p>
                <p className="text-sm">Action items will appear after compliance assessment</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
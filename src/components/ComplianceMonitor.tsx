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
      overallScore: 94,
      requirements: [
        { id: 'art6', name: 'Lawful Basis (Article 6)', status: 'compliant', score: 100, priority: 'high' },
        { id: 'art7', name: 'Consent Management (Article 7)', status: 'compliant', score: 98, priority: 'high' },
        { id: 'art12', name: 'Transparent Information (Article 12)', status: 'minor-gap', score: 85, priority: 'medium' },
        { id: 'art15', name: 'Right of Access (Article 15)', status: 'compliant', score: 95, priority: 'high' },
        { id: 'art17', name: 'Right to Erasure (Article 17)', status: 'compliant', score: 92, priority: 'high' },
        { id: 'art20', name: 'Data Portability (Article 20)', status: 'minor-gap', score: 78, priority: 'medium' },
        { id: 'art25', name: 'Privacy by Design (Article 25)', status: 'major-gap', score: 65, priority: 'high' },
        { id: 'art32', name: 'Security Measures (Article 32)', status: 'compliant', score: 96, priority: 'critical' },
        { id: 'art33', name: 'Breach Notification (Article 33)', status: 'compliant', score: 100, priority: 'critical' },
        { id: 'art35', name: 'Data Protection Impact Assessment (Article 35)', status: 'minor-gap', score: 82, priority: 'high' }
      ]
    },
    ccpa: {
      name: 'CCPA',
      fullName: 'California Consumer Privacy Act',
      overallScore: 88,
      requirements: [
        { id: 'notice', name: 'Notice at Collection', status: 'compliant', score: 95, priority: 'high' },
        { id: 'disclosure', name: 'Right to Know', status: 'compliant', score: 90, priority: 'high' },
        { id: 'deletion', name: 'Right to Delete', status: 'minor-gap', score: 85, priority: 'medium' },
        { id: 'optout', name: 'Right to Opt-Out', status: 'major-gap', score: 70, priority: 'high' },
        { id: 'nondiscrimination', name: 'Non-Discrimination', status: 'compliant', score: 92, priority: 'medium' },
        { id: 'authorized', name: 'Authorized Agent', status: 'minor-gap', score: 80, priority: 'low' },
        { id: 'thirdparty', name: 'Third-Party Disclosure', status: 'compliant', score: 88, priority: 'medium' }
      ]
    },
    iso27001: {
      name: 'ISO 27001',
      fullName: 'Information Security Management',
      overallScore: 96,
      requirements: [
        { id: 'a5', name: 'Information Security Policies (A.5)', status: 'compliant', score: 98, priority: 'high' },
        { id: 'a6', name: 'Organization of Information Security (A.6)', status: 'compliant', score: 94, priority: 'medium' },
        { id: 'a8', name: 'Asset Management (A.8)', status: 'compliant', score: 96, priority: 'high' },
        { id: 'a9', name: 'Access Control (A.9)', status: 'minor-gap', score: 88, priority: 'high' },
        { id: 'a10', name: 'Cryptography (A.10)', status: 'compliant', score: 100, priority: 'critical' },
        { id: 'a12', name: 'Operations Security (A.12)', status: 'compliant', score: 92, priority: 'high' },
        { id: 'a16', name: 'Information Security Incident Management (A.16)', status: 'compliant', score: 98, priority: 'critical' },
        { id: 'a18', name: 'Compliance (A.18)', status: 'minor-gap', score: 85, priority: 'medium' }
      ]
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
                  <span className="text-slate-400">
                    {framework.requirements.filter(r => r.status === 'compliant').length}/{framework.requirements.length} compliant
                  </span>
                  <span className="text-slate-400">
                    {framework.requirements.filter(r => r.status === 'major-gap').length} critical gaps
                  </span>
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
              <div className="space-y-3">
                {currentFramework.requirements.map((requirement) => (
                  <div key={requirement.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      {getStatusIcon(requirement.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium">{requirement.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={getPriorityColor(requirement.priority)}>
                              {requirement.priority}
                            </Badge>
                            <span className="text-sm font-semibold text-white">{requirement.score}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className={getStatusColor(requirement.status)}>
                            {requirement.status.replace('-', ' ')}
                          </Badge>
                          <Progress value={requirement.score} className="w-32 h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="space-y-4 mt-6">
              <div className="space-y-4">
                {currentFramework.requirements
                  .filter(r => r.status !== 'compliant')
                  .sort((a, b) => {
                    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
                  })
                  .map((requirement) => (
                    <Card key={requirement.id} className="bg-slate-700 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(requirement.status)}
                              <h4 className="text-white font-medium">{requirement.name}</h4>
                              <Badge variant="secondary" className={getPriorityColor(requirement.priority)}>
                                {requirement.priority} priority
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-sm mb-3">
                              {requirement.status === 'minor-gap' 
                                ? 'Minor compliance gap identified. Review and update required.'
                                : 'Major compliance gap. Immediate action required to meet regulatory requirements.'
                              }
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-slate-400">Current Score:</span>
                                <span className="text-sm font-semibold text-white">{requirement.score}%</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-slate-400">Target:</span>
                                <span className="text-sm font-semibold text-green-400">95%</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                      Immediate Actions Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentFramework.requirements
                      .filter(r => r.status === 'major-gap' || (r.status === 'minor-gap' && r.priority === 'high'))
                      .map((requirement) => (
                        <div key={requirement.id} className="p-3 bg-slate-800 rounded border-l-4 border-red-400">
                          <h5 className="text-white font-medium">{requirement.name}</h5>
                          <p className="text-sm text-slate-400 mt-1">
                            Update implementation to meet compliance requirements
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="bg-red-900 text-red-300 text-xs">
                              Due: Next 30 days
                            </Badge>
                            <span className="text-xs text-slate-400">Score: {requirement.score}%</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="bg-slate-700 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                      Planned Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentFramework.requirements
                      .filter(r => r.status === 'minor-gap' && r.priority !== 'high')
                      .map((requirement) => (
                        <div key={requirement.id} className="p-3 bg-slate-800 rounded border-l-4 border-yellow-400">
                          <h5 className="text-white font-medium">{requirement.name}</h5>
                          <p className="text-sm text-slate-400 mt-1">
                            Scheduled for review and enhancement
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="bg-yellow-900 text-yellow-300 text-xs">
                              Due: Next 90 days
                            </Badge>
                            <span className="text-xs text-slate-400">Score: {requirement.score}%</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
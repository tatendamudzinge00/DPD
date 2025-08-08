import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle, Clock, Loader2, Shield } from "lucide-react";
import { useComplianceChecks } from "../hooks/useSupabaseDataProtection";

export function ComplianceDashboard() {
  const { data: complianceChecks = [], isLoading, error } = useComplianceChecks();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-900/20 border-green-600';
      case 'non_compliant': return 'text-red-400 bg-red-900/20 border-red-600';
      case 'partial': return 'text-yellow-400 bg-yellow-900/20 border-yellow-600';
      case 'not_applicable': return 'text-gray-400 bg-gray-900/20 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />;
      case 'non_compliant': return <XCircle className="h-4 w-4" />;
      case 'partial': return <AlertCircle className="h-4 w-4" />;
      case 'not_applicable': return <Shield className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTimeUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const getFrameworkStats = () => {
    const frameworks: { [key: string]: { compliant: number; total: number; nonCompliant: number } } = {};
    
    complianceChecks.forEach(check => {
      if (!frameworks[check.framework]) {
        frameworks[check.framework] = { compliant: 0, total: 0, nonCompliant: 0 };
      }
      frameworks[check.framework].total++;
      if (check.compliance_status === 'compliant') {
        frameworks[check.framework].compliant++;
      } else if (check.compliance_status === 'non_compliant') {
        frameworks[check.framework].nonCompliant++;
      }
    });

    return Object.entries(frameworks).map(([name, stats]) => ({
      name,
      compliance: Math.round((stats.compliant / stats.total) * 100),
      total: stats.total,
      compliant: stats.compliant,
      nonCompliant: stats.nonCompliant
    }));
  };

  const frameworkStats = getFrameworkStats();

  if (error) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Compliance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load compliance data</p>
            <p className="text-slate-400 text-sm">Check database connection</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Framework Overview */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Compliance Overview</span>
            </div>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {frameworkStats.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No compliance data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {frameworkStats.map((framework) => (
                <div
                  key={framework.name}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600"
                >
                  <h3 className="text-white font-semibold mb-3">{framework.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Compliance Score</span>
                      <span className="text-white font-semibold">{framework.compliance}%</span>
                    </div>
                    <Progress value={framework.compliance} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                    <div className="text-center">
                      <div className="text-green-400 font-semibold">{framework.compliant}</div>
                      <div className="text-slate-400">Compliant</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-semibold">{framework.nonCompliant}</div>
                      <div className="text-slate-400">Non-Compliant</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Compliance Checks */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Compliance Controls</span>
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              {complianceChecks.length} Controls
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            {complianceChecks.length === 0 && !isLoading ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">No compliance checks found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {complianceChecks.map((check) => (
                  <div
                    key={check.id}
                    className={`p-4 rounded-lg border transition-all hover:bg-slate-700/50 cursor-pointer ${getStatusColor(check.compliance_status)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(check.compliance_status)}
                        <span className="font-semibold text-white">{check.control_id}</span>
                        <Badge variant="secondary" className="text-xs">
                          {check.framework}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(check.compliance_status).replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-')}>
                        {check.compliance_status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <h4 className="text-sm text-white font-medium mb-2">{check.control_name}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mb-3">
                      <div>
                        <span className="font-medium">Sector:</span> {check.sector}
                      </div>
                      <div>
                        <span className="font-medium">Responsible:</span> {check.responsible_party}
                      </div>
                      <div>
                        <span className="font-medium">Assessment:</span> {new Date(check.assessment_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{getTimeUntilDue(check.due_date)}</span>
                      </div>
                    </div>
                    
                    {check.findings && (
                      <div className="mb-2">
                        <span className="text-xs font-medium text-slate-300">Findings:</span>
                        <p className="text-xs text-slate-400 mt-1">{check.findings}</p>
                      </div>
                    )}
                    
                    {check.remediation_plan && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <span className="text-xs font-medium text-slate-300">Remediation Plan:</span>
                        <p className="text-xs text-slate-400 mt-1">{check.remediation_plan}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
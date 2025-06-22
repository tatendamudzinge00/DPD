
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, BarChart3, Shield, FileText, Globe, Database, TrendingUp, Brain, File, Settings } from "lucide-react";

export function FeatureRequirements() {
  const features = [
    {
      id: 1,
      icon: Zap,
      title: "Real-Time Threat Feed Engine",
      description: "Pulls from ZIMCERT data lake, SIEM logs (Elastic, Splunk), IDS/IPS logs (Snort, Suricata), Threat intelligence feeds (MISP, CrowdStrike)",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      icon: BarChart3,
      title: "Dynamic Sector Cards",
      description: "Threat Level Indicator, Trend Graphs (7/30 days), Metrics summary, Most affected sub-agency, Response status",
      status: "pending",
      priority: "high"
    },
    {
      id: 3,
      icon: Shield,
      title: "Role-Based Access Control",
      description: "Analyst (metrics only), Supervisor (containment actions), Director (escalation), Ministry CIOs (sector-specific)",
      status: "pending",
      priority: "critical"
    },
    {
      id: 4,
      icon: FileText,
      title: "Incident Management Panel",
      description: "Current/past incidents, Severity coding, Status tracking, Timestamps, PDF export per sector",
      status: "pending",
      priority: "high"
    },
    {
      id: 5,
      icon: Globe,
      title: "Geo-Mapped Threat View",
      description: "Mapbox/Leaflet integration, Threats by province/region, Sector layer toggles, Color-coded regions",
      status: "pending",
      priority: "medium"
    },
    {
      id: 6,
      icon: Database,
      title: "Asset Detail View",
      description: "Asset name/type/IP, Risk score, Patch status, Owner organization, Last seen active",
      status: "pending",
      priority: "medium"
    },
    {
      id: 7,
      icon: TrendingUp,
      title: "Time-Series Graphs",
      description: "Threat evolution (24hr/7d/30d), Incident response times, Protection score trends, Top threat types",
      status: "pending",
      priority: "medium"
    },
    {
      id: 8,
      icon: Brain,
      title: "AI-Powered Alert Prioritization",
      description: "Score threat priority, Recommend actions per sector, Detect patterns (e.g., rising phishing)",
      status: "pending",
      priority: "low"
    },
    {
      id: 9,
      icon: File,
      title: "Printable Sector Reports",
      description: "PDF exports per sector, All metrics/threats/incidents, Timestamped for cabinet review",
      status: "pending",
      priority: "medium"
    },
    {
      id: 10,
      icon: Settings,
      title: "Future Scalability Hooks",
      description: "New sectors (Judiciary, Agriculture, NGOs), Mobile view for ZRP/CERT, Citizen report portal",
      status: "pending",
      priority: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-blue-600';
      case 'pending': return 'bg-amber-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-600';
      case 'high': return 'text-amber-400 border-amber-600';
      case 'medium': return 'text-yellow-400 border-yellow-600';
      case 'low': return 'text-green-400 border-green-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>CyberSOC Development Roadmap</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-4 rounded-lg border border-slate-600 bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-blue-400" />
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getPriorityColor(feature.priority)}>
                      {feature.priority.toUpperCase()}
                    </Badge>
                    <div className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(feature.status)}`}>
                      {feature.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-6 grid grid-cols-4 gap-4 text-center">
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-sm text-slate-300">Critical</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-400">3</div>
            <div className="text-sm text-slate-300">High</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">4</div>
            <div className="text-sm text-slate-300">Medium</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">2</div>
            <div className="text-sm text-slate-300">Low</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

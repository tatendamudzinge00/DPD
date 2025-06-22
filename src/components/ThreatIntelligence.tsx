
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Activity, Clock } from "lucide-react";

export function ThreatIntelligence() {
  const threats = [
    {
      id: 1,
      type: 'APT Campaign',
      severity: 'critical',
      target: 'Government Sector',
      description: 'Sophisticated phishing campaign targeting ministry email systems',
      time: '15 min ago',
      source: 'CERT-ZW',
      iocs: ['malicious-domain.zw', '192.168.1.100']
    },
    {
      id: 2,
      type: 'Ransomware',
      severity: 'high',
      target: 'Banking Sector',
      description: 'New ransomware variant detected in banking infrastructure',
      time: '2 hours ago',
      source: 'RBZ Alert',
      iocs: ['trojan.exe', 'encrypt.dll']
    },
    {
      id: 3,
      type: 'DDoS Attack',
      severity: 'medium',
      target: 'Telecoms',
      description: 'Distributed denial of service attack on telecom infrastructure',
      time: '4 hours ago',
      source: 'NetOne SOC',
      iocs: ['botnet-c2.com', '203.45.67.89']
    },
    {
      id: 4,
      type: 'Data Breach',
      severity: 'high',
      target: 'Health Sector',
      description: 'Unauthorized access attempt to patient database systems',
      time: '6 hours ago',
      source: 'Hospital SIEM',
      iocs: ['backdoor.php', 'data-exfil.py']
    },
    {
      id: 5,
      type: 'Malware',
      severity: 'medium',
      target: 'Education',
      description: 'Malware distribution via compromised university websites',
      time: '8 hours ago',
      source: 'UZ IT Dept',
      iocs: ['payload.js', 'dropper.bat']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-600';
      case 'high': return 'text-amber-400 bg-amber-900/20 border-amber-600';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-600';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-600';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Activity className="h-4 w-4" />;
      case 'low':
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Threat Intelligence Feed</span>
          </div>
          <Badge variant="outline" className="text-slate-300 border-slate-600">
            <Activity className="h-3 w-3 mr-1" />
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className={`p-4 rounded-lg border transition-all hover:bg-slate-700/50 cursor-pointer ${getSeverityColor(threat.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(threat.severity)}
                    <span className="font-semibold text-white">{threat.type}</span>
                    <Badge variant="secondary" className="text-xs">
                      {threat.target}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{threat.time}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-3">{threat.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    Source: <span className="text-blue-400">{threat.source}</span>
                  </div>
                  <div className="text-slate-400">
                    IOCs: <span className="text-red-400">{threat.iocs.length}</span>
                  </div>
                </div>
                
                {threat.iocs.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <div className="flex flex-wrap gap-1">
                      {threat.iocs.slice(0, 2).map((ioc, index) => (
                        <code key={index} className="text-xs bg-slate-900 text-red-300 px-2 py-1 rounded">
                          {ioc}
                        </code>
                      ))}
                      {threat.iocs.length > 2 && (
                        <span className="text-xs text-slate-400">+{threat.iocs.length - 2} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

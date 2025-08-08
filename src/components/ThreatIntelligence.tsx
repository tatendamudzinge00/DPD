
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Activity, Clock, Loader2 } from "lucide-react";
import { useThreatIntelligence } from "../hooks/useSupabaseDataProtection";

export function ThreatIntelligence() {
  const { data: threats = [], isLoading, error } = useThreatIntelligence();

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

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else {
      return `${diffHours} hours ago`;
    }
  };

  if (error) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Threat Intelligence Feed</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load threat intelligence</p>
            <p className="text-slate-400 text-sm">Check API connection</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Threat Intelligence Feed</span>
          </div>
          <div className="flex items-center space-x-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              <Activity className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          {threats.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No threats detected</p>
            </div>
          ) : (
            <div className="space-y-4">
              {threats.map((threat) => (
                <div
                  key={threat.id}
                  className={`p-4 rounded-lg border transition-all hover:bg-slate-700/50 cursor-pointer ${getSeverityColor(threat.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(threat.severity)}
                      <span className="font-semibold text-white">{threat.threat_type}</span>
                      <div className="flex gap-1">
                        {threat.affected_sectors.slice(0, 2).map((sector, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                        {threat.affected_sectors.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{threat.affected_sectors.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{getTimeAgo(threat.created_at)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-3">{threat.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-slate-400">
                      Source: <span className="text-blue-400">{threat.source}</span>
                    </div>
                    <div className="text-slate-400">
                      IOCs: <span className="text-red-400">{threat.indicators_of_compromise?.length || 0}</span>
                    </div>
                  </div>
                  
                  {threat.indicators_of_compromise && threat.indicators_of_compromise.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-600">
                      <div className="flex flex-wrap gap-1">
                        {threat.indicators_of_compromise.slice(0, 2).map((ioc, index) => (
                          <code key={index} className="text-xs bg-slate-900 text-red-300 px-2 py-1 rounded">
                            {ioc}
                          </code>
                        ))}
                        {threat.indicators_of_compromise.length > 2 && (
                          <span className="text-xs text-slate-400">+{threat.indicators_of_compromise.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

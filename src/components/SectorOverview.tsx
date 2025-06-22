
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Zap } from "lucide-react";

export function SectorOverview() {
  const sectors = [
    {
      name: 'Government',
      status: 'critical',
      threats: 23,
      protection: 89,
      trend: 'up',
      assets: 156,
      incidents: 8,
      color: 'bg-red-500'
    },
    {
      name: 'Banking & Finance',
      status: 'high',
      threats: 18,
      protection: 95,
      trend: 'down',
      assets: 89,
      incidents: 3,
      color: 'bg-amber-500'
    },
    {
      name: 'Telecoms & ICT',
      status: 'high',
      threats: 15,
      protection: 92,
      trend: 'up',
      assets: 234,
      incidents: 5,
      color: 'bg-amber-500'
    },
    {
      name: 'Energy',
      status: 'medium',
      threats: 9,
      protection: 88,
      trend: 'down',
      assets: 67,
      incidents: 2,
      color: 'bg-yellow-500'
    },
    {
      name: 'Industrial & Mining',
      status: 'medium',
      threats: 12,
      protection: 85,
      trend: 'up',
      assets: 123,
      incidents: 4,
      color: 'bg-yellow-500'
    },
    {
      name: 'Health Sector',
      status: 'low',
      threats: 6,
      protection: 91,
      trend: 'down',
      assets: 45,
      incidents: 1,
      color: 'bg-green-500'
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">National Cybersecurity Overview</h2>
        <div className="flex space-x-2">
          <Badge variant="destructive">Critical: 2</Badge>
          <Badge variant="secondary">High: 2</Badge>
          <Badge variant="outline">Medium: 2</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <Card key={sector.name} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">{sector.name}</CardTitle>
                <Badge variant={getStatusBadgeVariant(sector.status)} className="text-xs">
                  {sector.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-slate-300">Active Threats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-400">{sector.threats}</span>
                    {sector.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-red-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">Protection</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-green-400">{sector.protection}%</span>
                    <Progress value={sector.protection} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-300">{sector.assets} Assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-sm text-slate-300">{sector.incidents} Incidents</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

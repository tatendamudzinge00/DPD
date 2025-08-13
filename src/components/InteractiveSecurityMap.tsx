import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Activity, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const InteractiveSecurityMap = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'threat' | 'status' | 'incidents'>('threat');

  const sectors = [
    { 
      id: 'banking',
      name: 'Banking & Finance',
      position: { x: 30, y: 40 },
      status: 'secure',
      threats: 2,
      incidents: 0,
      color: 'bg-green-500'
    },
    {
      id: 'government',
      name: 'Government',
      position: { x: 50, y: 20 },
      status: 'warning',
      threats: 5,
      incidents: 1,
      color: 'bg-yellow-500'
    },
    {
      id: 'energy',
      name: 'Energy',
      position: { x: 70, y: 60 },
      status: 'critical',
      threats: 8,
      incidents: 3,
      color: 'bg-red-500'
    },
    {
      id: 'telecoms',
      name: 'Telecommunications',
      position: { x: 20, y: 70 },
      status: 'secure',
      threats: 1,
      incidents: 0,
      color: 'bg-green-500'
    },
    {
      id: 'health',
      name: 'Healthcare',
      position: { x: 80, y: 30 },
      status: 'warning',
      threats: 4,
      incidents: 2,
      color: 'bg-orange-500'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
        return 'bg-green-100 border-green-300';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300';
      case 'critical':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Interactive Map */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Zimbabwe Security Overview
            </CardTitle>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList>
                <TabsTrigger value="threat">Threats</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {/* SVG Map Container */}
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              {/* Map background - simplified Zimbabwe outline */}
              <path
                d="M15,25 L85,25 L85,75 L15,75 Z M20,30 L80,30 L80,70 L20,70 Z"
                fill="currentColor"
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              
              {/* Sector markers */}
              {sectors.map((sector) => (
                <g key={sector.id}>
                  <circle
                    cx={sector.position.x}
                    cy={sector.position.y}
                    r="3"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedSector === sector.id ? 'scale-150' : 'hover:scale-125'
                    }`}
                    fill={
                      viewMode === 'threat' ? (sector.threats > 5 ? '#ef4444' : sector.threats > 2 ? '#f59e0b' : '#10b981') :
                      viewMode === 'status' ? (sector.status === 'critical' ? '#ef4444' : sector.status === 'warning' ? '#f59e0b' : '#10b981') :
                      sector.incidents > 1 ? '#ef4444' : sector.incidents > 0 ? '#f59e0b' : '#10b981'
                    }
                    onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                  />
                  {selectedSector === sector.id && (
                    <text
                      x={sector.position.x}
                      y={sector.position.y - 5}
                      textAnchor="middle"
                      className="text-xs font-medium fill-current"
                      style={{ fontSize: '3px' }}
                    >
                      {sector.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sector Details Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {selectedSector ? sectors.find(s => s.id === selectedSector)?.name : 'Sector Details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSector ? (
            <div className="space-y-4">
              {(() => {
                const sector = sectors.find(s => s.id === selectedSector);
                if (!sector) return null;
                
                return (
                  <>
                    <div className={`p-3 rounded-lg border-2 ${getStatusColor(sector.status)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Status</span>
                        {getStatusIcon(sector.status)}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {sector.status}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Threats</span>
                        <Badge variant={sector.threats > 5 ? 'destructive' : sector.threats > 2 ? 'secondary' : 'default'}>
                          {sector.threats}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Open Incidents</span>
                        <Badge variant={sector.incidents > 1 ? 'destructive' : sector.incidents > 0 ? 'secondary' : 'default'}>
                          {sector.incidents}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Detailed Report
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Generate Alert
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact Sector Lead
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Click on a sector marker to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveSecurityMap;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { useLogs } from "../hooks/useApiData";

export function ThreatMap() {
  const { data: logs = [], isLoading, error } = useLogs();

  // Calculate province threat data from real logs
  const getProvinceData = () => {
    const provinceCounts: { [key: string]: number } = {};
    
    logs.forEach(log => {
      // Extract province from source or metadata if available
      const source = log.source || '';
      let province = 'Unknown';
      
      // Simple mapping based on source patterns
      if (source.includes('Harare') || source.includes('CERT-ZW')) province = 'Harare';
      else if (source.includes('Bulawayo')) province = 'Bulawayo';
      else if (source.includes('Mutare')) province = 'Manicaland';
      else if (source.includes('Gweru')) province = 'Midlands';
      else if (source.includes('Masvingo')) province = 'Masvingo';
      else if (source.includes('Chinhoyi')) province = 'Mashonaland West';
      else if (source.includes('Bindura')) province = 'Mashonaland Central';
      else if (source.includes('Marondera')) province = 'Mashonaland East';
      else if (source.includes('Gwanda')) province = 'Matabeleland South';
      else if (source.includes('Hwange')) province = 'Matabeleland North';
      
      provinceCounts[province] = (provinceCounts[province] || 0) + 1;
    });

    // Define province positions (approximate coordinates for Zimbabwe map)
    const provincePositions: { [key: string]: { x: number; y: number } } = {
      'Harare': { x: 60, y: 35 },
      'Bulawayo': { x: 40, y: 60 },
      'Manicaland': { x: 85, y: 45 },
      'Midlands': { x: 50, y: 50 },
      'Masvingo': { x: 60, y: 70 },
      'Mashonaland West': { x: 45, y: 30 },
      'Mashonaland Central': { x: 55, y: 25 },
      'Mashonaland East': { x: 70, y: 30 },
      'Matabeleland South': { x: 35, y: 75 },
      'Matabeleland North': { x: 25, y: 45 },
    };

    return Object.entries(provinceCounts).map(([name, threats]) => ({
      name,
      threats,
      status: threats > 5 ? 'critical' : threats > 2 ? 'warning' : 'safe',
      x: provincePositions[name]?.x || 50,
      y: provincePositions[name]?.y || 50
    }));
  };

  const provinces = getProvinceData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (error) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Threat Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">Failed to load map data</p>
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
            <MapPin className="h-5 w-5" />
            <span>Threat Map - Zimbabwe</span>
          </div>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Simple Zimbabwe outline representation */}
          <div className="relative w-full h-80 bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
            >
              {/* Zimbabwe outline (simplified) */}
              <path
                d="M15,20 L85,20 L90,30 L85,80 L15,85 L10,40 Z"
                fill="rgba(51, 65, 85, 0.3)"
                stroke="rgba(71, 85, 105, 0.5)"
                strokeWidth="0.5"
              />
              
              {/* Threat markers */}
              {provinces.map((province) => (
                <g key={province.name}>
                  <circle
                    cx={province.x}
                    cy={province.y}
                    r={Math.max(2, Math.min(8, province.threats))}
                    className={`${getStatusColor(province.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                  />
                  <text
                    x={province.x}
                    y={province.y - 10}
                    textAnchor="middle"
                    className="text-xs fill-white font-medium"
                    style={{ fontSize: '3px' }}
                  >
                    {province.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-300">Safe</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-slate-300">Warning</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-slate-300">Critical</span>
              </div>
            </div>
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              {provinces.reduce((sum, p) => sum + p.threats, 0)} Total Threats
            </Badge>
          </div>

          {/* Province list */}
          {provinces.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {provinces.slice(0, 6).map((province) => (
                <div key={province.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{province.name}</span>
                  <Badge variant="outline" className={`text-xs ${
                    province.status === 'critical' ? 'text-red-400 border-red-600' :
                    province.status === 'warning' ? 'text-yellow-400 border-yellow-600' :
                    'text-green-400 border-green-600'
                  }`}>
                    {province.threats}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

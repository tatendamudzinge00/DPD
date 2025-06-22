
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Activity, AlertTriangle } from "lucide-react";

export function ThreatMap() {
  const provinces = [
    { name: 'Harare', threats: 45, status: 'critical', x: 60, y: 35 },
    { name: 'Bulawayo', threats: 23, status: 'high', x: 25, y: 65 },
    { name: 'Manicaland', threats: 12, status: 'medium', x: 85, y: 45 },
    { name: 'Mashonaland Central', threats: 8, status: 'low', x: 55, y: 25 },
    { name: 'Mashonaland East', threats: 15, status: 'medium', x: 70, y: 30 },
    { name: 'Mashonaland West', threats: 18, status: 'medium', x: 45, y: 30 },
    { name: 'Masvingo', threats: 9, status: 'low', x: 60, y: 70 },
    { name: 'Matabeleland North', threats: 11, status: 'low', x: 30, y: 45 },
    { name: 'Matabeleland South', threats: 14, status: 'medium', x: 35, y: 75 },
    { name: 'Midlands', threats: 19, status: 'medium', x: 50, y: 50 }
  ];

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-amber-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPulseSize = (threats: number) => {
    if (threats > 30) return 'w-6 h-6';
    if (threats > 20) return 'w-5 h-5';
    if (threats > 10) return 'w-4 h-4';
    return 'w-3 h-3';
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Threat Distribution Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-slate-900 rounded-lg p-6 h-80">
          {/* Simplified Zimbabwe map outline */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full absolute inset-0 opacity-30"
            preserveAspectRatio="xMidYMid meet"
          >
            <path 
              d="M20,20 L80,20 L85,30 L85,70 L80,80 L20,80 L15,70 L15,30 Z" 
              fill="none" 
              stroke="#475569" 
              strokeWidth="0.5"
            />
          </svg>

          {/* Threat indicators */}
          {provinces.map((province) => (
            <div
              key={province.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${province.x}%`, top: `${province.y}%` }}
              onClick={() => setSelectedProvince(province.name)}
            >
              <div className={`${getPulseSize(province.threats)} ${getStatusColor(province.status)} rounded-full animate-pulse relative`}>
                <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="font-semibold">{province.name}</div>
                <div className="text-slate-300">{province.threats} threats</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend and Stats */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-slate-300">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-300">Low</span>
              </div>
            </div>
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              <Activity className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
          </div>

          {selectedProvince && (
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-white font-semibold mb-2">{selectedProvince} Province</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-300">Active Threats: </span>
                  <span className="text-red-400 font-semibold">
                    {provinces.find(p => p.name === selectedProvince)?.threats}
                  </span>
                </div>
                <div>
                  <span className="text-slate-300">Risk Level: </span>
                  <span className="text-amber-400 font-semibold">
                    {provinces.find(p => p.name === selectedProvince)?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

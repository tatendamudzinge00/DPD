
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Settings, User, FileText } from "lucide-react";

interface DashboardHeaderProps {
  userRole: 'admin' | 'analyst' | 'sector-lead';
  setUserRole: (role: 'admin' | 'analyst' | 'sector-lead') => void;
  onShowEnhancedIncidents?: () => void;
  showEnhancedIncidents?: boolean;
}

export function DashboardHeader({ 
  userRole, 
  setUserRole, 
  onShowEnhancedIncidents,
  showEnhancedIncidents 
}: DashboardHeaderProps) {
  const roleDisplayNames = {
    admin: 'System Administrator',
    analyst: 'Security Analyst',
    'sector-lead': 'Sector Lead'
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold text-white">ZIMCERT Dashboard</h1>
              <p className="text-xs text-slate-400">National Cyber Security Operations</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {onShowEnhancedIncidents && (
            <Button
              variant={showEnhancedIncidents ? "default" : "outline"}
              size="sm"
              onClick={onShowEnhancedIncidents}
              className={showEnhancedIncidents ? "" : "border-slate-600 text-slate-300"}
            >
              <FileText className="h-4 w-4 mr-2" />
              Enhanced Incidents
            </Button>
          )}

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              <User className="h-3 w-3 mr-1" />
              {roleDisplayNames[userRole]}
            </Badge>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant={userRole === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setUserRole('admin')}
              className="text-xs"
            >
              Admin
            </Button>
            <Button
              variant={userRole === 'analyst' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setUserRole('analyst')}
              className="text-xs"
            >
              Analyst
            </Button>
            <Button
              variant={userRole === 'sector-lead' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setUserRole('sector-lead')}
              className="text-xs"
            >
              Sector Lead
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-slate-300">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

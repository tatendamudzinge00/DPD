
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Settings, User, FileText, LogOut } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  onShowEnhancedIncidents?: () => void;
  showEnhancedIncidents?: boolean;
}

export function DashboardHeader({ 
  onShowEnhancedIncidents,
  showEnhancedIncidents 
}: DashboardHeaderProps) {
  const { profile, signOut } = useAuth();
  
  const roleDisplayNames = {
    admin: 'System Administrator',
    analyst: 'Security Analyst',
    'sector-lead': 'Sector Lead'
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold text-white">Data Protection Dashboard</h1>
              <p className="text-xs text-slate-400">Data Privacy & Compliance Operations</p>
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
              Compliance Monitor
            </Button>
          )}

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-slate-300 border-slate-600">
              <User className="h-3 w-3 mr-1" />
              {profile && roleDisplayNames[profile.role]}
            </Badge>
            {profile && (
              <Badge variant="outline" className="text-slate-300 border-slate-600">
                {profile.sector.toUpperCase()}
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-slate-300">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300">
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-300"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

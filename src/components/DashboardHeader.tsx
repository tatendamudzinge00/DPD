import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, FileText, LogOut, User, Clock, Key, Settings } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsDialog } from './SettingsDialog';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  onShowEnhancedIncidents?: () => void;
  showEnhancedIncidents?: boolean;
}

export function DashboardHeader({ 
  onShowEnhancedIncidents,
  showEnhancedIncidents 
}: DashboardHeaderProps) {
  const { profile, session, signOut } = useAuth();
  const navigate = useNavigate();
  
  const roleDisplayNames = {
    admin: 'System Administrator',
    analyst: 'Security Analyst',
    'sector-lead': 'Sector Lead'
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Calculate session info
  const sessionExpiresAt = session?.expires_at 
    ? new Date(session.expires_at * 1000).toLocaleTimeString()
    : null;

  const lastSignIn = session?.user?.last_sign_in_at
    ? new Date(session.user.last_sign_in_at).toLocaleString()
    : null;

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className="text-slate-300 border-slate-600 cursor-pointer hover:bg-slate-700"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="h-3 w-3 mr-1" />
                    {profile && roleDisplayNames[profile.role]}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 border-slate-700">
                  <div className="space-y-1 text-xs">
                    <p className="font-medium">{profile?.full_name || profile?.email}</p>
                    {lastSignIn && (
                      <p className="text-slate-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Last login: {lastSignIn}
                      </p>
                    )}
                    {sessionExpiresAt && (
                      <p className="text-slate-400">
                        <Key className="h-3 w-3 inline mr-1" />
                        Session expires: {sessionExpiresAt}
                      </p>
                    )}
                    <p className="text-cyan-400 mt-1">Click to open profile settings</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {profile && (
              <Badge variant="outline" className="text-slate-300 border-slate-600">
                {profile.sector.toUpperCase()}
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <NotificationsPanel />
            <SettingsDialog />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={() => navigate('/profile')}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
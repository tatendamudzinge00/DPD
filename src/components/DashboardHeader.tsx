
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Shield, Clock } from "lucide-react";

interface DashboardHeaderProps {
  userRole: string;
  setUserRole: (role: 'admin' | 'analyst' | 'sector-lead') => void;
}

export function DashboardHeader({ userRole, setUserRole }: DashboardHeaderProps) {
  const currentTime = new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Harare',
    hour12: false,
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-slate-300 hover:text-white" />
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">System Operational</span>
            </div>
            <Badge variant="destructive" className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>12 Active Threats</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>247 Protected Assets</span>
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-slate-300">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{currentTime} CAT</span>
          </div>
          
          <Select value={userRole} onValueChange={setUserRole}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="admin" className="text-white">Admin</SelectItem>
              <SelectItem value="analyst" className="text-white">Analyst</SelectItem>
              <SelectItem value="sector-lead" className="text-white">Sector Lead</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:text-white">
            Emergency Protocol
          </Button>
        </div>
      </div>
    </header>
  );
}

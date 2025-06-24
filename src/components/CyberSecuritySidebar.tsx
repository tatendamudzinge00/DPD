
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Shield, Building2, Landmark, GraduationCap, Factory, Radio, Heart, Zap, Truck, Tv, Users, Database, Server } from "lucide-react";
import { SectorType } from "@/pages/Index";
import { Badge } from "@/components/ui/badge";

interface CyberSecuritySidebarProps {
  activeSector: SectorType;
  setActiveSector: (sector: SectorType) => void;
  userRole: string;
}

const sectors = [
  { id: 'overview', title: 'National Overview', icon: Shield, threatLevel: 'medium' },
  { id: 'government', title: 'Government', icon: Building2, threatLevel: 'high' },
  { id: 'banking', title: 'Banking & Finance', icon: Landmark, threatLevel: 'high' },
  { id: 'private', title: 'Private Sector', icon: Users, threatLevel: 'medium' },
  { id: 'education', title: 'Education', icon: GraduationCap, threatLevel: 'low' },
  { id: 'industrial', title: 'Industrial & Mining', icon: Factory, threatLevel: 'medium' },
  { id: 'telecoms', title: 'Telecoms & ICT', icon: Radio, threatLevel: 'high' },
  { id: 'health', title: 'Health Sector', icon: Heart, threatLevel: 'medium' },
  { id: 'energy', title: 'Energy', icon: Zap, threatLevel: 'high' },
  { id: 'transport', title: 'Transport', icon: Truck, threatLevel: 'low' },
  { id: 'media', title: 'Media', icon: Tv, threatLevel: 'low' },
  { id: 'zchpc', title: 'Zimbabwe Centre For High Performance Computing (ZCHPC)', icon: Server, threatLevel: 'high' },
];

export function CyberSecuritySidebar({ activeSector, setActiveSector, userRole }: CyberSecuritySidebarProps) {
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-amber-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-900" collapsible="icon">
      <SidebarHeader className="border-b border-slate-800 p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-lg font-bold text-white">Data Protection Dashboard</h1>
            <p className="text-xs text-slate-400">National Cyber Security Operations Center</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 font-semibold mb-4 group-data-[collapsible=icon]:hidden">
            Sector Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sectors.map((sector) => (
                <SidebarMenuItem key={sector.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSector(sector.id as SectorType)}
                    className={`w-full justify-between p-3 rounded-lg transition-all duration-200 ${
                      activeSector === sector.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    tooltip={sector.title}
                  >
                    <div className="flex items-center space-x-3">
                      <sector.icon className="h-5 w-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{sector.title}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(sector.threatLevel)} group-data-[collapsible=icon]:hidden`} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 p-4">
        <div className="text-center group-data-[collapsible=icon]:hidden">
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            Role: {userRole.toUpperCase()}
          </Badge>
          <p className="text-xs text-slate-500 mt-2">Zimbabwe CERT</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

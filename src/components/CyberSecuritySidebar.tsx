
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Shield, Building2, Landmark, GraduationCap, Factory, Radio, Heart, Zap, Truck, Tv, Users, Database, Server, Home, MapPin, LayoutDashboard, BarChart3, Map, AlertTriangle, Settings } from "lucide-react";
import { SectorType } from "@/pages/Index";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';

interface CyberSecuritySidebarProps {
  activeSector: SectorType;
  setActiveSector: (sector: SectorType) => void;
}

const mainNavigation = [
  { id: 'dashboard', title: 'Main Dashboard', icon: Home, path: '/' },
  { id: 'sectors', title: 'Sector Overview', icon: MapPin, path: '/sectors' },
];

const quickAccessItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'enterprise-tip', icon: Shield, label: 'Threat Intel Platform' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'threat-map', icon: Map, label: 'Threat Map' },
  { id: 'incident-reporting', icon: AlertTriangle, label: 'Incident Reporting' },
  { id: 'security-map', icon: Shield, label: 'Security Map' },
  { id: 'security-tools', icon: Settings, label: 'Security Tools' },
];

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

export function CyberSecuritySidebar({ activeSector, setActiveSector }: CyberSecuritySidebarProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-amber-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  // Filter sectors based on user role and sector
  const getVisibleSectors = () => {
    if (!profile) return [];
    
    // Admins see all sectors (National Overview)
    if (profile.role === 'admin') {
      return sectors;
    }
    
    // Sector-specific users only see their sector
    return sectors.filter(sector => sector.id === profile.sector || sector.id === 'overview');
  };

  const visibleSectors = getVisibleSectors();

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
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 font-semibold mb-4 group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className={`w-full justify-start p-3 rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    tooltip={item.title}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Access - Only show on main dashboard */}
        {location.pathname === '/' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-300 font-semibold mb-4 group-data-[collapsible=icon]:hidden">
              Quick Access
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {quickAccessItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSector(item.id as SectorType)}
                      className={`w-full justify-start p-3 rounded-lg transition-all duration-200 ${
                        activeSector === item.id 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                      tooltip={item.label}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Sector Dashboard - Only show on main dashboard with filtered sectors */}
        {location.pathname === '/' && visibleSectors.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-300 font-semibold mb-4 group-data-[collapsible=icon]:hidden">
              {profile?.role === 'admin' ? 'Sectors' : 'My Sector'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {visibleSectors.map((sector) => (
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
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 p-4">
        <div className="text-center group-data-[collapsible=icon]:hidden">
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            Role: {profile?.role.toUpperCase() || 'GUEST'}
          </Badge>
          <p className="text-xs text-slate-500 mt-2">Zimbabwe CERT</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

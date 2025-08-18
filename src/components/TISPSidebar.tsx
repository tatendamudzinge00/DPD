import React from 'react';
import { useState } from 'react';
import { 
  Shield, 
  Database, 
  Share2, 
  Users, 
  Globe, 
  FileSearch, 
  Lock, 
  BookOpen, 
  AlertTriangle, 
  Activity,
  Settings,
  BarChart3,
  Bell,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

interface TISPSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const TISPSidebar: React.FC<TISPSidebarProps> = ({ activeSection, setActiveSection }) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { profile } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  const mainMenuItems = [
    { id: 'dashboard', label: 'TISP Dashboard', icon: Shield, notifications: 0 },
    { id: 'threat-feeds', label: 'Threat Feeds', icon: Database, notifications: 0 },
    { id: 'iocs', label: 'IOCs', icon: FileSearch, notifications: 5 },
    { id: 'shared-intel', label: 'Shared Intel', icon: Share2, notifications: 2 },
    { id: 'incidents', label: 'Incidents & Alerts', icon: AlertTriangle, notifications: 3 },
  ];

  const analysisMenuItems = [
    { id: 'threat-map', label: 'Global Threat Map', icon: Globe, notifications: 0 },
    { id: 'threat-actors', label: 'Threat Actor Profiles', icon: Users, notifications: 1 },
    { id: 'analytics', label: 'Threat Analytics', icon: BarChart3, notifications: 0 },
    { id: 'real-time', label: 'Real-time Activity', icon: Activity, notifications: 0 },
  ];

  const sectorMenuItems = [
    { id: 'government', label: 'Government', icon: Shield, sector: 'government' },
    { id: 'banking', label: 'Banking & Finance', icon: Shield, sector: 'banking' },
    { id: 'energy', label: 'Energy', icon: Zap, sector: 'energy' },
    { id: 'telecoms', label: 'Telecoms & ICT', icon: Shield, sector: 'telecoms' },
    { id: 'health', label: 'Health', icon: Shield, sector: 'health' },
    { id: 'education', label: 'Education', icon: BookOpen, sector: 'education' },
    { id: 'industrial', label: 'Industrial & Mining', icon: Shield, sector: 'industrial' },
    { id: 'transport', label: 'Transport', icon: Shield, sector: 'transport' },
    { id: 'media', label: 'Media', icon: Shield, sector: 'media' },
  ];

  const complianceMenuItems = [
    { id: 'compliance', label: 'Compliance & Privacy', icon: Lock, notifications: 0 },
    { id: 'training', label: 'Training & Awareness', icon: BookOpen, notifications: 0 },
    { id: 'zim-cert', label: 'Zimbabwe CERT', icon: Shield, notifications: 0 },
  ];

  const adminMenuItems = [
    { id: 'admin', label: 'ZCHPC Admin Panel', icon: Settings, notifications: 0 },
  ];

  const getMenuItemClass = (itemId: string) => {
    return activeSection === itemId 
      ? 'bg-primary/20 text-primary border-r-2 border-primary' 
      : 'hover:bg-slate-800/50 text-slate-300 hover:text-white';
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-72'} bg-slate-900 border-r border-slate-800`}>
      <SidebarContent className="bg-slate-900">
        {/* Platform Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-white text-sm">TISP</h2>
                <p className="text-xs text-slate-400">v2.1</p>
              </div>
            )}
          </div>
          {!collapsed && notifications > 0 && (
            <div className="mt-3 flex items-center gap-2 p-2 bg-destructive/20 rounded-lg">
              <Bell className="w-4 h-4 text-destructive" />
              <span className="text-xs text-destructive">{notifications} active alerts</span>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Main Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={getMenuItemClass(item.id)}
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-md transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                          {item.notifications > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {item.notifications}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analysis & Intelligence */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Analysis & Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={getMenuItemClass(item.id)}
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-md transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                          {item.notifications > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {item.notifications}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sectors - Only show if user is admin or has access */}
        {(profile?.role === 'admin' || profile?.role === 'sector-lead') && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              National Sectors
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sectorMenuItems.map((item) => {
                  // Show all sectors for admin, only user's sector for sector-lead
                  if (profile?.role !== 'admin' && profile?.sector !== item.sector) {
                    return null;
                  }
                  
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className={getMenuItemClass(item.id)}
                      >
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className="w-full flex items-center gap-3 p-2 rounded-md transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {!collapsed && (
                            <span className="flex-1 text-left text-sm">{item.label}</span>
                          )}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Compliance & Training */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Compliance & Training
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {complianceMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={getMenuItemClass(item.id)}
                  >
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-md transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                          {item.notifications > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {item.notifications}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Panel - Only for admins */}
        {profile?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      className={getMenuItemClass(item.id)}
                    >
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className="w-full flex items-center gap-3 p-2 rounded-md transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && (
                          <span className="flex-1 text-left text-sm">{item.label}</span>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Info */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {profile?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {profile?.full_name || 'User'}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {profile?.role} • {profile?.sector}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
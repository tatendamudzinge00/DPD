import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Globe, Activity, AlertCircle, Filter } from 'lucide-react';

// Geographic mapping for IP addresses (simplified)
const getCountryFromIP = (ip: string) => {
  // This is a simplified mapping - in production you'd use a GeoIP service
  const ipMappings: Record<string, string> = {
    '192.168.': 'Local Network',
    '10.': 'Internal Network',
    '172.': 'Private Network',
    '8.8.': 'United States',
    '1.1.': 'United States',
    '208.67.': 'United States',
    '185.199.': 'United States',
    '151.101.': 'United States'
  };
  
  for (const [prefix, country] of Object.entries(ipMappings)) {
    if (ip.startsWith(prefix)) {
      return country;
    }
  }
  
  // Default country assignments for demo
  const hash = ip.split('.').reduce((acc, num) => acc + parseInt(num) || 0, 0);
  const countries = ['China', 'Russia', 'United States', 'Germany', 'United Kingdom', 'France', 'Brazil', 'India', 'Japan', 'Canada'];
  return countries[hash % countries.length];
};

const useGeoThreatData = (timeRange: string = '24h') => {
  return useQuery({
    queryKey: ['geo-threat-data', timeRange],
    queryFn: async () => {
      const timeFilter = {
        '1h': new Date(Date.now() - 60 * 60 * 1000),
        '24h': new Date(Date.now() - 24 * 60 * 60 * 1000),
        '7d': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        '30d': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }[timeRange] || new Date(Date.now() - 24 * 60 * 60 * 1000);

      const { data: securityLogs } = await supabase
        .from('security_logs')
        .select('metadata, severity, event_type, created_at, source')
        .gte('created_at', timeFilter.toISOString());

      // Process geographic data
      const geoData = securityLogs?.reduce((acc: Record<string, any>, log) => {
        const metadata = log.metadata as any;
        const src_ip = metadata?.src_ip || '192.168.1.' + Math.floor(Math.random() * 255);
        const country = getCountryFromIP(src_ip);
        if (!acc[country]) {
          acc[country] = {
            country,
            totalEvents: 0,
            severityBreakdown: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
            topEventTypes: {},
            uniqueIPs: new Set()
          };
        }
        
        acc[country].totalEvents++;
        acc[country].severityBreakdown[log.severity as keyof typeof acc[string]['severityBreakdown']]++;
        acc[country].topEventTypes[log.event_type] = (acc[country].topEventTypes[log.event_type] || 0) + 1;
        acc[country].uniqueIPs.add(src_ip);
        
        return acc;
      }, {}) || {};

      // Convert to array and add computed fields
      const geoArray = Object.values(geoData).map((item: any) => ({
        ...item,
        uniqueIPCount: item.uniqueIPs.size,
        riskScore: (item.severityBreakdown.critical * 4 + 
                   item.severityBreakdown.high * 3 + 
                   item.severityBreakdown.medium * 2 + 
                   item.severityBreakdown.low * 1) / item.totalEvents,
        topEventType: Object.entries(item.topEventTypes)
          .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'Unknown'
      })).sort((a, b) => b.totalEvents - a.totalEvents);

      return geoArray;
    },
    refetchInterval: 60000
  });
};

const useThreatActivityFeed = () => {
  return useQuery({
    queryKey: ['threat-activity-feed'],
    queryFn: async () => {
      const { data } = await supabase
        .from('security_logs')
        .select('severity, event_type, created_at, source, metadata')
        .order('created_at', { ascending: false })
        .limit(50);

      return data?.map(log => {
        const metadata = log.metadata as any;
        const src_ip = metadata?.src_ip || '192.168.1.' + Math.floor(Math.random() * 255);
        return {
          ...log,
          src_ip,
          sourceCountry: getCountryFromIP(src_ip),
          timeAgo: new Date(log.created_at).toLocaleString()
        };
      }) || [];
    },
    refetchInterval: 30000
  });
};

const getSeverityColor = (severity: string) => {
  switch (severity?.toLowerCase()) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

const getRiskLevelBadge = (riskScore: number) => {
  if (riskScore >= 3) return <Badge variant="destructive">High Risk</Badge>;
  if (riskScore >= 2) return <Badge variant="secondary">Medium Risk</Badge>;
  return <Badge variant="default">Low Risk</Badge>;
};

export default function ThreatMapDashboard() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const geoData = useGeoThreatData(timeRange);
  const activityFeed = useThreatActivityFeed();

  if (geoData.isLoading || activityFeed.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const selectedCountryData = selectedCountry ? 
    geoData.data?.find(item => item.country === selectedCountry) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Threat Map</h2>
          <p className="text-muted-foreground">
            Real-time geographic threat intelligence and attack patterns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Source Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{geoData.data?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Countries with threat activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threat Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {geoData.data?.reduce((sum, item) => sum + item.totalEvents, 0) || 0}
            </div>
            <p className="text-xs text-muted-foreground">Security events detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Countries</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {geoData.data?.filter(item => item.riskScore >= 3).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Countries above risk threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Geographic Threat List */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Sources by Country</CardTitle>
            <CardDescription>Geographic distribution of security threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {geoData.data?.map((country, index) => (
                <div 
                  key={country.country}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCountry === country.country ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCountry(
                    selectedCountry === country.country ? null : country.country
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{country.country}</span>
                      {getRiskLevelBadge(country.riskScore)}
                    </div>
                    <Badge variant="outline">{country.totalEvents} events</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{country.uniqueIPCount} unique IPs</span>
                    <span>Top: {country.topEventType}</span>
                  </div>
                  
                  {/* Severity breakdown */}
                  <div className="mt-2 flex space-x-1">
                     {Object.entries(country.severityBreakdown).map(([severity, count]) => (
                       (count as number) > 0 && (
                        <div 
                          key={severity}
                          className={`h-2 rounded ${getSeverityColor(severity)}`}
                           style={{ 
                             width: `${((count as number) / country.totalEvents) * 100}%`,
                            minWidth: '4px'
                          }}
                          title={`${severity}: ${count} events`}
                        />
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Country Details or Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedCountryData ? `${selectedCountryData.country} Details` : 'Recent Threat Activity'}
            </CardTitle>
            <CardDescription>
              {selectedCountryData ? 
                'Detailed threat analysis for selected country' : 
                'Live feed of security events'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCountryData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{selectedCountryData.totalEvents}</div>
                    <div className="text-sm text-muted-foreground">Total Events</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{selectedCountryData.uniqueIPCount}</div>
                    <div className="text-sm text-muted-foreground">Unique IPs</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Severity Breakdown</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedCountryData.severityBreakdown).map(([severity, count]) => (
                      (count as number) > 0 && (
                        <div key={severity} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded ${getSeverityColor(severity)}`} />
                            <span className="capitalize">{severity}</span>
                          </div>
                          <Badge variant="outline">{count as number}</Badge>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Top Event Types</h4>
                  <div className="space-y-1">
                    {Object.entries(selectedCountryData.topEventTypes)
                      .sort(([,a], [,b]) => (b as number) - (a as number))
                      .slice(0, 5)
                      .map(([eventType, count]) => (
                        <div key={eventType} className="flex justify-between text-sm">
                          <span>{eventType}</span>
                          <span className="text-muted-foreground">{count as number}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCountry(null)}
                  className="w-full"
                >
                  Back to Overview
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activityFeed.data?.slice(0, 20).map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(event.severity)}`} />
                      <div>
                        <div className="text-sm font-medium">{event.event_type}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.src_ip} → {event.sourceCountry}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
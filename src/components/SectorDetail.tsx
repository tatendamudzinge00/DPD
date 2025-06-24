import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SectorType } from "@/pages/Index";
import { AlertTriangle, Shield, Users, Activity, TrendingUp, Building2, MapPin, Clock, BarChart3 } from "lucide-react";
import { OrganizationDashboard } from "./OrganizationDashboard";

interface SectorDetailProps {
  sector: SectorType;
}

export function SectorDetail({ sector }: SectorDetailProps) {
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('7d');

  const sectorData = {
    government: {
      name: 'Government Sector',
      description: 'National government ministries, departments, and parastatals',
      threatLevel: 'critical',
      activeThreats: 23,
      protectionScore: 89,
      totalAssets: 156,
      criticalAssets: 45,
      recentIncidents: 8,
      keyMetrics: [
        { label: 'Email Security', value: 92, status: 'good' },
        { label: 'Network Protection', value: 87, status: 'medium' },
        { label: 'Data Encryption', value: 95, status: 'good' },
        { label: 'Access Control', value: 78, status: 'poor' }
      ],
      topThreats: [
        'Advanced Persistent Threats (APTs)',
        'Phishing and Social Engineering',
        'Insider Threats',
        'State-sponsored Attacks'
      ],
      organizations: [
        'Office of the President and Cabinet (OPC)',
        'Ministry of Finance and Economic Development',
        'Zimbabwe Revenue Authority (ZIMRA)',
        'Ministry of Home Affairs',
        'Ministry of Defence',
        'Ministry of ICT, Postal and Courier Services',
        'Registrar General\'s Office',
        'Zimbabwe Electoral Commission (ZEC)',
        'Public Service Commission (PSC)',
        'Central Intelligence Organisation (CIO)',
        'Zimbabwe National Statistics Agency (ZIMSTAT)'
      ]
    },
    zchpc: {
      name: 'Zimbabwe Centre For High Performance Computing (ZCHPC)',
      description: 'National high-performance computing infrastructure and research facility',
      threatLevel: 'high',
      activeThreats: 15,
      protectionScore: 94,
      totalAssets: 45,
      criticalAssets: 28,
      recentIncidents: 2,
      keyMetrics: [
        { label: 'Supercomputer Security', value: 96, status: 'good' },
        { label: 'Research Data Protection', value: 93, status: 'good' },
        { label: 'Network Infrastructure', value: 91, status: 'good' },
        { label: 'Access Management', value: 89, status: 'medium' }
      ],
      topThreats: [
        'Advanced Persistent Threats (APTs)',
        'Research Data Theft',
        'Nation-State Cyber Espionage',
        'Insider Threats'
      ],
      organizations: [
        'ZCHPC Main Computing Center',
        'Research Computing Division',
        'Data Analytics Unit',
        'Scientific Computing Laboratory',
        'Computational Biology Center',
        'Climate Modeling Division',
        'AI and Machine Learning Hub',
        'Quantum Computing Research Unit'
      ]
    },
    banking: {
      name: 'Banking & Finance Sector',
      description: 'Commercial banks, central bank, microfinance, fintechs',
      threatLevel: 'high',
      activeThreats: 18,
      protectionScore: 95,
      totalAssets: 89,
      criticalAssets: 34,
      recentIncidents: 3,
      keyMetrics: [
        { label: 'Transaction Security', value: 98, status: 'good' },
        { label: 'Customer Data Protection', value: 94, status: 'good' },
        { label: 'Mobile Banking Security', value: 91, status: 'good' },
        { label: 'ATM Network Security', value: 89, status: 'medium' }
      ],
      topThreats: [
        'Banking Trojans and Malware',
        'Card Fraud and Skimming',
        'Mobile Payment Fraud',
        'Business Email Compromise'
      ],
      organizations: [
        'Reserve Bank of Zimbabwe (RBZ)',
        'CBZ Holdings',
        'Stanbic Bank Zimbabwe',
        'Ecobank Zimbabwe',
        'BancABC',
        'FBC Bank',
        'Steward Bank',
        'POSB (People\'s Own Savings Bank)',
        'NMB Bank',
        'ZB Bank',
        'EcoCash (Econet Financial Services)',
        'ZIMSWITCH',
        'Financial Intelligence Unit (FIU)'
      ]
    },
    private: {
      name: 'Private Sector',
      description: 'Corporations, insurance, retail, tech, logistics',
      threatLevel: 'medium',
      activeThreats: 12,
      protectionScore: 82,
      totalAssets: 134,
      criticalAssets: 28,
      recentIncidents: 5,
      keyMetrics: [
        { label: 'Endpoint Protection', value: 85, status: 'medium' },
        { label: 'Data Loss Prevention', value: 79, status: 'poor' },
        { label: 'Network Monitoring', value: 88, status: 'medium' },
        { label: 'Incident Response', value: 91, status: 'good' }
      ],
      topThreats: [
        'Ransomware Attacks',
        'Business Email Compromise',
        'Supply Chain Attacks',
        'Insider Threats'
      ],
      organizations: [
        'Delta Corporation',
        'Econet Wireless Zimbabwe',
        'Innscor Africa',
        'Old Mutual Zimbabwe',
        'Doves Holdings',
        'Cassava Smartech',
        'First Mutual Holdings',
        'OK Zimbabwe',
        'Seed Co International',
        'Freight World',
        'Mahomed Mussa Wholesalers'
      ]
    },
    education: {
      name: 'Education Sector',
      description: 'Universities, colleges, regulatory authorities',
      threatLevel: 'low',
      activeThreats: 6,
      protectionScore: 76,
      totalAssets: 89,
      criticalAssets: 22,
      recentIncidents: 2,
      keyMetrics: [
        { label: 'Student Data Protection', value: 82, status: 'medium' },
        { label: 'Research Data Security', value: 74, status: 'poor' },
        { label: 'Network Infrastructure', value: 78, status: 'poor' },
        { label: 'Access Management', value: 85, status: 'medium' }
      ],
      topThreats: [
        'Data Breaches',
        'Phishing Campaigns',
        'Unauthorized Access',
        'Research Data Theft'
      ],
      organizations: [
        'University of Zimbabwe (UZ)',
        'Midlands State University (MSU)',
        'National University of Science and Technology (NUST)',
        'Zimbabwe Open University (ZOU)',
        'Harare Institute of Technology (HIT)',
        'Zimbabwe Council for Higher Education (ZIMCHE)',
        'Zimbabwe School Examinations Council (ZIMSEC)',
        'Teachers colleges and vocational training centers',
        'Bindura University of Science Education',
        'Great Zimbabwe University'
      ]
    },
    industrial: {
      name: 'Industrial & Mining Sector',
      description: 'Heavy industry, mining corporations, manufacturing',
      threatLevel: 'medium',
      activeThreats: 14,
      protectionScore: 84,
      totalAssets: 67,
      criticalAssets: 31,
      recentIncidents: 4,
      keyMetrics: [
        { label: 'SCADA Security', value: 87, status: 'medium' },
        { label: 'Industrial Control Systems', value: 91, status: 'good' },
        { label: 'Physical Security Integration', value: 89, status: 'medium' },
        { label: 'Network Segmentation', value: 85, status: 'medium' }
      ],
      topThreats: [
        'Industrial Espionage',
        'SCADA/ICS Attacks',
        'Supply Chain Compromises',
        'Physical-Cyber Convergence Attacks'
      ],
      organizations: [
        'Zimplats',
        'Hwange Colliery Company',
        'Zimbabwe Mining Development Corporation (ZMDC)',
        'Mimosa Mining Company',
        'RioZim Limited',
        'Lafarge Cement Zimbabwe',
        'Sino Zimbabwe Cement Company',
        'Dairibord Zimbabwe',
        'National Railways of Zimbabwe (NRZ)'
      ]
    },
    telecoms: {
      name: 'Telecoms & ICT Sector',
      description: 'ISPs, telecom providers, ICT regulators',
      threatLevel: 'high',
      activeThreats: 21,
      protectionScore: 92,
      totalAssets: 78,
      criticalAssets: 42,
      recentIncidents: 6,
      keyMetrics: [
        { label: 'Network Infrastructure Security', value: 94, status: 'good' },
        { label: 'Customer Data Protection', value: 90, status: 'good' },
        { label: 'Service Availability', value: 96, status: 'good' },
        { label: 'Regulatory Compliance', value: 88, status: 'medium' }
      ],
      topThreats: [
        'DDoS Attacks',
        'Network Infrastructure Attacks',
        'SIM Swapping',
        'Customer Data Breaches'
      ],
      organizations: [
        'POTRAZ (Postal and Telecommunications Regulatory Authority)',
        'NetOne Cellular',
        'Econet Wireless Zimbabwe',
        'TelOne',
        'Liquid Intelligent Technologies Zimbabwe',
        'Telecel Zimbabwe',
        'Utande Internet Services',
        'Africom'
      ]
    },
    health: {
      name: 'Health Sector',
      description: 'Public hospitals, pharma, regulators',
      threatLevel: 'medium',
      activeThreats: 9,
      protectionScore: 81,
      totalAssets: 95,
      criticalAssets: 38,
      recentIncidents: 3,
      keyMetrics: [
        { label: 'Patient Data Protection', value: 86, status: 'medium' },
        { label: 'Medical Device Security', value: 78, status: 'poor' },
        { label: 'Healthcare Records Security', value: 83, status: 'medium' },
        { label: 'Regulatory Compliance', value: 89, status: 'medium' }
      ],
      topThreats: [
        'Healthcare Data Breaches',
        'Medical Device Compromises',
        'Ransomware Attacks',
        'Patient Record Theft'
      ],
      organizations: [
        'Ministry of Health and Child Care',
        'Parirenyatwa Group of Hospitals',
        'Sally Mugabe Hospital',
        'National AIDS Council (NAC)',
        'NatPharm (National Pharmaceutical Company)',
        'Health Services Board',
        'Mpilo Central Hospital',
        'Medicines Control Authority of Zimbabwe (MCAZ)'
      ]
    },
    energy: {
      name: 'Energy Sector',
      description: 'Energy utilities, regulators, rural energy development',
      threatLevel: 'high',
      activeThreats: 19,
      protectionScore: 87,
      totalAssets: 52,
      criticalAssets: 35,
      recentIncidents: 7,
      keyMetrics: [
        { label: 'Grid Security', value: 89, status: 'medium' },
        { label: 'SCADA Protection', value: 91, status: 'good' },
        { label: 'Critical Infrastructure', value: 94, status: 'good' },
        { label: 'Incident Response', value: 86, status: 'medium' }
      ],
      topThreats: [
        'Critical Infrastructure Attacks',
        'Power Grid Disruptions',
        'Industrial Control System Attacks',
        'Nation-State Threats'
      ],
      organizations: [
        'Zimbabwe Electricity Supply Authority (ZESA)',
        'Zimbabwe Power Company (ZPC)',
        'ZETDC (Zimbabwe Electricity Transmission & Distribution)',
        'Rural Electrification Agency (REA)',
        'Zimbabwe Energy Regulatory Authority (ZERA)',
        'GreenFuel',
        'Hwange Power Station',
        'Kariba Hydro Power Station'
      ]
    },
    transport: {
      name: 'Transport Sector',
      description: 'Air, rail, road, logistics, and traffic agencies',
      threatLevel: 'low',
      activeThreats: 7,
      protectionScore: 79,
      totalAssets: 43,
      criticalAssets: 18,
      recentIncidents: 2,
      keyMetrics: [
        { label: 'Traffic Management Systems', value: 82, status: 'medium' },
        { label: 'Aviation Security', value: 88, status: 'medium' },
        { label: 'Rail Network Security', value: 75, status: 'poor' },
        { label: 'Logistics Security', value: 81, status: 'medium' }
      ],
      topThreats: [
        'Transportation System Disruptions',
        'GPS Spoofing',
        'Cargo Tracking Compromises',
        'Aviation System Attacks'
      ],
      organizations: [
        'Ministry of Transport and Infrastructural Development',
        'Zimbabwe National Roads Administration (ZINARA)',
        'Civil Aviation Authority of Zimbabwe (CAAZ)',
        'National Railways of Zimbabwe (NRZ)',
        'Vehicle Inspection Department (VID)',
        'Traffic Safety Council of Zimbabwe',
        'Air Zimbabwe'
      ]
    },
    media: {
      name: 'Media Sector',
      description: 'Public and private media houses, online platforms',
      threatLevel: 'low',
      activeThreats: 5,
      protectionScore: 74,
      totalAssets: 38,
      criticalAssets: 12,
      recentIncidents: 1,
      keyMetrics: [
        { label: 'Content Management Security', value: 76, status: 'poor' },
        { label: 'Broadcasting Infrastructure', value: 82, status: 'medium' },
        { label: 'Digital Platform Security', value: 78, status: 'poor' },
        { label: 'Information Integrity', value: 85, status: 'medium' }
      ],
      topThreats: [
        'Website Defacements',
        'Misinformation Campaigns',
        'Broadcasting Disruptions',
        'Content Management Breaches'
      ],
      organizations: [
        'Zimbabwe Broadcasting Corporation (ZBC)',
        'The Herald (Zimpapers)',
        'NewsDay Zimbabwe',
        'Daily News Zimbabwe',
        '263Chat',
        'Nehanda Radio',
        'Techzim',
        'Sunday Mail',
        'ZiFM Stereo',
        'Star FM',
        'Voice of Zimbabwe'
      ]
    }
  };

  const currentSector = sectorData[sector as keyof typeof sectorData] || sectorData.government;

  // If an organization is selected, show the organization dashboard
  if (selectedOrganization) {
    return (
      <OrganizationDashboard 
        organizationName={selectedOrganization}
        sector={currentSector.name}
        onBack={() => setSelectedOrganization(null)}
      />
    );
  }

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-amber-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sector Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{currentSector.name}</h2>
          <p className="text-slate-300">{currentSector.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={`${getThreatLevelColor(currentSector.threatLevel)} text-white border-0`}>
            {currentSector.threatLevel.toUpperCase()} THREAT LEVEL
          </Badge>
          <div className="text-xs text-slate-400">
            Last Updated: 2025-06-22 14:30:00
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-slate-300">Active Threats</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{currentSector.activeThreats}</div>
            <div className="flex items-center space-x-1 text-sm text-slate-400 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+15% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-slate-300">Protection Score</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{currentSector.protectionScore}%</div>
            <Progress value={currentSector.protectionScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300">Total Assets</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{currentSector.totalAssets}</div>
            <div className="text-sm text-slate-400 mt-1">
              {currentSector.criticalAssets} critical assets
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-amber-400" />
              <span className="text-slate-300">Recent Incidents</span>
            </div>
            <div className="text-3xl font-bold text-amber-400">{currentSector.recentIncidents}</div>
            <div className="text-sm text-slate-400 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Metrics */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Security Metrics Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSector.keyMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{metric.label}</span>
                  <span className={`font-semibold ${getMetricColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Threats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Top Threat Vectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentSector.topThreats.map((threat, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-slate-300">{threat}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time-Series Trends */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Threat Trends</span>
              </div>
              <div className="flex space-x-2">
                {(['24h', '7d', '30d'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    size="sm"
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className="text-xs"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-slate-400">Threat count trend chart ({selectedTimeframe})</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-slate-400">Avg Response Time</div>
                  <div className="text-white font-semibold">24 min</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Peak Threats</div>
                  <div className="text-white font-semibold">14:30</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Trend</div>
                  <div className="text-green-400 font-semibold">Improving</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geo-Map Placeholder */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Geographic Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-slate-400">Province-level threat heatmap</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-300">Harare (Critical)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300">Bulawayo (Medium)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Organizations */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Key Organizations in Sector ({currentSector.organizations.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSector.organizations.map((org, index) => (
                <div 
                  key={index} 
                  className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrganization(org)}
                >
                  <div className="text-white font-semibold mb-2 text-sm leading-relaxed">{org}</div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs text-green-300 border-green-600">
                      Protected
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Clock className="h-3 w-3 text-slate-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

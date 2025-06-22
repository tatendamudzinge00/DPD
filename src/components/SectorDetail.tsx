
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectorType } from "@/pages/Index";
import { AlertTriangle, Shield, Users, Activity, TrendingUp, Building2 } from "lucide-react";

interface SectorDetailProps {
  sector: SectorType;
}

export function SectorDetail({ sector }: SectorDetailProps) {
  const sectorData = {
    government: {
      name: 'Government Sector',
      description: 'National government ministries, departments, and agencies',
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
        'Office of the President',
        'Ministry of Finance',
        'Zimbabwe Revenue Authority',
        'Central Intelligence Organization'
      ]
    },
    banking: {
      name: 'Banking & Finance Sector',
      description: 'Commercial banks, microfinance, and financial institutions',
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
        'Reserve Bank of Zimbabwe',
        'Commercial Bank of Zimbabwe',
        'Stanbic Bank Zimbabwe',
        'Ecocash Holdings'
      ]
    }
  };

  const currentSector = sectorData[sector as keyof typeof sectorData] || sectorData.government;

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{currentSector.name}</h2>
          <p className="text-slate-300">{currentSector.description}</p>
        </div>
        <Badge variant="outline" className={`${getThreatLevelColor(currentSector.threatLevel)} text-white border-0`}>
          {currentSector.threatLevel.toUpperCase()} THREAT LEVEL
        </Badge>
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
            <CardTitle className="text-white">Security Metrics</CardTitle>
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

        {/* Key Organizations */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Key Organizations in Sector</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentSector.organizations.map((org, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-white font-semibold mb-2">{org}</div>
                  <Badge variant="outline" className="text-xs text-slate-300 border-slate-600">
                    Protected
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

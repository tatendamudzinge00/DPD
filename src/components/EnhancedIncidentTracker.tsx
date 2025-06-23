
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  Plus,
  Filter,
  FileText,
  Eye,
  Edit
} from "lucide-react";

// Incident categories and subcategories
const incidentCategories = {
  'Malware': ['Ransomware', 'Trojan', 'Worm', 'Rootkit', 'Adware'],
  'Phishing & Social Engineering': ['Credential Theft', 'Spear Phishing', 'Whaling', 'Vishing (voice)', 'Baiting'],
  'Denial of Service (DoS/DDoS)': ['Volumetric Attack', 'Protocol Attack', 'Application-Layer Attack'],
  'Unauthorized Access': ['Brute-Force Login', 'Stolen Credentials', 'Privilege Escalation'],
  'Insider Threat': ['Data Exfiltration', 'Sabotage', 'Unauthorized Disclosure'],
  'Vulnerability Exploit': ['Unpatched Software', 'Zero-Day Exploit', 'Misconfiguration'],
  'Network & Perimeter': ['Firewall Bypass', 'VPN Compromise', 'Open Port Abuse'],
  'Data Breach & Theft': ['Database Dump', 'File/Record Exfiltration', 'Backup Theft'],
  'Policy & Compliance': ['Data Privacy Violation', 'Regulatory Non-Compliance (e.g. PCI-DSS, GDPR)'],
  'Physical Security': ['Device Theft/Loss', 'Unauthorized Facility Access'],
  'Other': ['Supply Chain Attack', 'Third-Party Compromise', 'Unknown/Undetermined']
};

export function EnhancedIncidentTracker() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSubcategory, setFilterSubcategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: '',
    severity: 'medium',
    category: '',
    subcategory: '',
    affectedAssets: '',
    reportedBy: ''
  });

  const incidents = [
    {
      id: 'INC-2024-001',
      title: 'Government Email Compromise',
      sector: 'Government',
      severity: 'critical',
      status: 'investigating',
      category: 'Phishing & Social Engineering',
      subcategory: 'Credential Theft',
      assigned: 'Cyber Response Team Alpha',
      progress: 65,
      timeElapsed: '4h 23m',
      estimatedResolution: '2h 15m',
      createdAt: '2025-06-23 06:00'
    },
    {
      id: 'INC-2024-002',
      title: 'Banking System Ransomware',
      sector: 'Banking',
      severity: 'critical',
      status: 'contained',
      category: 'Malware',
      subcategory: 'Ransomware',
      assigned: 'Financial Sector CERT',
      progress: 90,
      timeElapsed: '1h 45m',
      estimatedResolution: '30m',
      createdAt: '2025-06-23 08:30'
    },
    {
      id: 'INC-2024-003',
      title: 'Telecom DDoS Attack',
      sector: 'Telecoms',
      severity: 'high',
      status: 'resolved',
      category: 'Denial of Service (DoS/DDoS)',
      subcategory: 'Volumetric Attack',
      assigned: 'Network Security Team',
      progress: 100,
      timeElapsed: '6h 12m',
      estimatedResolution: 'Completed',
      createdAt: '2025-06-22 18:00'
    },
    {
      id: 'INC-2024-004',
      title: 'Hospital Database Access Attempt',
      sector: 'Health',
      severity: 'high',
      status: 'monitoring',
      category: 'Unauthorized Access',
      subcategory: 'Brute-Force Login',
      assigned: 'Healthcare CERT',
      progress: 45,
      timeElapsed: '2h 8m',
      estimatedResolution: '4h 30m',
      createdAt: '2025-06-23 08:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'bg-amber-600';
      case 'contained': return 'bg-blue-600';
      case 'resolved': return 'bg-green-600';
      case 'monitoring': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating': return <AlertTriangle className="h-4 w-4" />;
      case 'contained': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'monitoring': return <Users className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'default';
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    setFormData({ ...formData, category, subcategory: '' });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setFormData({ ...formData, subcategory });
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filterCategory !== 'all' && incident.category !== filterCategory) return false;
    if (filterSubcategory !== 'all' && incident.subcategory !== filterSubcategory) return false;
    return true;
  });

  const getCategoryStats = () => {
    const stats = {};
    incidents.forEach(incident => {
      const category = incident.category;
      if (!stats[category]) {
        stats[category] = 0;
      }
      stats[category]++;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="space-y-6">
      {!showCreateForm ? (
        <>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Enhanced Incident Tracker</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Incident
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex space-x-4 mb-6">
                <div className="space-y-1">
                  <Label className="text-slate-300">Filter by Category</Label>
                  <select 
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                      setFilterSubcategory('all');
                    }}
                    className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                  >
                    <option value="all">All Categories</option>
                    {Object.keys(incidentCategories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                {filterCategory !== 'all' && (
                  <div className="space-y-1">
                    <Label className="text-slate-300">Filter by Subcategory</Label>
                    <select 
                      value={filterSubcategory}
                      onChange={(e) => setFilterSubcategory(e.target.value)}
                      className="bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                    >
                      <option value="all">All Subcategories</option>
                      {incidentCategories[filterCategory]?.map(subcategory => (
                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Incidents List */}
              <div className="space-y-4">
                {filteredIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{incident.id}</span>
                          <Badge variant={getSeverityVariant(incident.severity)}>
                            {incident.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-slate-300 border-slate-500">
                            {incident.sector}
                          </Badge>
                        </div>
                        <h4 className="text-white font-medium">{incident.title}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-400">Category: <span className="text-slate-300">{incident.category}</span></span>
                          <span className="text-slate-400">Type: <span className="text-slate-300">{incident.subcategory}</span></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-white text-sm ${getStatusColor(incident.status)}`}>
                          {getStatusIcon(incident.status)}
                          <span className="capitalize">{incident.status}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-slate-400 text-sm">Assigned To:</span>
                        <p className="text-white text-sm font-medium">{incident.assigned}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Time Elapsed:</span>
                        <p className="text-white text-sm font-medium">{incident.timeElapsed}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Est. Resolution:</span>
                        <p className="text-white text-sm font-medium">{incident.estimatedResolution}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Resolution Progress</span>
                        <span className="text-white font-medium">{incident.progress}%</span>
                      </div>
                      <Progress value={incident.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Analytics */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Incident Category Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="bg-slate-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">{count}</div>
                    <div className="text-sm text-slate-300">{category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Create Incident Form */
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Create New Incident</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Incident Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Brief description of the incident"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Category</Label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                  >
                    <option value="">Select a category</option>
                    {Object.keys(incidentCategories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <div>
                    <Label className="text-slate-300">Subcategory</Label>
                    <select 
                      value={selectedSubcategory}
                      onChange={(e) => handleSubcategoryChange(e.target.value)}
                      className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                    >
                      <option value="">Select a subcategory</option>
                      {incidentCategories[selectedCategory]?.map(subcategory => (
                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <Label className="text-slate-300">Severity</Label>
                  <select 
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Affected Sector</Label>
                  <select 
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                  >
                    <option value="">Select sector</option>
                    <option value="Government">Government</option>
                    <option value="Banking">Banking & Finance</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Telecoms">Telecoms & ICT</option>
                    <option value="Energy">Energy</option>
                    <option value="Transport">Transport</option>
                    <option value="Media">Media</option>
                  </select>
                </div>

                <div>
                  <Label className="text-slate-300">Affected Assets</Label>
                  <Input
                    value={formData.affectedAssets}
                    onChange={(e) => setFormData({ ...formData, affectedAssets: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="List affected systems/assets"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Reported By</Label>
                  <Input
                    value={formData.reportedBy}
                    onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Name or organization"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white h-32"
                  placeholder="Detailed description of the incident, impact, and initial observations..."
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Incident
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  Save as Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

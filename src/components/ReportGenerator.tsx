import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

export function ReportGenerator() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    reportType: 'summary',
    timeframe: '30d',
    format: 'pdf',
    includeIncidents: true,
    includeCompliance: true,
    includeRequests: true,
    includeAnalytics: false,
  });

  const handleGenerateReport = async () => {
    toast({
      title: "Generating report...",
      description: "Your report is being prepared. This may take a few moments.",
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report generated successfully",
        description: `Your ${reportConfig.reportType} report is ready for download.`,
      });
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
          <Calendar className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Generate Data Protection Report
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Configure and generate comprehensive compliance and incident reports
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Report Type</Label>
                <Select 
                  value={reportConfig.reportType} 
                  onValueChange={(val) => setReportConfig({...reportConfig, reportType: val})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="summary">Executive Summary</SelectItem>
                    <SelectItem value="detailed">Detailed Analysis</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                    <SelectItem value="incidents">Incident Report</SelectItem>
                    <SelectItem value="audit">Audit Trail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Time Period</Label>
                <Select 
                  value={reportConfig.timeframe} 
                  onValueChange={(val) => setReportConfig({...reportConfig, timeframe: val})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Export Format</Label>
                <Select 
                  value={reportConfig.format} 
                  onValueChange={(val) => setReportConfig({...reportConfig, format: val})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="html">HTML Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="pt-6">
              <Label className="text-slate-300 mb-4 block flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Include Sections
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="incidents"
                    checked={reportConfig.includeIncidents}
                    onCheckedChange={(checked) => 
                      setReportConfig({...reportConfig, includeIncidents: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="incidents"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Privacy Incidents & Breaches
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="compliance"
                    checked={reportConfig.includeCompliance}
                    onCheckedChange={(checked) => 
                      setReportConfig({...reportConfig, includeCompliance: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="compliance"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Compliance Status & Frameworks
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="requests"
                    checked={reportConfig.includeRequests}
                    onCheckedChange={(checked) => 
                      setReportConfig({...reportConfig, includeRequests: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="requests"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Data Subject Rights Requests
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="analytics"
                    checked={reportConfig.includeAnalytics}
                    onCheckedChange={(checked) => 
                      setReportConfig({...reportConfig, includeAnalytics: checked as boolean})
                    }
                  />
                  <label
                    htmlFor="analytics"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Security Analytics & Metrics
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-slate-600 text-slate-300">
            Cancel
          </Button>
          <Button onClick={handleGenerateReport}>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

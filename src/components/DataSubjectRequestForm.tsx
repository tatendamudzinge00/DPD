import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateDataSubjectRequest } from "@/hooks/useDataSubjectRequests";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DataSubjectRequestForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    request_type: '',
    description: '',
    priority: 'medium',
    requester_name: '',
  });
  
  const { profile } = useAuth();
  const createRequest = useCreateDataSubjectRequest();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile?.sector) {
      toast({
        title: "Error",
        description: "Unable to determine your sector. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createRequest.mutateAsync({
        ...formData,
        sector: profile.sector,
        status: 'processing',
        submitted_at: new Date().toISOString(),
      });
      
      toast({
        title: "Success",
        description: "Data subject request has been created successfully.",
      });
      
      setOpen(false);
      setFormData({
        email: '',
        request_type: '',
        description: '',
        priority: 'medium',
        requester_name: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create data subject request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">New Data Subject Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requester_name" className="text-slate-200">Requester Name</Label>
              <Input
                id="requester_name"
                value={formData.requester_name}
                onChange={(e) => setFormData({ ...formData, requester_name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="request_type" className="text-slate-200">Request Type</Label>
              <Select
                value={formData.request_type}
                onValueChange={(value) => setFormData({ ...formData, request_type: value })}
                required
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="data_access">Data Access Request</SelectItem>
                  <SelectItem value="data_deletion">Data Deletion Request</SelectItem>
                  <SelectItem value="data_portability">Data Portability Request</SelectItem>
                  <SelectItem value="data_rectification">Data Rectification Request</SelectItem>
                  <SelectItem value="data_restriction">Data Processing Restriction</SelectItem>
                  <SelectItem value="objection">Objection to Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-slate-200">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Additional details about the request..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
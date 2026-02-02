import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Clock, Save, Loader2, Smartphone, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface SessionInfo {
  id: string;
  created_at: string;
  updated_at: string;
  user_agent: string;
  ip: string;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaLoading, setMfaLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [mfaFactors, setMfaFactors] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  useEffect(() => {
    const fetchMfaFactors = async () => {
      try {
        const { data, error } = await supabase.auth.mfa.listFactors();
        if (error) throw error;
        setMfaFactors(data?.totp || []);
        setMfaEnabled((data?.totp || []).some((f: any) => f.status === 'verified'));
      } catch (error) {
        console.error('Error fetching MFA factors:', error);
      }
    };

    const fetchSessions = async () => {
      setSessionsLoading(true);
      try {
        // Get current session info
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          // Simulate session history (in production, this would come from auth logs)
          const mockSessions: SessionInfo[] = [
            {
              id: sessionData.session.access_token.slice(-8),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              user_agent: navigator.userAgent,
              ip: 'Current Session'
            }
          ];
          setSessions(mockSessions);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setSessionsLoading(false);
      }
    };

    if (user) {
      fetchMfaFactors();
      fetchSessions();
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleEnableMfa = async () => {
    setMfaLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App'
      });

      if (error) throw error;

      if (data) {
        // Show QR code to user
        toast.info('Scan the QR code with your authenticator app', {
          description: 'MFA enrollment started',
          duration: 5000
        });
        
        // In a real implementation, you'd show a modal with the QR code
        // For now, we'll open a verification dialog
        const verifyCode = window.prompt('Enter the 6-digit code from your authenticator app:');
        
        if (verifyCode) {
          const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
            factorId: data.id,
            code: verifyCode
          });

          if (verifyError) throw verifyError;
          
          setMfaEnabled(true);
          toast.success('MFA enabled successfully');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to enable MFA');
    } finally {
      setMfaLoading(false);
    }
  };

  const handleDisableMfa = async () => {
    if (!mfaFactors.length) return;
    
    setMfaLoading(true);
    try {
      const factorId = mfaFactors[0].id;
      const { error } = await supabase.auth.mfa.unenroll({ factorId });

      if (error) throw error;
      
      setMfaEnabled(false);
      setMfaFactors([]);
      toast.success('MFA disabled successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to disable MFA');
    } finally {
      setMfaLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account settings and security preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-slate-700">
              <Clock className="h-4 w-4 mr-2" />
              Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-500" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-slate-700/50 border-slate-600 text-slate-400"
                  />
                  <p className="text-xs text-slate-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Role</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                      {profile?.role || 'analyst'}
                    </Badge>
                    <span className="text-xs text-slate-500">Contact admin to change role</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Sector</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                      {profile?.sector || 'government'}
                    </Badge>
                    <span className="text-xs text-slate-500">Contact admin to change sector</span>
                  </div>
                </div>

                <Button
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-cyan-500" />
                    Multi-Factor Authentication (MFA)
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${mfaEnabled ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
                        <Key className={`h-5 w-5 ${mfaEnabled ? 'text-emerald-500' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Authenticator App</p>
                        <p className="text-sm text-slate-400">
                          {mfaEnabled ? 'MFA is enabled' : 'Use an authenticator app for 2FA'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {mfaEnabled && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                          Enabled
                        </Badge>
                      )}
                      <Switch
                        checked={mfaEnabled}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleEnableMfa();
                          } else {
                            handleDisableMfa();
                          }
                        }}
                        disabled={mfaLoading}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <p className="text-amber-400 text-sm">
                      <strong>Recommendation:</strong> Enable MFA to protect your account from unauthorized access. 
                      This adds an extra verification step when logging in.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-500" />
                    Password
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/auth?mode=reset')}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-500" />
                  Active Sessions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  View and manage your active sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessionsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
                  </div>
                ) : sessions.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No active sessions found</p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                                Current
                              </Badge>
                              <span className="text-white font-medium">
                                {session.ip}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 truncate max-w-md">
                              {session.user_agent}
                            </p>
                            <p className="text-xs text-slate-500">
                              Started: {format(new Date(session.created_at), 'PPpp')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 mb-4">
                        Session history is tracked for security purposes. Contact your administrator for detailed audit logs.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSettings;

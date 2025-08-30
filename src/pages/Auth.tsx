import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, UserPlus, LogIn } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { user, loading, signIn, signUp, resetPassword, resendVerificationEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'analyst' | 'sector-lead'>('analyst');
  const [sector, setSector] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // If user is already authenticated, redirect to dashboard
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    const timeout = new Promise<{ error: any }>((resolve) =>
      setTimeout(() => resolve({ error: new Error('Request timed out. Please try again.') }), 15000)
    );
    const result = await Promise.race([signIn(email.trim(), password), timeout]);
    const { error } = result as { error: any };
    
    if (error) {
      // Provide user-friendly error messages
      if (typeof error.message === 'string' && error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (typeof error.message === 'string' && error.message.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before signing in.');
      } else if (String(error).includes('timed out')) {
        setError('Network seems slow. Please try again.');
      } else {
        setError('Sign in failed. Please try again.');
      }
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }

    if (!sector) {
      setError('Please select a sector');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, {
      full_name: fullName.trim(),
      role,
      sector
    });
    
    if (error) {
      // Provide user-friendly error messages
      if (error.message.includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.message.includes('captcha verification process failed')) {
        setError('Account creation is currently disabled due to security settings. Please contact support.');
      } else if (error.message.includes('Password should contain at least one character of each') || error.code === 'weak_password') {
        setError('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*()_+-=[]{};\':\"|<>?,./`~)');
      } else if (error.message.includes('password')) {
        setError('Password requirements not met. Please ensure your password is strong enough.');
      } else if (error.message.includes('email')) {
        setError('Please enter a valid email address');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } else {
      setError('');
      setSignupSuccess(`Account created successfully! Please check your email at ${email} and click the confirmation link to activate your account.`);
      // Clear form but stay on signup tab to show success message
      setFullName('');
      setPassword('');
      setSector('');
    }
    
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResetMessage('');

    if (!resetEmail.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    const { error } = await resetPassword(resetEmail.trim());
    
    if (error) {
      setError('Failed to send password reset email. Please check your email address and try again.');
    } else {
      setResetMessage('Password reset email sent! Check your inbox and click the link to reset your password.');
      setResetEmail('');
    }
    
    setIsLoading(false);
  };

  const sectors = [
    { value: 'government', label: 'Government' },
    { value: 'banking', label: 'Banking & Financial Services' },
    { value: 'private', label: 'Private Sector' },
    { value: 'education', label: 'Education' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'telecoms', label: 'Telecommunications' },
    { value: 'health', label: 'Health' },
    { value: 'energy', label: 'Energy' },
    { value: 'transport', label: 'Transport' },
    { value: 'media', label: 'Media' },
    { value: 'zchpc', label: 'Zimbabwe Centre For High Performance Computing (ZCHPC)' }
  ];

  const roles = [
    { value: 'analyst', label: 'Security Analyst' },
    { value: 'sector-lead', label: 'Sector Lead' },
    { value: 'admin', label: 'System Administrator' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-white">Data Protection Dashboard</CardTitle>
          <p className="text-slate-400">Secure access to data protection operations</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="signin" className="text-slate-300">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-slate-300">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="reset" className="text-slate-300">
                Reset
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mt-4 border-red-600 bg-red-950">
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {resetMessage && (
              <Alert className="mt-4 border-green-600 bg-green-950">
                <AlertDescription className="text-green-300">
                  {resetMessage}
                </AlertDescription>
              </Alert>
            )}

            {signupSuccess && (
              <Alert className="mt-4 border-green-600 bg-green-950">
                <AlertDescription className="text-green-300">
                  {signupSuccess}
                </AlertDescription>
              </Alert>
            )}

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-slate-300">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-slate-300">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-slate-300">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-slate-400">
                    Must contain: lowercase, uppercase, number, and special character
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role" className="text-slate-300">Role</Label>
                  <Select value={role} onValueChange={(value: 'admin' | 'analyst' | 'sector-lead') => setRole(value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((roleOption) => (
                        <SelectItem key={roleOption.value} value={roleOption.value}>
                          {roleOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-sector" className="text-slate-300">Sector</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select your sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sectorOption) => (
                        <SelectItem key={sectorOption.value} value={sectorOption.value}>
                          {sectorOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
                
                {signupSuccess && (
                  <div className="mt-4 space-y-2">
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                      onClick={async () => {
                        setIsLoading(true);
                        const { error } = await resendVerificationEmail(email);
                        if (error) {
                          setError('Failed to resend verification email. Please try again.');
                        } else {
                          setSignupSuccess('Verification email resent! Please check your inbox.');
                        }
                        setIsLoading(false);
                      }}
                      disabled={isLoading || !email}
                    >
                      Resend Verification Email
                    </Button>
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="reset">
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-slate-300">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your email address"
                    required
                  />
                  <p className="text-xs text-slate-400">
                    We'll send you a link to reset your password
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Email'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
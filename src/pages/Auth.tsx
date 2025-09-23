import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, UserPlus, LogIn } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { user, loading, signIn, signUp, resetPassword, resendVerificationEmail } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  // Simple form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // Basic SEO for the auth page
  useEffect(() => {
    document.title = 'Login | Data Protection Dashboard';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      el.setAttribute('content', 'Login to the Data Protection Dashboard. Secure access for analysts and admins.');
      document.head.appendChild(el);
    } else {
      metaDesc.setAttribute('content', 'Login to the Data Protection Dashboard. Secure access for analysts and admins.');
    }
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const href = `${window.location.origin}/auth`;
    if (!canonical) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', href);
      document.head.appendChild(link);
    } else {
      canonical.setAttribute('href', href);
    }
  }, []);

  // If user is already authenticated, redirect
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  // Loading state while checking auth
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
      const msg = typeof error.message === 'string' ? error.message : String(error);
      if (msg.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Please confirm your email first. Check your inbox for the confirmation link.');
      } else if (msg.includes('timed out')) {
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
    setSignupSuccess('');

    if (!email.trim()) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Minimal metadata to satisfy profile trigger with sane defaults
    const defaultName = email.split('@')[0];
    const { error } = await signUp(email.trim(), password, {
      full_name: defaultName,
      role: 'analyst',
      sector: 'government',
    });

    if (error) {
      const msg = typeof error.message === 'string' ? error.message : String(error);
      if (msg.includes('already registered')) {
        setError('An account with this email already exists. Please sign in.');
      } else if (msg.includes('captcha verification process failed')) {
        setError('Sign up is blocked by Bot Protection. Disable CAPTCHA in Supabase Auth settings and try again.');
      } else if (msg.includes('Password')) {
        setError('Password requirements not met. Please choose a stronger password.');
      } else if (msg.includes('email')) {
        setError('Please enter a valid email address');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } else {
      setError('');
      setSignupSuccess('Account created! Please check your email to confirm, then sign in.');
      setActiveTab('signin');
      setPassword('');
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
      setError('Failed to send password reset email. Please check your email and try again.');
    } else {
      setResetMessage('Password reset email sent! Check your inbox and click the link to reset your password.');
      setResetEmail('');
    }

    setIsLoading(false);
  };

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
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="signin" className="text-slate-300">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-slate-300">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="reset" className="text-slate-300">Reset</TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mt-4 border-red-600 bg-red-950">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            {resetMessage && (
              <Alert className="mt-4 border-green-600 bg-green-950">
                <AlertDescription className="text-green-300">{resetMessage}</AlertDescription>
              </Alert>
            )}

            {signupSuccess && (
              <Alert className="mt-4 border-green-600 bg-green-950">
                <AlertDescription className="text-green-300">{signupSuccess}</AlertDescription>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
                {email && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-slate-400"
                    onClick={async () => {
                      setIsLoading(true);
                      const { error } = await resendVerificationEmail(email.trim());
                      if (error) {
                        setError('Could not resend confirmation email.');
                      } else {
                        setResetMessage('Confirmation email resent. Please check your inbox.');
                      }
                      setIsLoading(false);
                    }}
                    disabled={isLoading}
                  >
                    Resend confirmation email
                  </Button>
                )}
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
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
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
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
                  <p className="text-xs text-slate-400">We'll send you a link to reset your password</p>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
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

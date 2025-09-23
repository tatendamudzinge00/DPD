import React, { useState } from 'react';
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
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    setMessage('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || 'Sign in failed');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message || 'Sign up failed');
    } else {
      setMessage('Check your email for confirmation link');
      setActiveTab('signin');
    }

    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message || 'Reset failed');
    } else {
      setMessage('Password reset email sent');
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
          <CardTitle className="text-2xl text-white">Authentication</CardTitle>
          <p className="text-slate-400">Sign in or create an account</p>
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

            {message && (
              <Alert className="mt-4 border-green-600 bg-green-950">
                <AlertDescription className="text-green-300">{message}</AlertDescription>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

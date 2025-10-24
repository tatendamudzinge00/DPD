import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'analyst' | 'sector-lead';
  requiredSector?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredSector 
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect to auth page if not authenticated
      if (!user) {
        navigate('/auth');
        return;
      }

      // If profile is loaded and inactive, redirect
      if (profile && !profile.is_active) {
        navigate('/auth');
        return;
      }

      // Check role-based access (when profile is available)
      if (profile && requiredRole && profile.role !== requiredRole && profile.role !== 'admin') {
        navigate('/');
        return;
      }

      // Check sector-based access (when profile is available)
      if (profile && requiredSector && profile.sector !== requiredSector && profile.role !== 'admin') {
        navigate('/');
        return;
      }

      // Note: Do NOT redirect when profile is null yet; wait for it to load/create
    }
  }, [user, profile, loading, requiredRole, requiredSector, navigate]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile.is_active) {
    return null;
  }

  return <>{children}</>;
}
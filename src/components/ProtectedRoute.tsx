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

      // Check if profile is loaded and active
      if (!profile || !profile.is_active) {
        navigate('/auth');
        return;
      }

      // Check role-based access
      if (requiredRole && profile.role !== requiredRole && profile.role !== 'admin') {
        navigate('/');
        return;
      }

      // Check sector-based access
      if (requiredSector && profile.sector !== requiredSector && profile.role !== 'admin') {
        navigate('/');
        return;
      }
    }
  }, [user, profile, loading, requiredRole, requiredSector, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile || !profile.is_active) {
    return null;
  }

  return <>{children}</>;
}
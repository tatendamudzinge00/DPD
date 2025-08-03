import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  // Check role permission
  if (requiredRole && profile.role !== requiredRole && profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  // Check sector permission (sector leads can only access their own sector)
  if (requiredSector && profile.role === 'sector-lead' && profile.sector !== requiredSector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">You can only access data for your assigned sector.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
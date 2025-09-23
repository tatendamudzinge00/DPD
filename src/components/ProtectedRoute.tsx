import React from 'react';

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
  // No authentication checks - always allow access
  return <>{children}</>;
}
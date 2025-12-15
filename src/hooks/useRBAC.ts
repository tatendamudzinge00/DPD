/**
 * React hook for Role-Based Access Control
 * Provides easy permission checking in components
 */

import { useAuth } from './useAuth';
import { hasPermission, hasAnyPermission, hasAllPermissions, getRolePermissions, Permission, AppRole } from '@/lib/rbacPermissions';

export function useRBAC() {
  const { profile } = useAuth();
  
  const userRole = (profile?.role || 'analyst') as AppRole;

  /**
   * Check if current user has a specific permission
   */
  const can = (permission: Permission): boolean => {
    return hasPermission(userRole, permission);
  };

  /**
   * Check if current user has any of the specified permissions
   */
  const canAny = (permissions: Permission[]): boolean => {
    return hasAnyPermission(userRole, permissions);
  };

  /**
   * Check if current user has all of the specified permissions
   */
  const canAll = (permissions: Permission[]): boolean => {
    return hasAllPermissions(userRole, permissions);
  };

  /**
   * Get all permissions for current user
   */
  const permissions = getRolePermissions(userRole);

  /**
   * Check if user is admin
   */
  const isAdmin = userRole === 'admin';

  /**
   * Check if user is sector lead
   */
  const isSectorLead = userRole === 'sector-lead';

  /**
   * Check if user is analyst
   */
  const isAnalyst = userRole === 'analyst';

  return {
    role: userRole,
    can,
    canAny,
    canAll,
    permissions,
    isAdmin,
    isSectorLead,
    isAnalyst,
  };
}

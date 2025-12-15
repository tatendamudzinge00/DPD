/**
 * Role-Based Access Control (RBAC) Permission System
 * Enterprise-grade permission management for the cybersecurity platform
 */

export type AppRole = 'admin' | 'analyst' | 'sector-lead';

export type Permission = 
  | 'view_dashboard'
  | 'view_alerts'
  | 'manage_alerts'
  | 'create_notes'
  | 'manage_cases'
  | 'assign_tasks'
  | 'view_threat_intel'
  | 'manage_threat_intel'
  | 'view_vulnerabilities'
  | 'manage_vulnerabilities'
  | 'view_compliance'
  | 'manage_compliance'
  | 'view_forensics'
  | 'manage_forensics'
  | 'view_network'
  | 'manage_network'
  | 'view_endpoints'
  | 'manage_endpoints'
  | 'view_iam'
  | 'manage_iam'
  | 'view_dlp'
  | 'manage_dlp'
  | 'view_reports'
  | 'generate_reports'
  | 'export_data'
  | 'manage_users'
  | 'configure_system'
  | 'manage_integrations'
  | 'all_permissions';

// Role-Permission mapping
const rolePermissions: Record<AppRole, Permission[]> = {
  analyst: [
    'view_dashboard',
    'view_alerts',
    'create_notes',
    'view_threat_intel',
    'view_vulnerabilities',
    'view_compliance',
    'view_network',
    'view_endpoints',
    'view_dlp',
    'view_reports'
  ],
  'sector-lead': [
    'view_dashboard',
    'view_alerts',
    'manage_alerts',
    'create_notes',
    'manage_cases',
    'assign_tasks',
    'view_threat_intel',
    'manage_threat_intel',
    'view_vulnerabilities',
    'manage_vulnerabilities',
    'view_compliance',
    'manage_compliance',
    'view_forensics',
    'view_network',
    'view_endpoints',
    'view_iam',
    'view_dlp',
    'view_reports',
    'generate_reports',
    'export_data'
  ],
  admin: [
    'all_permissions'
  ]
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(userRole: AppRole, permission: Permission): boolean {
  const permissions = rolePermissions[userRole];
  
  if (!permissions) return false;
  
  return permissions.includes('all_permissions') || permissions.includes(permission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(userRole: AppRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(userRole: AppRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: AppRole): Permission[] {
  if (role === 'admin') {
    return Object.values(rolePermissions).flat().filter((v, i, a) => a.indexOf(v) === i);
  }
  return rolePermissions[role] || [];
}

/**
 * Permission descriptions for UI display
 */
export const permissionDescriptions: Record<Permission, string> = {
  view_dashboard: 'View main dashboard and metrics',
  view_alerts: 'View security alerts',
  manage_alerts: 'Acknowledge, assign, and resolve alerts',
  create_notes: 'Add notes to cases and alerts',
  manage_cases: 'Create, edit, and close investigation cases',
  assign_tasks: 'Assign tasks to team members',
  view_threat_intel: 'View threat intelligence data',
  manage_threat_intel: 'Add and modify threat indicators',
  view_vulnerabilities: 'View vulnerability scan results',
  manage_vulnerabilities: 'Initiate scans and manage remediation',
  view_compliance: 'View compliance status and reports',
  manage_compliance: 'Configure compliance frameworks',
  view_forensics: 'View forensic cases and evidence',
  manage_forensics: 'Manage forensic investigations',
  view_network: 'View network traffic and analysis',
  manage_network: 'Configure network monitoring',
  view_endpoints: 'View endpoint security status',
  manage_endpoints: 'Manage endpoint policies',
  view_iam: 'View identity and access data',
  manage_iam: 'Manage user access and permissions',
  view_dlp: 'View DLP events and policies',
  manage_dlp: 'Configure DLP policies',
  view_reports: 'View generated reports',
  generate_reports: 'Create new reports',
  export_data: 'Export data from the platform',
  manage_users: 'Create, edit, and deactivate users',
  configure_system: 'Modify system configuration',
  manage_integrations: 'Configure security tool integrations',
  all_permissions: 'Full system access'
};

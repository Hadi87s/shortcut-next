import type { RoutePermission } from './types'

/**
 * Centralized route to permission mapping
 *
 * Pattern types supported:
 * - Exact: '/dashboard' matches only '/dashboard'
 * - Dynamic: '/users/[id]' matches '/users/123', '/users/abc'
 * - Wildcard: '/settings/*' matches '/settings/profile', '/settings/a/b/c'
 *
 * To add a new protected route:
 * 1. Add an entry here with the pattern, action, and subject
 * 2. That's it - middleware handles the rest
 */
export const routePermissions: RoutePermission[] = [
  // Dashboard - accessible to all authenticated users
  {
    pattern: '/dashboard',
    action: 'read',
    subject: 'Dashboard',
    description: 'Main dashboard page',
  },

  // Users management - manager and admin only
  {
    pattern: '/dashboard/users',
    action: 'read',
    subject: 'Users',
    description: 'Users list page',
  },
  {
    pattern: '/dashboard/users/[id]',
    action: 'read',
    subject: 'Users',
    description: 'User detail page',
  },
  {
    pattern: '/dashboard/users/[id]/edit',
    action: 'update',
    subject: 'Users',
    description: 'Edit user page',
  },
  {
    pattern: '/dashboard/users/new',
    action: 'create',
    subject: 'Users',
    description: 'Create user page',
  },

  // Settings - admin only
  {
    pattern: '/dashboard/settings',
    action: 'manage',
    subject: 'Settings',
    description: 'Application settings',
  },
  {
    pattern: '/dashboard/settings/*',
    action: 'manage',
    subject: 'Settings',
    description: 'Nested settings pages',
  },

  // Reports - viewer and above
  {
    pattern: '/dashboard/reports',
    action: 'read',
    subject: 'Reports',
    description: 'Reports overview',
  },
  {
    pattern: '/dashboard/reports/*',
    action: 'read',
    subject: 'Reports',
    description: 'Report detail pages',
  },

  // Tickets - agent and above
  {
    pattern: '/dashboard/tickets',
    action: 'read',
    subject: 'Tickets',
    description: 'Tickets list',
  },
  {
    pattern: '/dashboard/tickets/[id]',
    action: 'read',
    subject: 'Tickets',
    description: 'Ticket detail',
  },
  {
    pattern: '/dashboard/tickets/[id]/edit',
    action: 'update',
    subject: 'Tickets',
    description: 'Edit ticket page',
  },
  {
    pattern: '/dashboard/tickets/new',
    action: 'create',
    subject: 'Tickets',
    description: 'Create ticket page',
  },
]

/**
 * Public routes that don't require authentication
 * These bypass all auth checks
 */
export const publicRoutes: string[] = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/pricing',
  '/unauthorized',
]

/**
 * Routes that only require authentication (any role can access)
 * No specific permission check needed
 */
export const authenticatedOnlyRoutes: string[] = [
  '/dashboard',
]

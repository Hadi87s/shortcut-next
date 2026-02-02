import type { UserRole, Actions, Subjects } from './types'
import { matchRoute, isPublicRoute, isAuthenticatedOnlyRoute } from './routeMatcher'
import { canAccess } from './roles'

/**
 * Result of an authorization check
 */
export interface AuthorizationResult {
  /** Whether access is authorized */
  authorized: boolean
  /** Reason for the result */
  reason?: 'unauthenticated' | 'forbidden' | 'public' | 'authenticated'
  /** The action that was required (for forbidden results) */
  requiredAction?: Actions
  /** The subject that was required (for forbidden results) */
  requiredSubject?: Subjects
}

/**
 * Check if a user can access a given pathname
 *
 * This is the main authorization orchestration function.
 * It checks:
 * 1. If the route is public (always allowed)
 * 2. If the user is authenticated
 * 3. If the route has specific permissions and user satisfies them
 *
 * @param pathname - The URL pathname to check
 * @param userRole - The user's role, or null if not authenticated
 * @returns AuthorizationResult with authorized status and reason
 */
export function checkAuthorization(
  pathname: string,
  userRole: UserRole | null
): AuthorizationResult {
  // 1. Public routes - always allowed
  if (isPublicRoute(pathname)) {
    return { authorized: true, reason: 'public' }
  }

  // 2. No user = unauthenticated
  if (!userRole) {
    return { authorized: false, reason: 'unauthenticated' }
  }

  // 3. Routes that only need authentication (no specific permission)
  if (isAuthenticatedOnlyRoute(pathname)) {
    return { authorized: true, reason: 'authenticated' }
  }

  // 4. Check route-specific permissions
  const matched = matchRoute(pathname)

  // No matching route permission = allow by default
  // This means the route exists but has no specific permission requirement
  if (!matched) {
    return { authorized: true, reason: 'authenticated' }
  }

  const { permission } = matched
  const hasPermission = canAccess(userRole, permission.action, permission.subject)

  if (hasPermission) {
    return { authorized: true }
  }

  // User doesn't have required permission
  return {
    authorized: false,
    reason: 'forbidden',
    requiredAction: permission.action,
    requiredSubject: permission.subject,
  }
}

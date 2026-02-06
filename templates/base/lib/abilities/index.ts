// Types
export type {
  Subjects,
  Actions,
  AppAbility,
  AuthUser,
  UserRole,
  RoutePermission,
  MatchedRoute,
} from './types'

// Role definitions
export { defineAbilitiesFor, canAccess } from './roles'

// Route configuration
export { routePermissions, publicRoutes, authenticatedOnlyRoutes } from './routeMap'

// Route matching
export {
  matchRoute,
  isPublicRoute,
  isAuthenticatedOnlyRoute,
  isProtectedRoute,
} from './routeMatcher'

// Authorization check
export { checkAuthorization, type AuthorizationResult } from './checkAuthorization'

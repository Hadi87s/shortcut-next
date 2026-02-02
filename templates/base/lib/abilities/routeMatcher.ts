import type { MatchedRoute } from './types'
import { routePermissions, publicRoutes, authenticatedOnlyRoutes } from './routeMap'

/**
 * Convert route pattern to regex for matching
 *
 * Handles:
 * - [param] → named capture group (?<param>[^/]+)
 * - /* → wildcard match (?:/.*)?
 * - Escapes other regex special characters
 */
function patternToRegex(pattern: string): RegExp {
  const regexStr = pattern
    // Escape special regex characters (except [ ] and *)
    .replace(/[.+?^${}()|\\]/g, '\\$&')
    // Convert [param] to named capture group
    .replace(/\[(\w+)\]/g, '(?<$1>[^/]+)')
    // Convert /* wildcard to match anything after
    .replace(/\/\*$/, '(?:/.*)?')

  return new RegExp(`^${regexStr}$`)
}

/**
 * Calculate match priority score
 * Higher score = more specific match
 *
 * - Exact matches get highest priority
 * - Dynamic segments get medium priority
 * - Wildcards get lowest priority
 */
function getMatchScore(pattern: string): number {
  let score = 100

  // Count dynamic segments (lower score)
  const dynamicCount = (pattern.match(/\[\w+\]/g) || []).length
  score -= dynamicCount * 10

  // Wildcard patterns get lowest score
  if (pattern.endsWith('/*')) {
    score -= 50
  }

  return score
}

/**
 * Match a pathname against all route patterns
 *
 * @param pathname - The URL pathname to match
 * @returns MatchedRoute with permission and params, or null if no match
 */
export function matchRoute(pathname: string): MatchedRoute | null {
  const matches: Array<{ route: MatchedRoute; score: number }> = []

  for (const permission of routePermissions) {
    const regex = patternToRegex(permission.pattern)
    const match = pathname.match(regex)

    if (match) {
      matches.push({
        route: {
          permission,
          params: match.groups || {},
        },
        score: getMatchScore(permission.pattern),
      })
    }
  }

  // Return highest scoring match (most specific)
  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score)
    return matches[0].route
  }

  return null
}

/**
 * Check if a route is public (no auth required)
 *
 * @param pathname - The URL pathname to check
 * @returns true if the route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    // Exact match
    if (pathname === route) return true

    // Check if pathname starts with public route (for sub-paths)
    // e.g., /about matches /about/team
    if (pathname.startsWith(route + '/')) return true

    return false
  })
}

/**
 * Check if route only requires authentication (no specific permission)
 *
 * @param pathname - The URL pathname to check
 * @returns true if route just needs auth, no specific permission
 */
export function isAuthenticatedOnlyRoute(pathname: string): boolean {
  return authenticatedOnlyRoutes.includes(pathname)
}

/**
 * Check if route is protected (has specific permission requirements)
 *
 * @param pathname - The URL pathname to check
 * @returns true if route has permission requirements
 */
export function isProtectedRoute(pathname: string): boolean {
  return matchRoute(pathname) !== null
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwt } from 'jose'
import { checkAuthorization, isPublicRoute } from '@/lib/abilities'
import type { UserRole } from '@/lib/abilities'

/**
 * Cookie name for access token
 * Must match the value in clientConfig.ts
 */
const ACCESS_TOKEN_COOKIE = 'accessToken'

/**
 * Routes that middleware should skip entirely
 * These are static assets and API routes handled elsewhere
 */
const SKIP_ROUTES = ['/_next', '/api', '/favicon.ico', '/locales', '/images']

/**
 * Valid user roles for type checking
 */
const VALID_ROLES: UserRole[] = ['admin', 'manager', 'agent', 'viewer']

/**
 * JWT payload structure expected from the auth system
 */
interface JWTPayload {
  sub: string
  email?: string
  role?: string
  name?: string
  exp?: number
  iat?: number
}

/**
 * Extract user role from JWT token
 *
 * Note: This only decodes the JWT, it does NOT verify the signature.
 * Signature verification should happen in API routes.
 * Middleware decoding is for early rejection of clearly unauthorized requests.
 *
 * @param token - JWT access token
 * @returns UserRole if valid, null otherwise
 */
function getUserRoleFromToken(token: string): UserRole | null {
  try {
    const payload = decodeJwt(token) as JWTPayload

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    // Validate and return role
    const role = payload.role as UserRole
    if (VALID_ROLES.includes(role)) {
      return role
    }

    // Default to viewer if no valid role found
    return 'viewer'
  } catch {
    // Invalid JWT format
    return null
  }
}

/**
 * Next.js Middleware
 *
 * This is the primary enforcement point for authorization.
 * It runs before any page renders, on the Edge Runtime.
 *
 * Flow:
 * 1. Skip static assets and API routes
 * 2. Allow public routes without auth
 * 3. Extract session from cookie
 * 4. Check authorization
 * 5. Redirect if unauthorized
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets and API routes
  if (SKIP_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Quick check: allow public routes without token lookup
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Get token from cookie
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  const userRole = token ? getUserRoleFromToken(token) : null

  // Check authorization
  const result = checkAuthorization(pathname, userRole)

  if (result.authorized) {
    return NextResponse.next()
  }

  // Handle unauthorized access
  if (result.reason === 'unauthenticated') {
    // Redirect to login with return URL
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (result.reason === 'forbidden') {
    // Redirect to unauthorized page with context
    const unauthorizedUrl = new URL('/unauthorized', request.url)
    unauthorizedUrl.searchParams.set('from', pathname)
    if (result.requiredSubject) {
      unauthorizedUrl.searchParams.set('resource', result.requiredSubject)
    }
    if (result.requiredAction) {
      unauthorizedUrl.searchParams.set('action', result.requiredAction)
    }
    return NextResponse.redirect(unauthorizedUrl)
  }

  return NextResponse.next()
}

/**
 * Middleware matcher configuration
 *
 * Excludes:
 * - _next/static (static files)
 * - _next/image (image optimization)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decodeJwt } from 'jose'
import type { UserRole } from '@/lib/abilities'

/**
 * JWT payload structure
 */
interface JWTPayload {
  sub: string
  email?: string
  role?: string
  name?: string
  exp?: number
}

/**
 * Session data extracted from JWT
 */
interface Session {
  userId: string
  role: UserRole
  name?: string
  email?: string
}

/**
 * Extract session from cookies (server-side)
 *
 * This is the defense-in-depth check that runs in addition to middleware.
 * It ensures no protected content is ever rendered without a valid session.
 */
async function getServerSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return null
  }

  try {
    const payload = decodeJwt(token) as JWTPayload

    // Check expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    const validRoles: UserRole[] = ['admin', 'manager', 'agent', 'viewer']
    const role = validRoles.includes(payload.role as UserRole)
      ? (payload.role as UserRole)
      : 'viewer'

    return {
      userId: payload.sub,
      role,
      name: payload.name,
      email: payload.email,
    }
  } catch {
    return null
  }
}

/**
 * Dashboard Layout
 *
 * This is a Server Component that provides defense-in-depth for all dashboard routes.
 * Even if middleware is bypassed, this layout ensures no protected content renders
 * without a valid session.
 *
 * The layout wraps all routes in the (dashboard) route group.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  // Defense-in-depth: redirect if no session
  // This should rarely trigger since middleware handles it first
  if (!session) {
    redirect('/login?returnUrl=/dashboard')
  }

  return (
    <div className="dashboard-layout">
      {/*
        Add dashboard navigation/sidebar here
        Navigation items can be filtered based on session.role
        using the useAbility hook in client components
      */}
      <main className="dashboard-content">{children}</main>
    </div>
  )
}

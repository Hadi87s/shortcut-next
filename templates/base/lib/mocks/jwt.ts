/**
 * Mock JWT utilities for development
 *
 * Creates JWTs that can be decoded by the middleware.
 * In production, JWTs should be created and signed by your backend.
 */

import type { UserRole } from '@/lib/abilities'

interface TokenPayload {
  sub: string
  email: string
  name: string
  role: UserRole
  iat: number
  exp: number
}

/**
 * Create a mock JWT token
 *
 * This creates a valid JWT structure that can be decoded.
 * Note: This is NOT cryptographically signed - for development only.
 */
export function createMockAccessToken(user: {
  id: string
  email: string
  name: string
  role: UserRole
}): string {
  const header = { alg: 'HS256', typ: 'JWT' }

  const payload: TokenPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
  }

  const base64Header = base64UrlEncode(JSON.stringify(header))
  const base64Payload = base64UrlEncode(JSON.stringify(payload))
  const mockSignature = base64UrlEncode('mock_signature_for_development')

  return `${base64Header}.${base64Payload}.${mockSignature}`
}

/**
 * Create a mock refresh token
 */
export function createMockRefreshToken(userId: string): string {
  const payload = {
    sub: userId,
    type: 'refresh',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 days
  }

  const header = { alg: 'HS256', typ: 'JWT' }
  const base64Header = base64UrlEncode(JSON.stringify(header))
  const base64Payload = base64UrlEncode(JSON.stringify(payload))
  const mockSignature = base64UrlEncode('mock_refresh_signature')

  return `${base64Header}.${base64Payload}.${mockSignature}`
}

/**
 * Decode a JWT token (without verification)
 */
export function decodeMockToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = JSON.parse(base64UrlDecode(parts[1]))
    return payload
  } catch {
    return null
  }
}

/**
 * Base64 URL encode
 */
function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Base64 URL decode
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  return atob(base64)
}

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Container, Typography, TextField, Button, Paper, Alert, Divider, Stack, Chip } from '@mui/material'
import { LogIn, Shield, User, UserCog, Headset, Eye } from 'lucide-react'
import { useAuth } from '@/@core/context/AuthContext'
import { Suspense } from 'react'

/**
 * Test users for development
 * In production, remove this and use real authentication
 */
const TEST_USERS = [
  {
    role: 'admin',
    label: 'Admin',
    description: 'Full access to everything',
    icon: Shield,
    color: 'error'
  },
  {
    role: 'manager',
    label: 'Manager',
    description: 'Manage users, tickets, reports',
    icon: UserCog,
    color: 'warning'
  },
  {
    role: 'agent',
    label: 'Agent',
    description: 'Handle tickets and view reports',
    icon: Headset,
    color: 'info'
  },
  {
    role: 'viewer',
    label: 'Viewer',
    description: 'View dashboard and reports only',
    icon: Eye,
    color: 'success'
  }
] as const

/**
 * Create a mock JWT for testing
 * This simulates what a real backend would return
 *
 * WARNING: This is for DEVELOPMENT ONLY
 * In production, JWTs should be created and signed by your backend
 */
function createMockJWT(user: { id: string; email: string; name: string; role: string }): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
  }

  // Base64URL encode (this is a mock - real JWTs need proper signing)
  const base64Header = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const base64Payload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const mockSignature = 'mock_signature_for_development_only'

  return `${base64Header}.${base64Payload}.${mockSignature}`
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser, setLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const returnUrl = searchParams.get('returnUrl') || '/dashboard'

  /**
   * Simulate login with a test user role
   * This sets the JWT cookie that middleware reads
   */
  const handleTestLogin = (role: string) => {
    const testUser = {
      id: `test-${role}-${Date.now()}`,
      email: `${role}@test.com`,
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role
    }

    // Create mock JWT
    const token = createMockJWT(testUser)

    // Store in localStorage (for AuthContext)
    localStorage.setItem('accessToken', token)
    localStorage.setItem('userData', JSON.stringify(testUser))

    // Set cookie (for middleware - this is the critical part!)
    document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`

    // Update auth state
    setUser(testUser)
    setLoading(false)

    // Redirect to dashboard or return URL
    router.push(returnUrl)
  }

  /**
   * Handle real login form submission
   * This would call your actual auth API
   */
  const handleRealLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    // TODO: Replace with actual API call
    // const { login } = useAuth()
    // await login({ email, password }, (err) => setError(err))

    setError('Real authentication not configured. Use test login buttons below.')
  }

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'primary.lighter',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <LogIn size={28} />
            </Box>
            <Typography variant='h5' fontWeight={700}>
              Sign In
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Enter your credentials to access your account
            </Typography>
          </Box>

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleRealLogin}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='your@email.com'
              />
              <TextField
                fullWidth
                label='Password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='••••••••'
              />
              <Button type='submit' variant='contained' size='large' fullWidth startIcon={<User size={18} />}>
                Sign In
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 4 }}>
            <Chip label='Or test with a role' size='small' />
          </Divider>

          <Typography variant='body2' color='text.secondary' sx={{ mb: 2, textAlign: 'center' }}>
            Click a role to simulate login (development only)
          </Typography>

          <Stack spacing={1.5}>
            {TEST_USERS.map(testUser => (
              <Button
                key={testUser.role}
                variant='outlined'
                fullWidth
                onClick={() => handleTestLogin(testUser.role)}
                startIcon={<testUser.icon size={18} />}
                color={testUser.color as 'error' | 'warning' | 'info' | 'success'}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none'
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant='body2' fontWeight={600}>
                    {testUser.label}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {testUser.description}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Stack>

          <Typography variant='caption' color='text.disabled' sx={{ display: 'block', textAlign: 'center', mt: 3 }}>
            Test logins are for development only. Remove in production.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

/**
 * Login Page
 *
 * Provides both real login form and test login buttons for development.
 * Test logins create mock JWTs with different roles to test authorization.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth='sm'>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      }
    >
      <LoginContent />
    </Suspense>
  )
}

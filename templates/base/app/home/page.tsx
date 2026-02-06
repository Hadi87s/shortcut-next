'use client'

import { Container, Typography, Paper, Box, Chip, Button } from '@mui/material'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/@core/context/AuthContext'
import { useCan } from '@/@core/hooks/useAbility'

// Role-specific home components
function AdminHome() {
  return (
    <Paper sx={{ p: 4, bgcolor: 'error.50', border: '2px solid', borderColor: 'error.main' }}>
      <Typography variant='h5' color='error.main' gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Welcome, Admin! You have full access to all system features including user management, settings, reports, and
        tickets.
      </Typography>
    </Paper>
  )
}

function ManagerHome() {
  return (
    <Paper sx={{ p: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.main' }}>
      <Typography variant='h5' color='warning.main' gutterBottom>
        Manager Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Welcome, Manager! You can manage users, tickets, and reports. Settings are restricted to admins.
      </Typography>
    </Paper>
  )
}

function AgentHome() {
  return (
    <Paper sx={{ p: 4, bgcolor: 'info.50', border: '2px solid', borderColor: 'info.main' }}>
      <Typography variant='h5' color='info.main' gutterBottom>
        Agent Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Welcome, Agent! You can handle tickets and view reports. User management and settings are restricted.
      </Typography>
    </Paper>
  )
}

function ViewerHome() {
  return (
    <Paper sx={{ p: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.main' }}>
      <Typography variant='h5' color='success.main' gutterBottom>
        Viewer Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Welcome, Viewer! You have read-only access to the dashboard and reports.
      </Typography>
    </Paper>
  )
}

export default function HomePage() {
  const { user, logout } = useAuth()

  // Use CASL abilities to determine which component to render
  // Each check is based on unique permissions for that role
  const canManageSettings = useCan('manage', 'Settings') // Only admin
  const canManageUsers = useCan('manage', 'Users') // Admin & Manager
  const canManageTickets = useCan('manage', 'Tickets') // Admin, Manager & Agent

  // Determine the appropriate component based on abilities (most privileged first)
  const getRoleInfo = () => {
    if (canManageSettings) {
      return { Component: AdminHome, label: 'ADMIN', color: 'error' as const }
    }
    if (canManageUsers) {
      return { Component: ManagerHome, label: 'MANAGER', color: 'warning' as const }
    }
    if (canManageTickets) {
      return { Component: AgentHome, label: 'AGENT', color: 'info' as const }
    }
    return { Component: ViewerHome, label: 'VIEWER', color: 'success' as const }
  }

  const { Component: RoleComponent, label, color } = getRoleInfo()

  const handleLogout = () => {
    logout()
  }

  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant='h3' gutterBottom>
          Welcome Home
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
          Hello, {user?.name || 'User'}!
        </Typography>
        <Chip label={label} color={color} size='medium' />
      </Box>

      <RoleComponent />

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant='outlined' color='error' startIcon={<LogOut size={18} />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  )
}

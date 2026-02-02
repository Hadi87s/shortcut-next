'use client'

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { Users, Ticket, Settings, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const dashboardCards = [
  {
    title: 'Users',
    description: 'Manage system users',
    icon: Users,
    href: '/dashboard/users',
    color: 'primary',
    roles: ['admin', 'manager']
  },
  {
    title: 'Tickets',
    description: 'View and manage tickets',
    icon: Ticket,
    href: '/dashboard/tickets',
    color: 'secondary',
    roles: ['admin', 'manager', 'agent']
  },
  {
    title: 'Reports',
    description: 'View analytics and reports',
    icon: BarChart3,
    href: '/dashboard/reports',
    color: 'info',
    roles: ['admin', 'manager', 'agent', 'viewer']
  },
  {
    title: 'Settings',
    description: 'Configure application settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'warning',
    roles: ['admin']
  }
]

/**
 * Dashboard Home Page
 *
 * This page is accessible to all authenticated users.
 * The navigation cards shown here are just examples -
 * actual access control is enforced by middleware.
 */
export default function DashboardPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Welcome to your dashboard. Select a section to get started.
      </Typography>

      <Grid container spacing={3}>
        {dashboardCards.map(card => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
            <Card
              component={Link}
              href={card.href}
              sx={{
                height: '100%',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: `${card.color}.lighter`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <card.icon size={28} />
                </Box>
                <Typography variant='h6' fontWeight={600}>
                  {card.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

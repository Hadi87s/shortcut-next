'use client'

import { Box, Container, Typography, Paper } from '@mui/material'
import { Users } from 'lucide-react'

/**
 * Users List Page
 *
 * Access: admin, manager
 * This page displays a list of users in the system.
 */
export default function UsersPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'primary.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Users size={24} />
        </Box>
        <Box>
          <Typography variant='h4' fontWeight={700}>
            Users
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Manage system users
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant='body1' color='text.secondary'>
          User list will be displayed here. This page requires manager or admin role.
        </Typography>
      </Paper>
    </Container>
  )
}

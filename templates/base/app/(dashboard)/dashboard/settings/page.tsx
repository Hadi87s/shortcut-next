'use client'

import { Box, Container, Typography, Paper } from '@mui/material'
import { Settings } from 'lucide-react'

/**
 * Settings Page
 *
 * Access: admin only
 * This page displays application settings.
 */
export default function SettingsPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'warning.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Settings size={24} />
        </Box>
        <Box>
          <Typography variant='h4' fontWeight={700}>
            Settings
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Configure application settings
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant='body1' color='text.secondary'>
          Application settings will be displayed here. This page requires admin role.
        </Typography>
      </Paper>
    </Container>
  )
}

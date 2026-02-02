'use client'

import { Box, Container, Typography, Paper } from '@mui/material'
import { BarChart3 } from 'lucide-react'

/**
 * Reports Page
 *
 * Access: admin, manager, agent, viewer
 * This page displays analytics and reports.
 */
export default function ReportsPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'info.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <BarChart3 size={24} />
        </Box>
        <Box>
          <Typography variant='h4' fontWeight={700}>
            Reports
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            View analytics and reports
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant='body1' color='text.secondary'>
          Reports and analytics will be displayed here. This page is accessible to all authenticated users.
        </Typography>
      </Paper>
    </Container>
  )
}

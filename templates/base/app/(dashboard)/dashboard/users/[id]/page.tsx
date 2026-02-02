'use client'

import { useParams } from 'next/navigation'
import { Box, Container, Typography, Paper, Chip } from '@mui/material'
import { User } from 'lucide-react'

/**
 * User Detail Page
 *
 * Access: admin, manager
 * This page displays details for a specific user.
 */
export default function UserDetailPage() {
  const params = useParams()
  const id = params.id as string

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
          <User size={24} />
        </Box>
        <Box>
          <Typography variant='h4' fontWeight={700}>
            User Details
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant='body2' color='text.secondary'>
              Viewing user
            </Typography>
            <Chip label={`ID: ${id}`} size='small' />
          </Box>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant='body1' color='text.secondary'>
          User details for ID: {id} will be displayed here.
        </Typography>
      </Paper>
    </Container>
  )
}

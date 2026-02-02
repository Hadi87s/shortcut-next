import { Box, Container, Typography, Paper } from '@mui/material'
import { Ticket } from 'lucide-react'

/**
 * Tickets List Page
 *
 * Access: admin, manager, agent
 * This page displays a list of tickets/support requests.
 */
export default function TicketsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'secondary.lighter',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ticket size={24} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Tickets
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage support tickets
          </Typography>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Ticket list will be displayed here. This page requires agent, manager, or admin role.
        </Typography>
      </Paper>
    </Container>
  )
}

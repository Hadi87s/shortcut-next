import { Box, Container, Typography, Paper, Chip } from '@mui/material'
import { Ticket } from 'lucide-react'

interface TicketDetailPageProps {
  params: Promise<{
    id: string
  }>
}

/**
 * Ticket Detail Page
 *
 * Access: admin, manager, agent
 * This page displays details for a specific ticket.
 */
export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params

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
            Ticket Details
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Viewing ticket
            </Typography>
            <Chip label={`#${id}`} size="small" color="secondary" />
          </Box>
        </Box>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Ticket details for #{id} will be displayed here.
        </Typography>
      </Paper>
    </Container>
  )
}

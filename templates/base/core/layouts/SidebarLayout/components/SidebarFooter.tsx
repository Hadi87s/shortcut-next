'use client'

import type { ReactNode } from 'react'
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import { useSidebar } from '../SidebarContext'
import { hexToRGBA } from '@/core/utils/hex-to-rgba'

interface SidebarFooterProps {
  footer?: ReactNode
}

// ?: Change this component into whatever you want to show in the sidebar footer.
// ?: By default, it shows a simple promo card for Shortcut Next,
// ?: but you can replace it with anything (e.g. links, user profile, etc.)
function DefaultPromoCard() {
  return (
    <Card
      variant='outlined'
      sx={{
        mx: 1.5,
        mb: 1.5,
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        bgcolor: theme => hexToRGBA(theme.palette.primary.main, 0.1)
      }}
    >
      <CardContent sx={{ p: '12px !important' }}>
        <Typography variant='caption' fontWeight={700} color='primary.main' display='block' gutterBottom>
          Shortcut Next
        </Typography>
        <Typography variant='caption' color='text.secondary' display='block' sx={{ mb: 1.25, lineHeight: 1.5 }}>
          Save time, start in the middle.
        </Typography>
        <Button
          variant='outlined'
          color='primary'
          size='small'
          fullWidth
          href='https://github.com/Hadi87s/shortcut-next'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 600, fontSize: 12 }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  )
}

export default function SidebarFooter({ footer }: SidebarFooterProps) {
  const { isCollapsed } = useSidebar()

  return (
    <Box
      sx={{
        flexShrink: 0,
        overflow: 'hidden',
        maxHeight: isCollapsed ? 0 : 300,
        opacity: isCollapsed ? 0 : 1,
        // No delay when collapsing, delay when expanding so sidebar finishes first
        transition: isCollapsed
          ? 'max-height 0.2s ease, opacity 0.15s ease'
          : 'max-height 0.25s ease 0.3s, opacity 0.2s ease 0.35s'
      }}
    >
      <Divider />
      <Box sx={{ pt: 1 }}>{footer ?? <DefaultPromoCard />}</Box>
    </Box>
  )
}

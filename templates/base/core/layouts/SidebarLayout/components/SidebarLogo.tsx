'use client'

import type { ReactNode } from 'react'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useSidebar } from '../SidebarContext'

interface SidebarLogoProps {
  logo?: ReactNode
  appName?: string
}

export default function SidebarLogo({ logo, appName = 'Shortcut Next' }: SidebarLogoProps) {
  const { isCollapsed, setIsMobileOpen } = useSidebar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        flexShrink: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      {/* Logo mark — always visible in both collapsed and expanded states */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'primary.contrastText',
          fontWeight: 700,
          fontSize: 13
        }}
      >
        {logo ?? 'SN'}
      </Box>

      {/* App name — slides in from left on expand, exits left on collapse */}
      <AnimatePresence initial={false}>
        {(!isCollapsed || isMobile) && (
          <motion.div
            key='app-name'
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
          >
            <Typography variant='subtitle2' fontWeight={700} noWrap>
              {appName}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile close button — only on mobile; desktop toggle is the floating border button */}
      {isMobile && (
        <IconButton onClick={() => setIsMobileOpen(false)} size='small' sx={{ flexShrink: 0, ml: 'auto' }}>
          <X size={18} />
        </IconButton>
      )}
    </Box>
  )
}

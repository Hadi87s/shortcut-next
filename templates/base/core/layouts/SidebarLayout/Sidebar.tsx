'use client'

import type { ReactNode } from 'react'
import { Box, Drawer, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from './SidebarContext'
import { useSettings } from '@/core/hooks/useSettings'
import SidebarLogo from './components/SidebarLogo'
import NavItems from './components/NavItems'
import SidebarFooter from './components/SidebarFooter'
import type { SidebarNavItems } from '@/core/layouts/types'

export const SIDEBAR_WIDTH = 260
export const SIDEBAR_COLLAPSED_WIDTH = 72

const sidebarVariants = {
  expanded: {
    width: SIDEBAR_WIDTH,
    transition: { type: 'tween' as const, duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
  },
  collapsed: {
    width: SIDEBAR_COLLAPSED_WIDTH,
    transition: { type: 'tween' as const, duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
  }
}

interface SidebarProps {
  navItems: SidebarNavItems
  logo?: ReactNode
  appName?: string
  footer?: ReactNode
}

function SidebarContent({ navItems, logo, appName, footer }: SidebarProps) {
  const { settings } = useSettings()
  const isRtl = settings.direction === 'rtl'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRight: isRtl ? 'none' : '1px solid',
        borderLeft: isRtl ? '1px solid' : 'none',
        borderColor: 'divider'
      }}
    >
      <SidebarLogo logo={logo} appName={appName} />

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 2,
            bgcolor: 'action.disabled'
          }
        }}
      >
        <NavItems items={navItems} />
      </Box>

      <SidebarFooter footer={footer} />
    </Box>
  )
}

export function Sidebar({ navItems, logo, appName, footer }: SidebarProps) {
  const { isCollapsed, isMobileOpen, setIsMobileOpen, toggleCollapsed } = useSidebar()
  const { settings } = useSettings()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isRtl = settings.direction === 'rtl'

  if (isMobile) {
    return (
      <Drawer
        variant='temporary'
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        anchor={isRtl ? 'right' : 'left'}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <SidebarContent navItems={navItems} logo={logo} appName={appName} footer={footer} />
      </Drawer>
    )
  }

  return (
    <motion.div
      initial={isCollapsed ? 'collapsed' : 'expanded'}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        [isRtl ? 'right' : 'left']: 0,
        zIndex: theme.zIndex.drawer,
        overflow: 'visible',
        flexShrink: 0
      }}
    >
      <SidebarContent navItems={navItems} logo={logo} appName={appName} footer={footer} />

      {/* Floating toggle button — sits on the sidebar border, vertically centred */}
      <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement={isRtl ? 'left' : 'right'} arrow>
        <IconButton
          onClick={toggleCollapsed}
          size='small'
          sx={{
            position: 'absolute',
            top: 30,
            [isRtl ? 'left' : 'right']: -12,
            transform: 'translateY(-50%)',
            width: 24,
            height: 24,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '50%',
            boxShadow: 1,
            zIndex: 1,
            '&:hover': { bgcolor: 'background.default' }
          }}
        >
          {isCollapsed ? (
            isRtl ? (
              <ChevronLeft size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : isRtl ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </IconButton>
      </Tooltip>
    </motion.div>
  )
}

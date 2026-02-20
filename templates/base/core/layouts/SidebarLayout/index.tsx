'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Menu } from 'lucide-react'
import { SidebarProvider, useSidebar } from './SidebarContext'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './Sidebar'
import { useSettings } from '@/core/hooks/useSettings'
import type { SidebarNavItems } from '@/core/layouts/types'

interface SidebarLayoutProps {
  children: ReactNode
  navItems: SidebarNavItems
  logo?: ReactNode
  appName?: string
  footer?: ReactNode
}

function SidebarLayoutInner({ children, navItems, logo, appName, footer }: SidebarLayoutProps) {
  const { isCollapsed, isMobileOpen, toggleMobileOpen, setIsCollapsed, setIsMobileOpen } = useSidebar()
  const { settings } = useSettings()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isRtl = settings.direction === 'rtl'

  // Reset sidebar states when switching between mobile and desktop
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false)
    } else {
      setIsMobileOpen(false)
    }
  }, [isMobile, setIsCollapsed, setIsMobileOpen])

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Sidebar navItems={navItems} logo={logo} appName={appName} footer={footer} />

      {/* Mobile hamburger — only show when the drawer is closed */}
      {isMobile && !isMobileOpen && (
        <IconButton
          onClick={toggleMobileOpen}
          size='small'
          sx={{
            position: 'fixed',
            top: 12,
            [isRtl ? 'right' : 'left']: 12,
            zIndex: theme.zIndex.drawer - 1,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            '&:hover': { bgcolor: 'background.default' }
          }}
        >
          <Menu size={18} />
        </IconButton>
      )}

      {/* Content area — shifts to accommodate the sidebar on desktop */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          minWidth: 0,
          mt: 2,
          [isRtl ? 'marginRight' : 'marginLeft']: isMobile ? 0 : `${sidebarWidth}px`,
          transition: theme.transitions.create(isRtl ? 'margin-right' : 'margin-left', {
            duration: 300,
            easing: theme.transitions.easing.easeInOut
          })
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarLayoutInner {...props} />
    </SidebarProvider>
  )
}

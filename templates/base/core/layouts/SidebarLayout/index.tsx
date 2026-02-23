'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Menu } from 'lucide-react'
import { SidebarProvider, useSidebar } from './SidebarContext'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './Sidebar'
import { NavActiveProvider } from './NavActiveContext'
import type { SidebarNavItems } from '@/core/layouts/types'

interface SidebarLayoutProps {
  children: ReactNode
  navItems: SidebarNavItems
  dynamicNavItems?: SidebarNavItems
  logo?: ReactNode
  appName?: string
  footer?: ReactNode
}

function SidebarLayoutInner({ children, navItems, dynamicNavItems, logo, appName, footer }: SidebarLayoutProps) {
  const { isCollapsed, isMobileOpen, toggleMobileOpen, setIsCollapsed, setIsMobileOpen } = useSidebar()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const mergedNavItems = [...navItems, ...(dynamicNavItems ?? [])]

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
    <NavActiveProvider navItems={mergedNavItems}>
      <Stack
        direction='row'
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <Sidebar navItems={mergedNavItems} logo={logo} appName={appName} footer={footer} />

        {/* Mobile hamburger — only show when the drawer is closed */}
        {isMobile && !isMobileOpen && (
          <IconButton
            onClick={toggleMobileOpen}
            size='small'
            sx={{
              position: 'fixed',
              top: 12,
              left: 12,
              zIndex: theme.zIndex.drawer - 1,
              '&:hover': { bgcolor: 'background.default' }
            }}
          >
            <Menu size={18} />
          </IconButton>
        )}

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            minWidth: 0,
            mt: 3,
            px: 3,
            marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
            transition: theme.transitions.create('margin-left', {
              duration: 300,
              easing: theme.transitions.easing.easeInOut
            })
          }}
        >
          {children}
        </Box>
      </Stack>
    </NavActiveProvider>
  )
}

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarLayoutInner {...props} />
    </SidebarProvider>
  )
}

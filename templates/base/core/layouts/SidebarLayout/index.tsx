'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Menu } from 'lucide-react'
import { SidebarProvider, useSidebar } from './SidebarContext'
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './Sidebar'
import { ActiveRouteProvider } from './ActiveRouteContext'
import { FavoritesProvider } from './FavoritesContext'
import type { SidebarNavItems } from '@/core/layouts/types'
import useLanguage from '@/core/hooks/useLanguage'
import CommandPalette from './components/CommandPalette'

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
  const { language } = useLanguage()
  const isRtl = language === 'ar'
  const mergedNavItems = [...navItems, ...(dynamicNavItems ?? [])]

  const [paletteOpen, setPaletteOpen] = useState(false)

  // Reset sidebar states when switching between mobile and desktop
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false)
    } else {
      setIsMobileOpen(false)
    }
  }, [isMobile, setIsCollapsed, setIsMobileOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH

  return (
    <ActiveRouteProvider navItems={mergedNavItems}>
      <Stack
        direction='row'
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <FavoritesProvider>
          <Sidebar navItems={mergedNavItems} logo={logo} appName={appName} footer={footer} />
        </FavoritesProvider>

        {/* Mobile hamburger — only show when the drawer is closed */}
        {isMobile && !isMobileOpen && (
          <IconButton
            onClick={toggleMobileOpen}
            size='small'
            sx={{
              position: 'fixed',
              top: 12,
              ...(isRtl ? { right: 12 } : { left: 12 }),
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
            marginLeft: isMobile || isRtl ? 0 : `${sidebarWidth}px`,
            marginRight: isMobile || !isRtl ? 0 : `${sidebarWidth}px`,
            transition: theme.transitions.create(isRtl ? 'margin-right' : 'margin-left', {
              duration: 300,
              easing: theme.transitions.easing.easeInOut
            })
          }}
        >
          {children}
        </Box>
      </Stack>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} navItems={mergedNavItems} />
    </ActiveRouteProvider>
  )
}

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarLayoutInner {...props} />
    </SidebarProvider>
  )
}

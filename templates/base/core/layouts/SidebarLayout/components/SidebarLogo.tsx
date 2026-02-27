'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useSidebar } from '../SidebarContext'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import useLanguage from '@/core/hooks/useLanguage'

interface SidebarLogoProps {
  logo?: ReactNode
  appName?: string
}

export default function SidebarLogo({ appName = 'Shortcut Next' }: SidebarLogoProps) {
  const { isCollapsed, setIsMobileOpen } = useSidebar()
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { language } = useLanguage()
  const xDir = language === 'ar' ? 16 : -16

  const [cmdKey, setCmdKey] = useState<string | null>(null)
  useEffect(() => {
    setCmdKey(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K')
  }, [])

  return (
    <Stack
      flexDirection='row'
      alignItems='center'
      overflow='hidden'
      flexShrink={0}
      sx={{
        height: 64,
        gap: 1.5,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer'
      }}
      onClick={() => {
        router.push('/')
      }}
    >
      <Tooltip title={appName} placement='right' disableHoverListener={!isCollapsed} disableInteractive>
        <Stack flexDirection='row' alignItems='center' justifyContent='center' flexShrink={0} width={36} height={36}>
          <Icon icon='local:shortcut-next' width={36} height={36} color='currentColor' />
        </Stack>
      </Tooltip>

      <AnimatePresence initial={false}>
        {(!isCollapsed || isMobile) && (
          <motion.div
            key='app-name'
            initial={{ opacity: 0, x: xDir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: xDir }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
          >
            <Typography variant='subtitle1' fontWeight={700} noWrap>
              {appName}
            </Typography>
            {cmdKey && (
              <Typography variant='caption' color='text.disabled' noWrap sx={{ display: 'block' }}>
                {cmdKey} to search
              </Typography>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && (
        <IconButton
          onClick={e => {
            e.stopPropagation()
            setIsMobileOpen(false)
          }}
          size='small'
          sx={{ flexShrink: 0, ml: 'auto' }}
        >
          <X size={18} />
        </IconButton>
      )}
    </Stack>
  )
}

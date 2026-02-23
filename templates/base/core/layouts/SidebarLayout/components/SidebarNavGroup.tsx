'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Box, Stack } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import NavItems from './NavItems'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import type { SidebarNavGroup } from '@/core/layouts/types'
import themeConfig from '@/core/configs/themeConfig'

interface Props {
  item: SidebarNavGroup
  depth?: number
}

function hasActivePath(children: SidebarNavGroup['children'], pathname: string): boolean {
  return (
    children?.some(child => {
      if ('path' in child && child.path) {
        return pathname === child.path || pathname.startsWith(child.path + '/')
      }
      if ('children' in child && child.children) {
        return hasActivePath(child.children, pathname)
      }
      return false
    }) ?? false
  )
}

export default function SidebarNavGroupItem({ item, depth = 0 }: Props) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const activeChild = hasActivePath(item.children, pathname)
  const [isOpen, setIsOpen] = useState(activeChild)

  useEffect(() => {
    if (activeChild) setIsOpen(true)
  }, [pathname, activeChild])

  const indentPx = 8 + depth * 16
  const childrenHidden = !isCollapsed && !isOpen

  return (
    <Box>
      {/* Group header — animated in/out so the label can slide-and-fade on collapse */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key='group-header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
          >
            <Stack
              direction='row'
              alignItems='center'
              gap={1.5}
              onClick={() => setIsOpen(v => !v)}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
                  e.preventDefault()
                  setIsOpen(v => !v)
                }
              }}
              sx={{
                px: 1,
                py: 0.875,
                mx: 1,
                mb: 0.5,
                borderRadius: themeConfig.common.sidebarRadius,
                cursor: 'pointer',
                color: activeChild ? 'primary.main' : 'text.secondary',
                bgcolor: activeChild ? 'action.selected' : 'transparent',
                pl: `${indentPx}px`,
                transition: 'background-color 0.15s ease, color 0.15s ease',
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' }
              }}
            >
              {item.icon && (
                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <Icon icon={item.icon} width={20} height={20} />
                </Box>
              )}

              {/* Label grows to push chevron to the right edge */}
              <SidebarAnimatedLabel variant='body2' fontWeight={activeChild ? 600 : 400} grow>
                {item.title}
              </SidebarAnimatedLabel>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: childrenHidden ? '0fr' : '1fr',
          opacity: childrenHidden ? 0 : 1,
          transition: 'grid-template-rows 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease'
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <NavItems items={item.children as any} depth={isCollapsed ? depth : depth + 1} stagger={false} />
        </Box>
      </Box>
    </Box>
  )
}

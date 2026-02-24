'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import NavItems from './NavItems'
import NavItemContextMenu from './NavItemContextMenu'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import { NavItemRow, NavIconWrapper, NavCollapseGrid } from '../ui/SidebarStyledComponents'
import type { SidebarNavGroup } from '@/core/layouts/types'

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
  const [contextMenu, setContextMenu] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    if (activeChild) setIsOpen(true)
  }, [pathname, activeChild])

  const indentPx = 8 + depth * 16
  const childrenHidden = !isCollapsed && !isOpen

  return (
    <Box>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key='group-header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
          >
            <NavItemRow
              direction='row'
              alignItems='center'
              gap={1.5}
              isActive={activeChild}
              onClick={() => setIsOpen(v => !v)}
              onContextMenu={e => { e.preventDefault(); setContextMenu({ top: e.clientY, left: e.clientX }) }}
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
                pl: `${indentPx}px`,
                color: activeChild ? 'primary.main' : 'text.secondary'
              }}
            >
              {item.icon && (
                <NavIconWrapper>
                  <Icon icon={item.icon} width={20} height={20} />
                </NavIconWrapper>
              )}

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
            </NavItemRow>
          </motion.div>
        )}
      </AnimatePresence>

      <NavCollapseGrid isHidden={childrenHidden}>
        <Box sx={{ overflow: 'hidden' }}>
          <NavItems items={item.children ?? []} depth={isCollapsed ? depth : depth + 1} stagger={false} />
        </Box>
      </NavCollapseGrid>

      <NavItemContextMenu
        anchorPosition={contextMenu}
        onClose={() => setContextMenu(null)}
        item={{ title: item.title, icon: item.icon }}
      />
    </Box>
  )
}

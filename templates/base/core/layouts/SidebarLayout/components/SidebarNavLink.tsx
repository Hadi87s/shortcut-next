'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge, Tooltip } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useSidebar } from '../SidebarContext'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import NavItemContextMenu from './NavItemContextMenu'
import { NavTooltipAnchor, NavItemRow, NavIconWrapper } from '../ui/SidebarStyledComponents'
import type { SidebarNavLink } from '@/core/layouts/types'
import Icon from '@/components/icon/Icon'
import useLanguage from '@/core/hooks/useLanguage'
import { useActiveRoute } from '../ActiveRouteContext'

interface Props {
  item: SidebarNavLink
  depth?: number
}

export default function SidebarNavLinkItem({ item, depth = 0 }: Props) {
  const router = useRouter()
  const { isCollapsed, setIsMobileOpen } = useSidebar()
  const { language } = useLanguage()
  const isRtl = language === 'ar'
  const [contextMenu, setContextMenu] = useState<{ top: number; left: number } | null>(null)

  const activePath = useActiveRoute()
  const isActive = item.path ? item.path === activePath : false

  const indentPx = 8 + depth * 16

  const handleClick = () => {
    if (item.disabled || !item.path) return
    setIsMobileOpen(false)
    if (item.externalLink) {
      window.open(item.path, item.openInNewTab ? '_blank' : '_self')
    } else {
      router.push(item.path)
    }
  }

  return (
    <>
    <Tooltip
      title={item.title}
      placement={isRtl ? 'left' : 'right'}
      arrow
      disableHoverListener={!isCollapsed}
      disableFocusListener={!isCollapsed}
      disableTouchListener={!isCollapsed}
    >
      <NavTooltipAnchor>
        <NavItemRow
          direction='row'
          alignItems='center'
          gap={1.5}
          isActive={isActive}
          isDisabled={item.disabled}
          onClick={handleClick}
          onContextMenu={e => { e.preventDefault(); setContextMenu({ top: e.clientY, left: e.clientX }) }}
          role='button'
          tabIndex={item.disabled ? -1 : 0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
              e.preventDefault()
              handleClick()
            }
          }}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={item.disabled}
          sx={{
            px: isCollapsed ? '18px' : 1,
            color: 'text.primary',
            ...(isCollapsed ? {} : { pl: `${indentPx}px` })
          }}
        >
          {item.icon && (
            <NavIconWrapper>
              <Badge badgeContent={isCollapsed ? item.badgeContent : undefined} color={item.badgeColor ?? 'primary'}>
                <Icon icon={item.icon} width={20} height={20} />
              </Badge>
            </NavIconWrapper>
          )}

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <SidebarAnimatedLabel key='label' variant='body2' fontWeight={isActive ? 600 : 400} sx={{color: isActive? 'text.primary' : 'text.secondary'}}>
                {item.title}
              </SidebarAnimatedLabel>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!isCollapsed && item.badgeContent && (
              <motion.div
                key='badge'
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.15, ease: 'easeIn' } }}
                style={{ flexShrink: 0 }}
              >
                <Badge badgeContent={item.badgeContent} color={item.badgeColor ?? 'primary'} />
              </motion.div>
            )}
          </AnimatePresence>
        </NavItemRow>
      </NavTooltipAnchor>
    </Tooltip>
    <NavItemContextMenu
      anchorPosition={contextMenu}
      onClose={() => setContextMenu(null)}
      item={{ path: item.path, title: item.title, icon: item.icon }}
    />
    </>
  )
}

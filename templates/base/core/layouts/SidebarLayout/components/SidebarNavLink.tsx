'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Badge, Box, Tooltip } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import { useSettings } from '@/core/hooks/useSettings'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import type { SidebarNavLink } from '@/core/layouts/types'

interface Props {
  item: SidebarNavLink
  depth?: number
}

export default function SidebarNavLinkItem({ item, depth = 0 }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const { settings } = useSettings()
  const isRtl = settings.direction === 'rtl'

  const isActive = item.path
    ? pathname === item.path || pathname.startsWith(item.path + '/')
    : false

  const indentPx = 8 + depth * 16

  const handleClick = () => {
    if (item.disabled || !item.path) return
    if (item.externalLink) {
      window.open(item.path, item.openInNewTab ? '_blank' : '_self')
    } else {
      router.push(item.path)
    }
  }

  // Single stable return — unconditional Tooltip avoids tree-swap that would
  // prevent AnimatePresence from firing exit animations on the label.
  return (
    <Tooltip
      title={item.title}
      placement={isRtl ? 'left' : 'right'}
      arrow
      disableHoverListener={!isCollapsed}
      disableFocusListener={!isCollapsed}
      disableTouchListener={!isCollapsed}
    >
      {/* span required so Tooltip can attach its ref */}
      <span style={{ display: 'block' }}>
        <Box
          onClick={handleClick}
          role='button'
          tabIndex={item.disabled ? -1 : 0}
          onKeyDown={e => e.key === 'Enter' && handleClick()}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={item.disabled}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: isCollapsed ? '18px' : 1,
            py: 0.875,
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            opacity: item.disabled ? 0.5 : 1,
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: isActive ? 'action.selected' : 'transparent',
            // No indent when collapsed — icon stays at natural px:1 position.
            // Sidebar narrows around it; no layout jump.
            ...(isCollapsed ? {} : isRtl ? { pr: `${indentPx}px` } : { pl: `${indentPx}px` }),
            transition: 'background-color 0.15s ease, color 0.15s ease, padding 0.3s ease',
            '&:hover': {
              bgcolor: item.disabled ? 'transparent' : 'action.hover',
              color: item.disabled ? undefined : 'text.primary'
            }
          }}
        >
          {item.icon && (
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <Badge
                badgeContent={isCollapsed ? item.badgeContent : undefined}
                color={item.badgeColor ?? 'primary'}
              >
                <Icon icon={item.icon} width={20} height={20} />
              </Badge>
            </Box>
          )}

          {/* Label + badge — AnimatePresence fires exit so the label slides-and-fades
              smoothly. flexShrink:0 holds natural width; sidebar overflow:hidden clips
              from the right rather than squishing the text. */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <SidebarAnimatedLabel
                key='label'
                variant='body2'
                fontWeight={isActive ? 600 : 400}
              >
                {item.title}
              </SidebarAnimatedLabel>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!isCollapsed && item.badgeContent && (
              <Badge
                key='badge'
                badgeContent={item.badgeContent}
                color={item.badgeColor ?? 'primary'}
              />
            )}
          </AnimatePresence>
        </Box>
      </span>
    </Tooltip>
  )
}

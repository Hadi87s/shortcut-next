'use client'

import { useRouter } from 'next/navigation'
import { Badge, Tooltip } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { useSidebar } from '../SidebarContext'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import { NavTooltipAnchor, NavItemRow, NavIconWrapper } from '../SidebarStyledComponents'
import type { SidebarNavLink } from '@/core/layouts/types'
import Icon from '@/components/icon/Icon'
import useLanguage from '@/core/hooks/useLanguage'
import { useNavActivePath } from '../NavActiveContext'

interface Props {
  item: SidebarNavLink
  depth?: number
}

export default function SidebarNavLinkItem({ item, depth = 0 }: Props) {
  const router = useRouter()
  const { isCollapsed } = useSidebar()
  const { language } = useLanguage()
  const isRtl = language === 'ar'

  const activePath = useNavActivePath()
  const isActive = item.path ? item.path === activePath : false

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
      {/* NavTooltipAnchor renders as a block-level span so Tooltip can attach its ref */}
      <NavTooltipAnchor>
        <NavItemRow
          direction='row'
          alignItems='center'
          gap={1.5}
          isActive={isActive}
          isDisabled={item.disabled}
          onClick={handleClick}
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
            // No indent when collapsed — icon stays at natural px:1 position.
            // Sidebar narrows around it; no layout jump.
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

          {/* Label + badge — AnimatePresence fires exit so the label slides-and-fades
              smoothly. flexShrink:0 holds natural width; sidebar overflow:hidden clips
              from the right rather than squishing the text. */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <SidebarAnimatedLabel key='label' variant='body2' fontWeight={isActive ? 600 : 400}>
                {item.title}
              </SidebarAnimatedLabel>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!isCollapsed && item.badgeContent && (
              <Badge key='badge' badgeContent={item.badgeContent} color={item.badgeColor ?? 'primary'} />
            )}
          </AnimatePresence>
        </NavItemRow>
      </NavTooltipAnchor>
    </Tooltip>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Tooltip } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import { NavTooltipAnchor, NavItemRow, NavIconWrapper } from '../SidebarStyledComponents'
import type { SidebarNavMore } from '@/core/layouts/types'
import useLanguage from '@/core/hooks/useLanguage'

interface Props {
  item: SidebarNavMore
}

export default function SidebarNavMoreItem({ item }: Props) {
  const { isCollapsed } = useSidebar()
  const router = useRouter()
  const { language } = useLanguage()
  const isRtl = language === 'ar'

  const handleClick = () => {
    if (item.path) router.push(item.path)
  }

  // When collapsed: show item.tooltip (if any) or item.title as tooltip.
  // When expanded: show item.tooltip only (empty string = no tooltip shown).
  const tooltipTitle = isCollapsed ? (item.tooltip ?? item.title) : (item.tooltip ?? '')

  // Single stable return — unconditional Tooltip avoids tree-swap that would
  // prevent AnimatePresence from firing exit animations on the label.
  return (
    <Tooltip
      title={tooltipTitle}
      placement={isRtl ? 'left' : 'right'}
      arrow
      disableHoverListener={!tooltipTitle}
      disableFocusListener={!tooltipTitle}
      disableTouchListener={!tooltipTitle}
    >
      {/* NavTooltipAnchor renders as a block-level span so Tooltip can attach its ref */}
      <NavTooltipAnchor>
        <NavItemRow
          direction='row'
          alignItems='center'
          gap={1.5}
          onClick={handleClick}
          role='button'
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
              e.preventDefault()
              handleClick()
            }
          }}
          sx={{
            px: isCollapsed ? '18px' : 1,
            borderRadius: 2,
            color: 'text.secondary'
          }}
        >
          <NavIconWrapper>
            {item.icon ? <Icon icon={item.icon} width={20} height={20} /> : <MoreHorizontal size={20} />}
          </NavIconWrapper>

          {/* Label slides-and-fades smoothly because AnimatePresence always exists in the tree */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <SidebarAnimatedLabel key='label' variant='body2'>
                {item.title}
              </SidebarAnimatedLabel>
            )}
          </AnimatePresence>
        </NavItemRow>
      </NavTooltipAnchor>
    </Tooltip>
  )
}

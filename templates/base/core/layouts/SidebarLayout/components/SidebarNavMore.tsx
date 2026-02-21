'use client'

import { useRouter } from 'next/navigation'
import { Box, Tooltip } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import { useSettings } from '@/core/hooks/useSettings'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'
import type { SidebarNavMore } from '@/core/layouts/types'

interface Props {
  item: SidebarNavMore
}

export default function SidebarNavMoreItem({ item }: Props) {
  const { isCollapsed } = useSidebar()
  const { settings } = useSettings()
  const router = useRouter()
  const isRtl = settings.direction === 'rtl'

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
      {/* span required so Tooltip can attach its ref */}
      <span style={{ display: 'block' }}>
        <Box
          onClick={handleClick}
          role='button'
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleClick()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: isCollapsed ? '18px' : 1,
            py: 0.875,
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            cursor: 'pointer',
            color: 'text.secondary',
            transition: 'background-color 0.15s ease, color 0.15s ease, padding 0.3s ease',
            '&:hover': { bgcolor: 'action.hover', color: 'text.primary' }
          }}
        >
          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            {item.icon ? (
              <Icon icon={item.icon} width={20} height={20} />
            ) : (
              <MoreHorizontal size={20} />
            )}
          </Box>

          {/* Label slides-and-fades smoothly because AnimatePresence always exists in the tree */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <SidebarAnimatedLabel key='label' variant='body2'>
                {item.title}
              </SidebarAnimatedLabel>
            )}
          </AnimatePresence>
        </Box>
      </span>
    </Tooltip>
  )
}

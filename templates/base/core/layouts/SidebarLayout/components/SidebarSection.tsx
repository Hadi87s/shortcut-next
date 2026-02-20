'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import { useSettings } from '@/core/hooks/useSettings'
import NavItems from './NavItems'
import type { SidebarSection } from '@/core/layouts/types'

interface Props {
  item: SidebarSection
}

const sectionItemsVariants = {
  open: {
    height: 'auto' as const,
    opacity: 1,
    transition: {
      height: { type: 'tween' as const, duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      opacity: { duration: 0.2 },
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: 'tween' as const, duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      opacity: { duration: 0.15 },
      staggerChildren: 0.03
    }
  }
}

export default function SidebarSectionItem({ item }: Props) {
  const { isCollapsed } = useSidebar()
  const { settings } = useSettings()
  const router = useRouter()
  const isRtl = settings.direction === 'rtl'
  const [sectionOpen, setSectionOpen] = useState(!(item.defaultCollapsed ?? false))
  const [hovered, setHovered] = useState(false)

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (item.path) router.push(item.path)
  }

  // Single stable Box root — mirrors the NavGroup pattern exactly.
  // Section header fades in/out via AnimatePresence; no early return to avoid tree-swap.
  // When collapsed: items render directly so icons are visible in the narrow sidebar.
  // When expanded:  items are in the animated collapsible panel.
  return (
    <Box>
      {/* Section header — animated in/out so the title fades cleanly on collapse */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key='section-header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
            style={{ overflow: 'hidden' }}
          >
            <Box
              onClick={() => setSectionOpen(v => !v)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 2,
                pt: 2,
                pb: 0.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {/* Collapse arrow — appears on hover or when section is closed */}
              <motion.div
                animate={{
                  opacity: hovered || !sectionOpen ? 1 : 0,
                  rotate: sectionOpen ? 0 : -90
                }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <ChevronDown size={12} color='currentColor' style={{ color: 'inherit' }} />
              </motion.div>

              {/* Section title — plain Typography; parent motion.div handles the fade */}
              <Typography
                variant='caption'
                fontWeight={600}
                noWrap
                sx={{
                  flex: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'text.disabled',
                }}
              >
                {item.sectionTitle}
              </Typography>

              {/* Optional action button on the right */}
              {item.icon && item.path && (
                <Tooltip title={item.tooltip ?? ''} placement={isRtl ? 'left' : 'right'} arrow>
                  <IconButton
                    size='small'
                    onClick={handleActionClick}
                    sx={{
                      border: '1px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      p: 0.375,
                      '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' }
                    }}
                  >
                    <Icon icon={item.icon} width={14} height={14} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Items — always mounted so NavLink label AnimatePresence exits fire on collapse */}
      <motion.div
        animate={!isCollapsed && !sectionOpen ? 'closed' : 'open'}
        variants={sectionItemsVariants}
        style={{ overflow: 'hidden' }}
      >
        <NavItems items={item.items as any} depth={0} stagger={!isCollapsed && sectionOpen} />
      </motion.div>
    </Box>
  )
}

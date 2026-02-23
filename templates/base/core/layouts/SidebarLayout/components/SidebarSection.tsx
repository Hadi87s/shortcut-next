'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Icon } from '@iconify/react'
import { useSidebar } from '../SidebarContext'
import NavItems from './NavItems'
import type { SidebarSection } from '@/core/layouts/types'
import useLanguage from '@/core/hooks/useLanguage'

interface Props {
  item: SidebarSection
}

export default function SidebarSectionItem({ item }: Props) {
  const { isCollapsed } = useSidebar()
  const router = useRouter()
  const { language } = useLanguage()
  const isRtl = language === 'ar'
  const [sectionOpen, setSectionOpen] = useState(!(item.defaultCollapsed ?? false))
  const [hovered, setHovered] = useState(false)

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (item.path) router.push(item.path)
  }

  const itemsHidden = !isCollapsed && !sectionOpen

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
                userSelect: 'none'
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
                  color: 'text.disabled'
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

      {/* Items — grid-template-rows trick: animates between 0fr↔1fr for smooth height without JS measurement */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: itemsHidden ? '0fr' : '1fr',
          opacity: itemsHidden ? 0 : 1,
          transition: 'grid-template-rows 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease'
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <NavItems items={item.items as any} depth={0} stagger={false} />
        </Box>
      </Box>
    </Box>
  )
}

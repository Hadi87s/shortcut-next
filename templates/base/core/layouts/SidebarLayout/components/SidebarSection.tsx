'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useSidebar } from '../SidebarContext'
import NavItems from './NavItems'
import { SectionHeaderRow, NavCollapseGrid } from '../ui/SidebarStyledComponents'
import type { SidebarSection } from '@/core/layouts/types'
import useLanguage from '@/core/hooks/useLanguage'
import Icon from '@/components/icon/Icon'

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
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key='section-header'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
            style={{ overflow: 'hidden' }}
          >
            <SectionHeaderRow
              direction='row'
              alignItems='center'
              gap={0.75}
              onClick={() => setSectionOpen(v => !v)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
                  e.preventDefault()
                  setSectionOpen(v => !v)
                }
              }}
            >
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
            </SectionHeaderRow>
          </motion.div>
        )}
      </AnimatePresence>

      <NavCollapseGrid isHidden={itemsHidden}>
        <Box sx={{ overflow: 'hidden' }}>
          <NavItems items={item.items as any} depth={0} stagger={false} />
        </Box>
      </NavCollapseGrid>
    </Box>
  )
}

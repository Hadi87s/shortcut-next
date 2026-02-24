'use client'

import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { X } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { useFavorites } from '../FavoritesContext'
import { useSidebar } from '../SidebarContext'
import { NavIconWrapper, NavItemRow } from '../ui/SidebarStyledComponents'
import SidebarAnimatedLabel from './SidebarAnimatedLabel'

export default function FavoritesSection() {
  const router = useRouter()
  const { pinnedItems, unpinItem } = useFavorites()
  const { isCollapsed } = useSidebar()

  if (pinnedItems.length === 0) return null

  return (
    <>
      <Box sx={{ px: 1.5, pt: 1.5, pb: 0.5 }}>
        <Typography
          variant='caption'
          sx={{ textTransform: 'uppercase', color: 'text.disabled', fontWeight: 600, letterSpacing: '0.08em' }}
        >
          {!isCollapsed ? 'Pinned' : null}
        </Typography>
      </Box>

      <AnimatePresence initial={false}>
        {pinnedItems.map(item => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <NavItemRow
              direction='row'
              alignItems='center'
              gap={1.5}
              onClick={() => router.push(item.path)}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                  e.preventDefault()
                  router.push(item.path)
                }
              }}
              sx={{
                px: isCollapsed ? '18px' : 1,
                color: 'text.primary',
                position: 'relative',
                '&:hover .unpin-btn': { opacity: 1 }
              }}
            >
              {item.icon && (
                <NavIconWrapper>
                  <Icon icon={item.icon} width={20} height={20} />
                </NavIconWrapper>
              )}

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <SidebarAnimatedLabel key='label' variant='body2' grow>
                    {item.title}
                  </SidebarAnimatedLabel>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    key='unpin'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ flexShrink: 0 }}
                  >
                    <IconButton
                      className='unpin-btn'
                      size='small'
                      onClick={e => {
                        e.stopPropagation()
                        unpinItem(item.path)
                      }}
                      sx={{
                        opacity: 0,
                        transition: 'opacity 0.15s ease',
                        width: 20,
                        height: 20,
                        p: 0
                      }}
                      aria-label={`Unpin ${item.title}`}
                    >
                      <X size={14} />
                    </IconButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavItemRow>
          </motion.div>
        ))}
      </AnimatePresence>

      <Divider sx={{ my: 0.5, mx: 1.5 }} />
    </>
  )
}

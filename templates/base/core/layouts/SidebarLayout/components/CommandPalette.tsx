'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Dialog, TextField, Typography } from '@mui/material'
import { Search } from 'lucide-react'
import { Icon } from '@iconify/react'
import { SidebarUtils } from '../utils/SidebarUtils'
import type { SidebarNavItems } from '@/core/layouts/types'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  navItems: SidebarNavItems
}

export default function CommandPalette({ open, onClose, navItems }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const items = useMemo(() => SidebarUtils.flattenNavItems(navItems), [navItems])

  const filtered = useMemo(
    () => (query.trim() === '' ? items : items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()))),
    [items, query]
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = filtered[activeIndex]
      if (target) {
        router.push(target.path)
        onClose()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleRowClick = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <TextField
          autoFocus
          fullWidth
          variant='outlined'
          placeholder='Search navigation...'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              startAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.disabled' }}>
                  <Search size={18} />
                </Box>
              )
            }
          }}
          size='small'
        />
      </Box>

      <Box sx={{ maxHeight: 320, overflowY: 'auto', px: 1, pb: 1 }}>
        {filtered.length === 0 && query.trim() !== '' ? (
          <Typography variant='body2' color='text.disabled' sx={{ px: 2, py: 2, textAlign: 'center' }}>
            No results
          </Typography>
        ) : (
          filtered.map((item, index) => (
            <Box
              key={item.path}
              onClick={() => handleRowClick(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1,
                cursor: 'pointer',
                borderRadius: 1,
                bgcolor: index === activeIndex ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              {item.icon && (
                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <Icon icon={item.icon} width={18} height={18} />
                </Box>
              )}
              <Typography variant='body2' sx={{ flex: 1, minWidth: 0 }} noWrap>
                {item.title}
              </Typography>
              <Typography
                variant='caption'
                color='text.disabled'
                sx={{
                  flexShrink: 0,
                  maxWidth: 160,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.path}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Dialog>
  )
}

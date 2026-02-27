'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Sun, Moon } from 'lucide-react'
import { useToggleMode } from '@/core/hooks/useToggleMode'

export default function ThemeToggle() {
  const { mode, toggleMode } = useToggleMode()
  const isDark = mode === 'dark'

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleMode}
        size='small'
        sx={{
          color: 'text.secondary',
          '&:hover': { color: 'text.primary', bgcolor: 'action.hover' }
        }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </IconButton>
    </Tooltip>
  )
}

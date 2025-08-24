'use client'

import * as React from 'react'
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import GlobalStyles from './globalStyles'
import { buildThemeOptions } from './ThemeOptions'

type Ctx = { mode: PaletteMode; toggle: () => void; set: (m: PaletteMode) => void }
export const ColorModeContext = React.createContext<Ctx>({ mode: 'dark', toggle: () => {}, set: () => {} })

function getInitialMode(): PaletteMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('color-scheme') as PaletteMode | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function ThemeComponent({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>(getInitialMode)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', mode)
    window.localStorage.setItem('color-scheme', mode)
  }, [mode])

  const ctx = React.useMemo<Ctx>(
    () => ({ mode, toggle: () => setMode(m => (m === 'light' ? 'dark' : 'light')), set: setMode }),
    [mode]
  )

  const theme = React.useMemo(() => createTheme(buildThemeOptions(mode)), [mode])

  return (
    <ColorModeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

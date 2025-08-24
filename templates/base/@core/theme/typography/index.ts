import type { ThemeOptions } from '@mui/material'

export function makeTypography(): ThemeOptions['typography'] {
  return {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    h1: { fontWeight: 800, letterSpacing: 0.2 },
    h2: { fontWeight: 800, letterSpacing: 0.2 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0.2 }
  } as const
}

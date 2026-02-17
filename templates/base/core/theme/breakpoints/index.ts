import type { ThemeOptions } from '@mui/material'

export function makeBreakpoints(): ThemeOptions['breakpoints'] {
  return {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }
  }
}

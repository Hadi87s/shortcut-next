import type { ThemeOptions } from '@mui/material'

export function makeSpacing(factor: number): ThemeOptions['spacing'] {
  return `${0.25 * factor}rem`
}

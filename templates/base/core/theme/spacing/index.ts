import type { ThemeOptions } from '@mui/material'

export function spacing(factor: number): ThemeOptions['spacing'] {
  return `${0.25 * factor}rem`
}

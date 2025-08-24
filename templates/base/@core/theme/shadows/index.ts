import type { ThemeOptions } from '@mui/material'

export function makeShadows(): ThemeOptions['shadows'] {
  // start from MUI defaults and tweak a few
  const base = [
    'none',
    '0 1px 3px rgba(0,0,0,0.12)',
    '0 2px 6px rgba(0,0,0,0.12)',
    '0 4px 12px rgba(0,0,0,0.12)',
    ...Array(21).fill('0 10px 30px rgba(0,0,0,0.12)')
  ] as unknown as ThemeOptions['shadows']
  return base
}

import type { PaletteMode, ThemeOptions } from '@mui/material'

const brand = {
  50: '#EEF0FF',
  100: '#DDE2FF',
  200: '#BEC7FF',
  300: '#9DABFF',
  400: '#7C8FFF',
  500: '#5B74FF', // main
  600: '#415BEE',
  700: '#2F46CF',
  800: '#2132A6',
  900: '#1A2880'
}

export function makePalette(mode: PaletteMode): ThemeOptions['palette'] {
  const isDark = mode === 'dark'
  return {
    mode,
    primary: { light: brand[400], main: brand[500], dark: brand[700], contrastText: '#fff' },
    brand: { light: brand[400], main: brand[500], dark: brand[700], contrastText: '#fff' },
    secondary: { light: '#64E1FF', main: '#00D0FF', dark: '#00A3CC', contrastText: '#001219' },
    error: { light: '#FF7A7A', main: '#FF4D4F', dark: '#C62828' },
    warning: { light: '#FFD166', main: '#FFB703', dark: '#C98A00' },
    info: { light: '#9AD0FF', main: '#55ADFF', dark: '#1E7ED6' },
    success: { light: '#33D69F', main: '#11C28B', dark: '#0E9B6F' },
    divider: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    background: {
      default: isDark ? '#0B0D12' : '#F7F8FB',
      paper: isDark ? '#10131A' : '#FFFFFF'
    },
    text: {
      primary: isDark ? '#E6E8EF' : '#10141D',
      secondary: isDark ? 'rgba(230,232,239,0.7)' : '#4A5568'
    }
  }
}

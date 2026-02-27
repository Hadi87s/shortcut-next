import type { PaletteMode, ThemeOptions } from '@mui/material'

const brand = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12'
}

export function makePalette(mode: PaletteMode): ThemeOptions['palette'] {
  const isDark = mode === 'dark'
  const lightColor = '15, 17, 23'
  const darkColor = '230, 235, 255'
  const mainColor = mode === 'light' ? `rgb(${lightColor})` : `rgb(${darkColor})`

  return {
    customColors: {
      main: mainColor,
      light: lightColor,
      darkBg: '#0c0c0c',
      lightBg: '#f6f8fc',
      bodyBg: mode === 'light' ? '#f6f8fc' : '#0c0c0c',
      trackBg: mode === 'light' ? '#eceef4' : '#1e1e1e',
      avatarBg: mode === 'light' ? '#e8eaf0' : '#1f1f1f',
      tooltipBg: mode === 'light' ? '#1a1d28' : '#2c2c2c',
      tableHeaderBg: mode === 'light' ? '#f0f2f8' : '#181818',
      disabled: mode === 'light' ? '#dde0ea' : '#2e2e2e',
      planAvatar: '#8B5CF6',
      greenBackground: mode === 'light' ? '#DCFCE7' : 'rgba(17, 194, 139, 0.12)',
      blueBackground: mode === 'light' ? '#DBEAFE' : 'rgba(249, 115, 22, 0.12)',
      lightPurple: '#E9D5FF',
      lightAqua: '#27AAE1',
      subscriptionBlue: '#4285f4',
      subscriptionPurple: '#9333EA'
    },
    mode,
    primary: { light: brand[400], main: brand[500], dark: brand[700], contrastText: '#fff' },
    brand: { light: brand[400], main: brand[500], dark: brand[700], contrastText: '#fff' },
    secondary: { light: '#64E1FF', main: '#00D0FF', dark: '#00A3CC', contrastText: '#001219' },
    error: { light: '#FF7A7A', main: '#FF4D4F', dark: '#C62828' },
    warning: { light: '#FFD166', main: '#FFB703', dark: '#C98A00' },
    info: { light: '#9AD0FF', main: '#55ADFF', dark: '#1E7ED6' },
    success: { light: '#33D69F', main: '#11C28B', dark: '#0E9B6F' },
    divider: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    background: {
      default: isDark ? '#0c0c0c' : '#f6f8fc',
      paper: isDark ? '#161616' : '#ffffff'
    },
    text: {
      primary: isDark ? 'rgba(230,235,255,0.92)' : '#0f1117',
      secondary: isDark ? 'rgba(180,190,220,0.65)' : 'rgba(15,17,23,0.55)',
      disabled: isDark ? 'rgba(180,190,220,0.35)' : 'rgba(15,17,23,0.3)'
    },
    action: {
      hover: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      selected: isDark ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.08)',
      disabled: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
      disabledBackground: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
    }
  } as const
}

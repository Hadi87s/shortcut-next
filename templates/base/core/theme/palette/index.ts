import type { PaletteMode, ThemeOptions } from '@mui/material'

const brand = {
  50: '#EEF0FF',
  100: '#DDE2FF',
  200: '#BEC7FF',
  300: '#9DABFF',
  400: '#7C8FFF',
  500: '#5B74FF',
  600: '#415BEE',
  700: '#2F46CF',
  800: '#2132A6',
  900: '#1A2880'
}

export function makePalette(mode: PaletteMode): ThemeOptions['palette'] {
  const isDark = mode === 'dark'
  const lightColor = '76, 78, 100'
  const darkColor = '234, 234, 255'
  const mainColor = mode === 'light' ? `rgb(${lightColor})` : `rgb(${darkColor})`

  return {
    customColors: {
      main: mainColor,
      light: lightColor,
      darkBg: '#282A42',
      lightBg: '#F7F7F9',
      bodyBg: mode === 'light' ? '#F7F7F9' : '#282A42',
      trackBg: mode === 'light' ? '#F2F2F4' : '#41435C',
      avatarBg: mode === 'light' ? '#F1F1F3' : '#3F425C',
      tooltipBg: mode === 'light' ? '#262732' : '#464A65',
      tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#3A3E5B',
      disabled: mode === 'light' ? '#E0E0E0' : '#424242',
      planAvatar: '#8B5CF6',
      greenBackground: mode === 'light' ? '#DCFCE7' : 'rgba(22, 163, 74, 0.2)',
      blueBackground: mode === 'light' ? '#DBEAFE' : 'rgba(25, 118, 210, 0.2)',
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
    divider: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    background: {
      default: isDark ? '#0b1020' : '#fff',
      paper: isDark ? '#0f1724' : '#fff'
    },
    text: {
      primary: isDark ? '#fff' : '#0b1020'
    }
  } as const
}

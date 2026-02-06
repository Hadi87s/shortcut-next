import type { ThemeOptions } from '@mui/material'

export function makeTypography(lang: string): ThemeOptions['typography'] {
  const english = 'var(--font-poppins), Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial'
  const arabic = 'var(--font-cairo), "Segoe UI", Tahoma, Geneva, sans-serif'

  return {
    fontFamily: lang === 'ar' ? arabic : english,
    h1: {
      fontWeight: 500,
      letterSpacing: '-1.5px'
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0px',
      fontSize: '40px',
      lineHeight: 1
    },
    h3: {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: '32px',
      lineHeight: 1
    },
    h4: {
      fontWeight: 500,
      letterSpacing: 0,
      fontSize: '24px',
      lineHeight: 1
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0
    },
    h6: {
      letterSpacing: '0px',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1
    },
    subtitle1: {
      letterSpacing: '0.15px'
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1,
      letterSpacing: 0
    },
    body1: {
      letterSpacing: 0,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1
    },
    body2: {
      letterSpacing: '0px',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1
    },
    button: {
      letterSpacing: '0.4px',
      textTransform: 'none',
      fontWeight: 600
    },
    caption: {
      lineHeight: 1.25,
      letterSpacing: '0.4px'
    },
    overline: {
      letterSpacing: '1px'
    }
  } as const
}

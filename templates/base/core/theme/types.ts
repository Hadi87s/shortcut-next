import { DetailedHTMLProps } from 'react'

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      main: string
      light: string
      bodyBg: string
      darkBg: string
      lightBg: string
      trackBg: string
      avatarBg: string
      tooltipBg: string
      tableHeaderBg: string
      disabled: string
      planAvatar: string
      greenBackground: string
      blueBackground: string
      lightPurple: string
      lightAqua: string
      subscriptionBlue: string
      subscriptionPurple: string
    }
    brand: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }
  interface PaletteOptions {
    customColors?: Palette['customColors']
    brand?: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export {}

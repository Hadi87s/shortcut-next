import type { PaletteColor, PaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: PaletteColor
  }
  interface PaletteOptions {
    brand?: PaletteColorOptions
  }
}

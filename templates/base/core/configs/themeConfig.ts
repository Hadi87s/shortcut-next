/**
 * Configs
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage in order to see the config changes in the template.
 * ! To clear local storage, you may refer https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/.
 */

// ** MUI Imports
import { Direction, PaletteMode } from '@mui/material'

type ThemeConfig = {
  templateName: string
  mode: PaletteMode
  direction: Direction
  responsiveFontSizes: boolean
  disableRipple: boolean
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  borderRadius: number
  common: {
    sidebarRadius: number
  }
}

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: 'Next-Shortcut' /* App Name */,
  mode: 'dark' as PaletteMode,
  direction: 'ltr' /* ltr | rtl */,

  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: true /* true | false */,
  toastPosition: 'bottom-center' /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
  borderRadius: 10,
  common: {
    sidebarRadius: 1
  }
}

export default themeConfig

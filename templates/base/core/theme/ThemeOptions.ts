// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'
import { PaletteMode, ThemeOptions } from '@mui/material'

// ** Theme Override Imports
import shadows from './shadows'
import overrides from './overrides'
import { spacing } from './spacing'
import { makeTypography } from './typography'
import { makeBreakpoints } from './breakpoints'
import { makePalette } from './palette'
import { Settings } from '../context/SettingsContext'

const themeOptions = (settings: Settings, overrideMode: PaletteMode, lang: string): ThemeOptions => {
  // ** Vars
  const { mode, direction, themeColor } = settings

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: ThemeOptions = Object.assign({})

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: makeBreakpoints(),
      direction,
      components: overrides(settings),
      palette: makePalette(mode === 'semi-dark' ? overrideMode : mode),
      spacing: spacing(2),
      shape: {
        borderRadius: 10
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography: makeTypography(lang)
    },
    userThemeConfig
  )

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : makePalette(mode === 'semi-dark' ? overrideMode : mode)?.primary)
      }
    }
  })
}

export default themeOptions

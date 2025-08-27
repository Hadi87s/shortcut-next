// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'
import { PaletteMode, ThemeOptions } from '@mui/material'

// ** User Theme Options
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Theme Override Imports
import shadows from './shadows'
import overrides from './overrides'
import { spacing } from './spacing'
import { makeTypography } from './typography'
import { makeBreakpoints } from './breakpoints'
import { makePalette } from './palette'

const themeOptions = (settings: Settings, overrideMode: PaletteMode): ThemeOptions => {
  // ** Vars
  const { skin, mode, direction, themeColor } = settings

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: ThemeOptions = Object.assign({}, UserThemeOptions())

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: makeBreakpoints(),
      direction,
      components: overrides(settings),
      palette: makePalette(mode === 'semi-dark' ? overrideMode : mode, skin),
      ...spacing,
      shape: {
        borderRadius: 10
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography: makeTypography()
    },
    userThemeConfig
  )

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : makePalette(mode === 'semi-dark' ? overrideMode : mode, skin).primary)
      }
    }
  })
}

export default themeOptions

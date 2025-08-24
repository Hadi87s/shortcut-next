import { createTheme, PaletteMode, ThemeOptions } from '@mui/material'
import { makePalette } from './palette'
import { makeTypography } from './typography'
import { makeShadows } from './shadows'
import { makeSpacing } from './spacing'
import { makeBreakpoints } from './breakpoints'
import { makeOverrides } from './overrides'

export function buildThemeOptions(mode: PaletteMode): ThemeOptions {
  const options: ThemeOptions = {
    palette: makePalette(mode),
    typography: makeTypography(),
    spacing: makeSpacing(),
    breakpoints: makeBreakpoints(),
    shape: { borderRadius: 12 },
    shadows: makeShadows(),
    components: makeOverrides(createTheme({ palette: makePalette(mode) }))
  }

  return options
}

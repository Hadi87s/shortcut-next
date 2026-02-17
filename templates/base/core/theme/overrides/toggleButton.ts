import themeConfig from '@/core/configs/themeConfig'

export default {
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        borderRadius: themeConfig.borderRadius
      }
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: themeConfig.borderRadius
      }
    }
  }
}

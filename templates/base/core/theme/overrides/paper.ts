import themeConfig from "@/core/configs/themeConfig";

export default {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: themeConfig.borderRadius
      }
    }
  }
}

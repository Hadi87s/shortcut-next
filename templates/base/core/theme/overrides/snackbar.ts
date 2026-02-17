import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

const Snackbar = () => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: themeConfig.borderRadius,
          padding: theme.spacing(1.75, 4),
          backgroundColor: `rgb(${theme.palette.customColors.main})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black'],
          '& .MuiSnackbarContent-message': {
            lineHeight: 1.429
          }
        })
      }
    }
  }
}

export default Snackbar

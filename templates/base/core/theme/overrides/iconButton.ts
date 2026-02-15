import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import { OwnerStateThemeType } from '.'

const IconButton = () => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 8,
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            borderRadius: 8
          },
          '&.MuiIconButton-colorPrimary:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
          },
          '&.MuiIconButton-colorSecondary:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
          },
          '&.MuiIconButton-colorSuccess:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.success.main, 0.16)}`
          },
          '&.MuiIconButton-colorError:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.error.main, 0.16)}`
          },
          '&.MuiIconButton-colorWarning:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.warning.main, 0.16)}`
          },
          '&.MuiIconButton-colorInfo:hover': {
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.info.main, 0.16)}`
          }
        })
      }
    }
  }
}

export default IconButton

import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import { OwnerStateThemeType } from './'
import themeConfig from '@/core/configs/themeConfig'

const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }: OwnerStateThemeType) => ({
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: themeConfig.borderRadius,
          lineHeight: 1.715,
          transition: 'all 0.15s ease-in-out',
          ...(ownerState.size === 'medium' &&
            ownerState.variant === 'text' && {
              padding: `${theme.spacing(1.75, 3)}`
            }),
          '&.MuiButton-textPrimary:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
          },
          '&.MuiButton-textSecondary:hover': {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.08)
          },
          '&.MuiButton-textSuccess:hover': {
            backgroundColor: hexToRGBA(theme.palette.success.main, 0.08)
          },
          '&.MuiButton-textError:hover': {
            backgroundColor: hexToRGBA(theme.palette.error.main, 0.08)
          },
          '&.MuiButton-textWarning:hover': {
            backgroundColor: hexToRGBA(theme.palette.warning.main, 0.08)
          },
          '&.MuiButton-textInfo:hover': {
            backgroundColor: hexToRGBA(theme.palette.info.main, 0.08)
          }
        }),
        contained: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1, 5.25)}`,
          '&:hover': {
            boxShadow: theme.shadows[6]
          },
          '&.MuiButton-containedPrimary:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
          },
          '&.MuiButton-containedSecondary:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
          },
          '&.MuiButton-containedSuccess:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.success.main, 0.16)}`
          },
          '&.MuiButton-containedError:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.error.main, 0.16)}`
          },
          '&.MuiButton-containedWarning:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.warning.main, 0.16)}`
          },
          '&.MuiButton-containedInfo:hover': {
            boxShadow: `${theme.shadows[6]}, 0 0 0 2px ${hexToRGBA(theme.palette.info.main, 0.16)}`
          }
        }),
        outlined: ({ theme }: OwnerStateThemeType) => ({
          lineHeight: 1.572,
          padding: `${theme.spacing(1, 5.25)}`,
          '&.MuiButton-outlinedPrimary:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
          },
          '&.MuiButton-outlinedSecondary:hover': {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
          },
          '&.MuiButton-outlinedSuccess:hover': {
            backgroundColor: hexToRGBA(theme.palette.success.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.success.main, 0.16)}`
          },
          '&.MuiButton-outlinedError:hover': {
            backgroundColor: hexToRGBA(theme.palette.error.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.error.main, 0.16)}`
          },
          '&.MuiButton-outlinedWarning:hover': {
            backgroundColor: hexToRGBA(theme.palette.warning.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.warning.main, 0.16)}`
          },
          '&.MuiButton-outlinedInfo:hover': {
            backgroundColor: hexToRGBA(theme.palette.info.main, 0.08),
            boxShadow: `0 0 0 2px ${hexToRGBA(theme.palette.info.main, 0.16)}`
          }
        }),
        sizeSmall: ({ ownerState, theme }: OwnerStateThemeType) => ({
          lineHeight: 1.693,
          ...(ownerState.variant === 'text' && {
            padding: `${theme.spacing(1, 2.25)}`
          }),
          ...(ownerState.variant === 'contained' && {
            padding: `${theme.spacing(1, 3.25)}`
          }),
          ...(ownerState.variant === 'outlined' && {
            lineHeight: 1.539,
            padding: `${theme.spacing(1, 3)}`
          })
        }),
        sizeLarge: ({ ownerState, theme }: OwnerStateThemeType) => ({
          lineHeight: 1.734,
          ...(ownerState.variant === 'text' && {
            padding: `${theme.spacing(2, 5.5)}`
          }),
          ...(ownerState.variant === 'contained' && {
            padding: `${theme.spacing(2, 6.5)}`
          }),
          ...(ownerState.variant === 'outlined' && {
            lineHeight: 1.6,
            padding: `${theme.spacing(2, 6.25)}`
          })
        })
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    }
  }
}

export default Button

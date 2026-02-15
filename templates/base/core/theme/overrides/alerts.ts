import { lighten, darken } from '@mui/material/styles'
import { OwnerStateThemeType } from './'
import themeConfig from '@/core/configs/themeConfig'
import { Mode } from '@/core/layouts/types'
import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import Icon from '@/components/icon/Icon'

const Alert = (mode: Mode) => {
  const getColor = mode === 'dark' ? lighten : darken

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          success: Icon({ icon: 'lucide:circle-check' }),
          info: Icon({ icon: 'lucide:info' }),
          warning: Icon({ icon: 'lucide:triangle-alert' }),
          error: Icon({ icon: 'lucide:circle-x' })
        }
      },
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: themeConfig.borderRadius,
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(1)
          },
          '& a': {
            fontWeight: 500,
            color: 'inherit'
          }
        }),
        standardSuccess: ({ theme }: OwnerStateThemeType) => ({
          color: getColor(theme.palette.success.main, 0.1),
          backgroundColor: hexToRGBA(theme.palette.success.main, 0.12),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.success.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: getColor(theme.palette.success.main, 0.1)
          }
        }),
        standardInfo: ({ theme }: OwnerStateThemeType) => ({
          color: getColor(theme.palette.info.main, 0.1),
          backgroundColor: hexToRGBA(theme.palette.info.main, 0.12),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.info.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: getColor(theme.palette.info.main, 0.1)
          }
        }),
        standardWarning: ({ theme }: OwnerStateThemeType) => ({
          color: getColor(theme.palette.warning.main, 0.1),
          backgroundColor: hexToRGBA(theme.palette.warning.main, 0.12),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.warning.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: getColor(theme.palette.warning.main, 0.1)
          }
        }),
        standardError: ({ theme }: OwnerStateThemeType) => ({
          color: getColor(theme.palette.error.main, 0.1),
          backgroundColor: hexToRGBA(theme.palette.error.main, 0.12),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.error.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: getColor(theme.palette.error.main, 0.1)
          }
        }),
        outlinedSuccess: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.success.main,
          color: getColor(theme.palette.success.main, 0.1),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.success.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: theme.palette.success.main
          }
        }),
        outlinedInfo: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.info.main,
          color: getColor(theme.palette.info.main, 0.1),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.info.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: theme.palette.info.main
          }
        }),
        outlinedWarning: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.warning.main,
          color: getColor(theme.palette.warning.main, 0.1),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.warning.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: theme.palette.warning.main
          }
        }),
        outlinedError: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.error.main,
          color: getColor(theme.palette.error.main, 0.1),
          '& .MuiAlertTitle-root': {
            color: getColor(theme.palette.error.main, 0.1)
          },
          '& .MuiAlert-icon': {
            color: theme.palette.error.main
          }
        }),
        filled: ({ theme }: OwnerStateThemeType) => ({
          fontWeight: 400,
          color: theme.palette.common.white
        })
      }
    }
  }
}

export default Alert

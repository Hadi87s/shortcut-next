// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Util Import
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

const Pagination = () => {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          '&.Mui-disabled': {
            opacity: 0.5,
            color: theme.palette.text.disabled
          }
        }),
        outlined: ({ theme }: OwnerStateThemeType) => ({
          borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`
        }),
        outlinedPrimary: ({ theme }: OwnerStateThemeType) => {
          const isDark = theme.palette.mode === 'dark'
          const selectedColor = isDark ? theme.palette.primary.light : theme.palette.primary.main

          return {
            '&.Mui-selected': {
              backgroundColor: hexToRGBA(selectedColor, 0.12),
              borderColor: 'transparent',
              color: selectedColor,
              '&:hover': {
                backgroundColor: `${hexToRGBA(selectedColor, 0.24)} !important`
              }
            }
          }
        },
        outlinedSecondary: ({ theme }: OwnerStateThemeType) => {
          const isDark = theme.palette.mode === 'dark'
          const selectedColor = isDark ? theme.palette.secondary.light : theme.palette.secondary.main

          return {
            '&.Mui-selected': {
              backgroundColor: hexToRGBA(selectedColor, 0.12),
              borderColor: 'transparent',
              color: selectedColor,
              '&:hover': {
                backgroundColor: `${hexToRGBA(selectedColor, 0.24)} !important`
              }
            }
          }
        },
        rounded: {
          borderRadius: 8
        }
      }
    }
  }
}

export default Pagination

import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

const select = () => {
  return {
    MuiSelect: {
      styleOverrides: {
        select: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: themeConfig.borderRadius,
          fontSize: 12,
          padding: 14,
          minWidth: '6rem !important',
          '&.MuiTablePagination-select': {
            minWidth: '1.5rem !important'
          },
          '&.Mui-disabled ~ .MuiOutlinedInput-notchedOutline': {
            borderColor: `rgba(${theme.palette.primary.main}, 0.12)`
          }
        })
      }
    }
  }
}

export default select

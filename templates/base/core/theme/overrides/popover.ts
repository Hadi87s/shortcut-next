import { OwnerStateThemeType } from './'

const Popover = () => {
  return {
    MuiPopover: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiPopover-paper': {
            boxShadow: theme.shadows[0],
            border: `1px solid ${theme.palette.divider}`
          }
        })
      }
    }
  }
}

export default Popover

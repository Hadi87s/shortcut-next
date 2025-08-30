// ** Type Imports
import { OwnerStateThemeType } from '.'

const Popover = () => {
  return {
    MuiPopover: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiPopover-paper': {
            boxShadow: theme.shadows[6]
          }
        })
      }
    }
  }
}

export default Popover

// ** Type Imports
import type { OwnerStateThemeType } from '.'

const Menu = () => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (theme.palette.mode === 'light') {
      return theme.shadows[8]
    } else return theme.shadows[9]
  }

  return {
    MuiMenu: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiMenu-paper': {
            borderRadius: 5,
            boxShadow: boxShadow(theme)
          }
        })
      }
    }
  }
}

export default Menu

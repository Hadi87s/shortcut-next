import themeConfig from '@/core/configs/themeConfig'
import { OwnerStateThemeType } from './'

const Menu = () => {
  return {
    MuiMenu: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => {
          return {
            padding: 1,
            marginTop: theme.spacing(2),
            '& .MuiMenu-paper': {
              borderRadius: themeConfig.borderRadius,
              boxShadow: `0 0 0 5px ${theme.palette.primary.dark}20`,
              padding: theme.spacing(1),
              backgroundColor: `${theme.palette.background.paper}99`,
              backdropFilter: 'blur(6px)'
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          fontSize: 14,
          borderRadius: theme.shape.borderRadius,
          transition: 'all 0.1s ease-in-out',
          '&.Mui-selected': {
            borderRadius: theme.shape.borderRadius,
            margin: theme.spacing(1, 0),
            backgroundColor: theme.palette.action.selected
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        })
      }
    }
  }
}

export default Menu

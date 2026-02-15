import { OwnerStateThemeType } from './'

const Tabs = () => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40
        },
        vertical: ({ theme }: OwnerStateThemeType) => ({
          minWidth: 130,
          marginRight: theme.spacing(4),
          borderRight: `1px solid ${theme.palette.divider}`,
          '& .MuiTab-root': {
            minWidth: 130
          }
        }),
        indicator: ({ theme }: OwnerStateThemeType) => ({
          height: 3,
          backgroundColor: theme.palette.text.primary,
          borderRadius: '3px'
        })
      }
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          lineHeight: 1.2,
          minHeight: 30,
          minWidth: 30,
          paddingLeft: theme.spacing(1.5),
          paddingRight: theme.spacing(1.5),
          paddingTop: theme.spacing(0.55),
          paddingBottom: theme.spacing(0),
          marginRight: theme.spacing(1.5),
          marginLeft: theme.spacing(1.5),
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: theme.palette.text.secondary,
          transition: 'font-weight 0.2s ease-in-out, background-color 0.15s ease-out',
          borderRadius: theme.spacing(2),
          backgroundColor: 'transparent',
          '&.Mui-selected': {
            color: theme.palette.text.primary,
            fontWeight: 700,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          },
          '&:hover:not(.Mui-selected)': {
            backgroundColor: theme.palette.action.hover,
            borderRadius: theme.spacing(2)
          }
        }),
        textColorSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.Mui-selected': {
            color: theme.palette.text.secondary
          }
        })
      }
    }
  }
}

export default Tabs

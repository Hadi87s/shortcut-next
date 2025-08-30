// ** Type Imports
import { OwnerStateThemeType } from '.'

const Dialog = () => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[10],
          '&:not(.MuiDialog-paperFullScreen)': {
            [theme.breakpoints.down('sm')]: {
              margin: theme.spacing(4),
              width: `calc(100% - ${theme.spacing(8)})`,
              maxWidth: `calc(100% - ${theme.spacing(8)}) !important`
            }
          },
          '& > .MuiList-root': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
          },
          '&': {
            '&::-webkit-scrollbar': {
              width: 10,
              height: 10
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.background.paper,
              borderRadius: 8
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.background.default,
              borderRadius: 8,
              border: `2px solid ${theme.palette.background.paper}`
            },
            scrollbarColor: `${theme.palette.primary.main + '50'} ${theme.palette.background.paper}`,
            scrollbarWidth: 'thin'
          }
        })
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5)
        })
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '& + .MuiDialogContent-root': {
            paddingTop: 0
          },
          '& + .MuiDialogActions-root': {
            paddingTop: 0
          }
        })
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '&.dialog-actions-dense': {
            padding: theme.spacing(2.5),
            paddingTop: 0
          }
        })
      }
    }
  }
}

export default Dialog

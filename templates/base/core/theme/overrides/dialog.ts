import { OwnerStateThemeType } from './'

const Dialog = () => {
  return {
    MuiDialog: {
      styleOverrides: {
        root: () => ({
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              animation: 'slideDown 0.2s ease-out',
              '@keyframes slideDown': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(50px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }
          }
        }),
        paper: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 16,
          boxShadow: theme.shadows[10],
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
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
          }
        })
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          color: theme.palette.text.primary
        })
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          color: theme.palette.text.primary,
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
          backgroundColor: theme.palette.background.paper,
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

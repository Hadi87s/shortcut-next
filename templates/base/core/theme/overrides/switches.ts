import { OwnerStateThemeType } from './'

const Switch = () => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          width: 34,
          height: 20,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(14px)',
              color: theme.palette.common.white,
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
              }
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: theme.palette.primary.main,
              border: `6px solid ${theme.palette.common.white}`
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
            },
            '&:not(.Mui-checked)': {
              '& .MuiSwitch-thumb': {
                color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[400]
              }
            }
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16,
            height: 16,
            boxShadow: theme.shadows[1]
          },
          '& .MuiSwitch-track': {
            borderRadius: 20 / 2,
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
              duration: 500
            })
          }
        })
      }
    }
  }
}

export default Switch

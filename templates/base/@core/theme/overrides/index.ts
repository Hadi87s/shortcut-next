import type { Components, Theme } from '@mui/material/styles'

export function makeOverrides(theme: Theme): Components<Theme> {
  const isDark = theme.palette.mode === 'dark'

  return {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--blob-1': 'radial-gradient(closest-side, #7C4DFF 0%, rgba(124,77,255,0) 70%)',
          '--blob-2': 'radial-gradient(closest-side, #00E5FF 0%, rgba(0,229,255,0) 70%)'
        },
        body: {
          backgroundImage: isDark
            ? `radial-gradient(1200px 600px at 10% -10%, rgba(124,77,255,0.07), transparent),
               radial-gradient(900px 500px at 110% 110%, rgba(0,229,255,0.06), transparent)`
            : undefined
        }
      }
    },

    MuiContainer: { defaultProps: { maxWidth: 'lg' } },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))'
            : 'linear-gradient(180deg, #FFFFFF, #FAFBFF)'
        }
      }
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingInline: 16 },
        containedPrimary: {
          background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
        }
      }
    },

    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiInputLabel: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? 'rgba(16,19,26,0.72)' : 'rgba(255,255,255,0.72)',
          backdropFilter: 'saturate(120%) blur(8px)'
        }
      }
    }
  }
}

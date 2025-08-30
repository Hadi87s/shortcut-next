// ** Type Imports
import type { OwnerStateThemeType } from '.'

const Autocomplete = () => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[6]
        })
      }
    }
  }
}

export default Autocomplete

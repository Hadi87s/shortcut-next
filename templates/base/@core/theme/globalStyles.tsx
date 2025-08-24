import * as React from 'react'
import { GlobalStyles as MUIGlobalStyles } from '@mui/material'

export default function GlobalStyles() {
  return (
    <MUIGlobalStyles
      styles={{
        '*, *::before, *::after': { boxSizing: 'border-box' },
        body: { margin: 0 }
      }}
    />
  )
}

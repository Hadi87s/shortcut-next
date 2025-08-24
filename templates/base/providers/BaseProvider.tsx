'use client'

import { PropsWithChildren, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  palette: { mode: 'dark' },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }
})

export default function BaseProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient())
  return (
    <ThemeProvider theme={theme}>
      {/* If you kept Tailwind preflight OFF, keep CssBaseline ON */}
      <CssBaseline />
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}

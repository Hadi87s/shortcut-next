'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeComponent from '@/@core/theme/ThemeComponent'

export default function BaseProviders({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient())
  return (
    <ThemeComponent>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ThemeComponent>
  )
}

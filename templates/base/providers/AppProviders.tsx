// src/providers/AppProviders.tsx
'use client'

import { useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

import { SettingsProvider } from '@/@core/context/SettingsContext'
import ThemeComponent from '@/@core/theme/ThemeComponent'
import I18nProvider from '@/providers/I18nProvider'
import HydrationGate from '@/components/HydrationGate'
import { useSettings } from '@/@core/hooks/useSettings'
import Spinner from '@/components/loaders/Spinner'

function ThemedProviders({ children, client }: { children: React.ReactNode; client: QueryClient }) {
  const { settings } = useSettings()

  // Direction SHOULD follow the URL locale for Pattern C
  const rtl = settings.direction === 'rtl'
  const cache = useMemo(
    () =>
      createCache({
        key: rtl ? 'mui-rtl' : 'mui',
        stylisPlugins: rtl ? [prefixer, rtlPlugin] : []
      }),
    [rtl]
  )

  return (
    <CacheProvider key={rtl ? 'rtl' : 'ltr'} value={cache}>
      <ThemeComponent settings={{ ...settings, direction: rtl ? 'rtl' : 'ltr' }}>
        <QueryClientProvider client={client}>
          <I18nProvider>
            <HydrationGate fallback={<Spinner />}>{children}</HydrationGate>
          </I18nProvider>
        </QueryClientProvider>
      </ThemeComponent>
    </CacheProvider>
  )
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())

  return (
    <SettingsProvider>
      <ThemedProviders client={client}>{children}</ThemedProviders>
    </SettingsProvider>
  )
}

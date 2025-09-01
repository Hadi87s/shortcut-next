'use client'

import ThemeComponent from '@/@core/theme/ThemeComponent'
import { SettingsProvider } from './SettingsContext'
import { useSettings } from '../hooks/useSettings'
import I18nProvider from '@/providers/I18nProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings()
  const [client] = useState(() => new QueryClient())

  return (
    <SettingsProvider>
      <ThemeComponent settings={settings}>
        <QueryClientProvider client={client}>
          <I18nProvider>{children}</I18nProvider>
        </QueryClientProvider>
      </ThemeComponent>
    </SettingsProvider>
  )
}

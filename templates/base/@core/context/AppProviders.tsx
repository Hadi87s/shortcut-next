'use client'

import ThemeComponent from '@/@core/theme/ThemeComponent'
import BaseProviders from '@/providers/BaseProvider'
import { SettingsProvider } from './SettingsContext'
import { useSettings } from '../hooks/useSettings'

function ThemedShell({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings()
  return (
    <ThemeComponent settings={settings}>
      <BaseProviders>{children}</BaseProviders>
    </ThemeComponent>
  )
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <ThemedShell>{children}</ThemedShell>
    </SettingsProvider>
  )
}

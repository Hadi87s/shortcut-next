'use client'

// ** React Imports
import { createContext, useState, ReactNode, useEffect } from 'react'

// ** MUI Imports
import { Direction } from '@mui/material'

// ** ThemeConfig Import
import themeConfig from '../configs/themeConfig'

// ** Types Import
import { Mode, ThemeColor } from '../layouts/types'
import { Locale } from '../configs/i18n'

export type Settings = {
  mode: Mode
  direction: Direction
  themeColor: ThemeColor
  language: Locale
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export type PageSpecificSettings = {
  mode?: Mode
  direction?: Direction
  themeColor?: ThemeColor
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

interface SettingsProviderProps {
  children: ReactNode
  pageSettings?: PageSpecificSettings | void
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  direction: themeConfig.direction,
  language: 'en',
  toastPosition: themeConfig.toastPosition
}

const staticSettings = {
  toastPosition: initialSettings.toastPosition
}

const restoreSettings = (): Settings => {
  try {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('settings')
      if (stored) return { ...JSON.parse(stored), ...staticSettings }
    }
  } catch {}
  return initialSettings
}

const storeSettings = (settings: Settings) => {
  const initSettings = Object.assign({}, settings)

  delete initSettings.toastPosition
  window.localStorage.setItem('settings', JSON.stringify(initSettings))
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children, pageSettings }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(() => restoreSettings())

  useEffect(() => {
    const restored = restoreSettings()
    const next = restored || initialSettings

    if (pageSettings) {
      setSettings({ ...next, ...pageSettings })
    }

    setSettings(next)
  }, [pageSettings])

  const saveSettings = (updatedSettings: Settings) => {
    storeSettings(updatedSettings)
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer

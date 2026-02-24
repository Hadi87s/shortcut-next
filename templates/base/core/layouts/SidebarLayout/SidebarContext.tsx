'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useSettings } from '@/core/hooks/useSettings'

interface SidebarContextValue {
  isCollapsed: boolean
  setIsCollapsed: (v: boolean) => void
  toggleCollapsed: () => void
  isMobileOpen: boolean
  setIsMobileOpen: (v: boolean) => void
  toggleMobileOpen: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const { settings, saveSettings } = useSettings()
  const [isCollapsed, setIsCollapsedState] = useState(settings.sidebarCollapsed ?? false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Stable refs updated every render — lets callbacks read current values without being
  // listed as deps, which would recreate them and trigger dependent useEffects in a loop.
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  const saveSettingsRef = useRef(saveSettings)
  saveSettingsRef.current = saveSettings

  // Programmatic override (e.g. mobile reset) — does NOT persist so desktop preference is preserved.
  const setIsCollapsed = useCallback((v: boolean) => {
    setIsCollapsedState(v)
  }, [])

  // User-initiated toggle — persists the new value to settings.
  const toggleCollapsed = useCallback(() => {
    setIsCollapsedState(v => {
      const next = !v
      saveSettingsRef.current({ ...settingsRef.current, sidebarCollapsed: next })
      return next
    })
  }, [])

  const toggleMobileOpen = useCallback(() => setIsMobileOpen(v => !v), [])

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
        isMobileOpen,
        setIsMobileOpen,
        toggleMobileOpen
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarContextValue {
  const sidebarContext = useContext(SidebarContext)
  if (!sidebarContext) throw new Error('useSidebar must be used within SidebarProvider')
  return sidebarContext
}

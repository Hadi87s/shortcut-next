'use client'

import { useEffect, useState } from 'react'

interface MSWProviderProps {
  children: React.ReactNode
}

/**
 * MSW Provider Component
 *
 * Initializes Mock Service Worker in development mode.
 * Shows a loading state while MSW is starting to prevent
 * API calls before mocks are ready.
 */
export default function MSWProvider({ children }: MSWProviderProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function init() {
      // Only initialize MSW in development
      if (process.env.NODE_ENV === 'development') {
        // Check if mocks are disabled
        if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'false') {
          setIsReady(true)
          return
        }

        try {
          const { initMocks } = await import('@/lib/mocks')
          await initMocks()
          console.log('[MSW] Ready to intercept requests')
        } catch (error) {
          console.warn('[MSW] Failed to initialize:', error)
        }
      }
      setIsReady(true)
    }

    init()
  }, [])

  // In production, render immediately
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>
  }

  // In development, wait for MSW to be ready
  if (!isReady) {
    return null // Or a loading spinner if preferred
  }

  return <>{children}</>
}

/**
 * MSW Mock Service Worker Setup
 *
 * This module provides mock API functionality for development.
 *
 * Usage:
 * 1. Call initMocks() early in your app (e.g., in a useEffect in your root layout)
 * 2. The mock server will intercept API calls and return mock responses
 *
 * To disable mocks, set NEXT_PUBLIC_ENABLE_MOCKS=false in .env.local
 */

export async function initMocks() {
  // Only run in browser and development
  if (typeof window === 'undefined') return
  if (process.env.NODE_ENV !== 'development') return
  if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'false') return

  const { worker } = await import('./browser')

  // Start the worker
  await worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })

  console.log('[MSW] Mock Service Worker started')
}

// Re-export utilities
export { resetDatabase, getUsers } from './db'
export type { MockUser } from './db'

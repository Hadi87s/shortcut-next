/**
 * MSW Handlers Index
 *
 * Combines all mock API handlers.
 * Add new handler modules here as your app grows.
 */

import { authHandlers } from './auth'

export const handlers = [
  ...authHandlers
  // Add more handlers here as needed:
  // ...userHandlers,
  // ...ticketHandlers,
  // etc.
]

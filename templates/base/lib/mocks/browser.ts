/**
 * MSW Browser Worker
 *
 * Sets up MSW to intercept requests in the browser.
 * This is used for development to mock API responses.
 */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

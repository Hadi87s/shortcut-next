// ** Base API path (rewritten to backend in next.config.ts)
const baseURL = '/api'

// ** Keys for localStorage/session
const accessToken = 'accessToken'
const refreshAPI = '/refresh-token'
const logoutAPI = '/logout'

// ** Where to redirect after logout
const fallbackPage = '/login'

// ** Axios defaults
const requestTimeout = 15000 // 15 seconds

export {
  baseURL,
  accessToken,
  refreshAPI,
  logoutAPI,
  fallbackPage,
  requestTimeout
}

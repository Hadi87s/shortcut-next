// ** Auth Configuration - Easily customizable for different apps
const authConfig = {
  // ** API Configuration
  baseURL: '/api',
  loginEndpoint: '/auth/login',
  signupEndpoint: '/auth/signup',
  refreshEndpoint: '/auth/refresh',

  // ** Storage Keys
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageUserDataKeyName: 'userData',

  // ** Routes
  loginPageURL: '/login',
  homePageURL: '/',

  // ** Request Configuration
  requestTimeout: 15000, // 15 seconds

  // ** Cookie Configuration
  cookieName: 'accessToken',
  cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
  cookieSecure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
  cookieSameSite: 'Strict' as const
}

// ** Legacy exports for backward compatibility
const baseURL = authConfig.baseURL
const fallbackPage = authConfig.loginPageURL
const requestTimeout = authConfig.requestTimeout

export { authConfig, baseURL, fallbackPage, requestTimeout }

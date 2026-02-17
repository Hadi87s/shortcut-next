import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { baseURL, fallbackPage, requestTimeout, authConfig } from '../configs/clientConfig'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

interface RefreshResponse {
  token: string
}

// ** --- Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: requestTimeout
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: string | null) => void
  reject: (reason?: unknown) => void
}[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// ** --- Request Interceptor
apiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(authConfig.storageTokenKeyName)
    if (token && !config.url?.includes(authConfig.refreshEndpoint)) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// ** --- Response Interceptor
apiClient.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    // ** Unauthorized -> try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return apiClient(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshRes = await refreshToken()
        const { token } = refreshRes.data

        if (typeof window !== 'undefined') {
          localStorage.setItem(authConfig.storageTokenKeyName, token)
        }

        processQueue(null, token)
        originalRequest.headers.Authorization = `Bearer ${token}`

        return apiClient(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr as AxiosError, null)
        await logoutUser()
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    // ** Forbidden (invalid token) -> logout
    if (error.response?.status === 403) {
      await logoutUser()
    }

    return Promise.reject(error)
  }
)

// ** --- Refresh function (uses cookies)
const refreshToken = () => {
  return axios.post<RefreshResponse>(`${baseURL}${authConfig.refreshEndpoint}`, {}, { withCredentials: true })
}

// ** --- Logout function
const logoutUser = async () => {
  if (typeof window !== 'undefined') {
    // Clear all auth-related storage
    localStorage.removeItem(authConfig.storageTokenKeyName)
    localStorage.removeItem(authConfig.storageUserDataKeyName)
    localStorage.removeItem(authConfig.storageRefreshTokenKeyName)

    // Clear cookies
    document.cookie = `${authConfig.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    document.cookie = `${authConfig.storageRefreshTokenKeyName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`

    // Redirect to login page
    window.location.href = fallbackPage
  }
}

export default apiClient

// ** Export utilities for external use
export { logoutUser }

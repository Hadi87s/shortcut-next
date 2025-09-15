import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { accessToken, baseURL, refreshToken as refresh, refreshAPI } from '../configs/clientConfig'

interface RefreshResponse {
  token: string
  refreshToken: string
}

interface FailedRequest<T = string | null> {
  resolve: (value: T | PromiseLike<T> | null) => void
  reject: (reason?: unknown) => void
}

// ** Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' }
})

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: AxiosError | null, token: string | null = null): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request Interceptor
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(accessToken)
  if (token && !config.url?.includes('/refresh-token')) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response Interceptor
apiClient.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
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
        const { token, refreshToken: newRefresh } = refreshRes.data

        localStorage.setItem(accessToken, token)
        localStorage.setItem(refresh, newRefresh)

        processQueue(null, token)

        originalRequest.headers.Authorization = `Bearer ${token}`

        return apiClient(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr as AxiosError, null)
        logoutUser()

        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// Refresh Token Call
const refreshToken = () => {
  return axios.post<RefreshResponse>(`${baseURL}${refreshAPI}`, {
    refreshToken: localStorage.getItem(refresh)
  })
}

// Logout handler
const logoutUser = () => {
  localStorage.removeItem(accessToken)
  localStorage.removeItem(refresh)
  window.location.href = '/login'
}

export default apiClient

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { accessToken, baseURL, refreshAPI, logoutAPI, fallbackPage, requestTimeout } from '../configs/clientConfig'

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
    const token = localStorage.getItem(accessToken)
    if (token && !config.url?.includes(refreshAPI)) {
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
          localStorage.setItem(accessToken, token)
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
  return axios.post<RefreshResponse>(`${baseURL}${refreshAPI}`, {}, { withCredentials: true })
}

// ** --- Logout function
const logoutUser = async () => {
  try {
    await axios.post(`${baseURL}${logoutAPI}`, {}, { withCredentials: true })
  } catch (error) {
    console.error(error)
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(accessToken)
    window.location.href = fallbackPage
  }
}

export default apiClient

'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { authConfig } from '@/@core/configs/clientConfig'
import type {
  User,
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  AuthContextType,
  ErrorCallback
} from '@/@core/configs/authConfig'

// ** Default context value
const defaultProvider: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setUser: () => null,
  setLoading: () => null
}

// ** Create context
const AuthContext = createContext<AuthContextType>(defaultProvider)

// ** Auth Provider Props
interface AuthProviderProps {
  children: ReactNode
}

// ** Auth Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // ** State
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // ** Hooks
  const router = useRouter()

  // ** Computed
  const isAuthenticated = !!user

  // ** Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(authConfig.storageTokenKeyName)
        const userData = localStorage.getItem(authConfig.storageUserDataKeyName)

        if (token && userData) {
          const parsedUser = JSON.parse(userData) as User
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        // Clear invalid data
        localStorage.removeItem(authConfig.storageTokenKeyName)
        localStorage.removeItem(authConfig.storageUserDataKeyName)
        localStorage.removeItem(authConfig.storageRefreshTokenKeyName)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // ** Login function
  const login = async (credentials: LoginCredentials, onError?: ErrorCallback): Promise<void> => {
    try {
      setIsLoading(true)

      const response = await axios.post<AuthResponse>(
        `${authConfig.baseURL}${authConfig.loginEndpoint}`,
        credentials,
        { timeout: authConfig.requestTimeout }
      )

      const { user: userData, accessToken, refreshToken } = response.data

      // Store tokens and user data
      localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
      localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))

      if (refreshToken) {
        localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
      }

      // Set cookie for SSR
      document.cookie = `${authConfig.cookieName}=${accessToken}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${authConfig.cookieSecure ? '; Secure' : ''}`

      setUser(userData)

      // Redirect to home page
      router.push(authConfig.homePageURL)

    } catch (error) {
      console.error('Login failed:', error)
      const message = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Login failed. Please try again.'

      onError?.(message)
    } finally {
      setIsLoading(false)
    }
  }

  // ** Signup function
  const signup = async (credentials: SignupCredentials, onError?: ErrorCallback): Promise<void> => {
    try {
      setIsLoading(true)

      const response = await axios.post<AuthResponse>(
        `${authConfig.baseURL}${authConfig.signupEndpoint}`,
        credentials,
        { timeout: authConfig.requestTimeout }
      )

      const { user: userData, accessToken, refreshToken } = response.data

      // Store tokens and user data
      localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
      localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))

      if (refreshToken) {
        localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
      }

      // Set cookie for SSR
      document.cookie = `${authConfig.cookieName}=${accessToken}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${authConfig.cookieSecure ? '; Secure' : ''}`

      setUser(userData)

      // Redirect to home page
      router.push(authConfig.homePageURL)

    } catch (error) {
      console.error('Signup failed:', error)
      const message = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Signup failed. Please try again.'

      onError?.(message)
    } finally {
      setIsLoading(false)
    }
  }

  // ** Logout function
  const logout = async (): Promise<void> => {
      // Clear all auth data regardless of API call result
      setUser(null)
      localStorage.removeItem(authConfig.storageTokenKeyName)
      localStorage.removeItem(authConfig.storageUserDataKeyName)
      localStorage.removeItem(authConfig.storageRefreshTokenKeyName)

      // Clear cookie
      document.cookie = `${authConfig.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`

      // Redirect to login page
      router.push(authConfig.loginPageURL)

  }

  // ** Context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    setUser,
    setLoading: setIsLoading
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// ** Auth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// ** Export context for advanced usage
export { AuthContext }

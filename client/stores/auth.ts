import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '../app/composables/useApi'
import { useSecureStorage } from '../app/composables/useSecureStorage'
import { jwtDecode } from "jwt-decode"

interface User {
  id?: number
  email: string
  roles: string[]
}

interface JwtPayload {
  iat: number
  exp: number
  jti: string
  roles: string[]
  username: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Getters
  const isManager = computed(() => {
    return user.value?.roles?.includes('ROLE_MANAGER') || user.value?.roles?.includes('ROLE_DEMO_MANAGER') || false
  })

  const isPilot = computed(() => {
    return user.value?.roles?.includes('ROLE_PILOT') || user.value?.roles?.includes('ROLE_DEMO_PILOT') || false
  })

  const isLoader = computed(() => {
    return user.value?.roles?.includes('ROLE_LOADER') || user.value?.roles?.includes('ROLE_DEMO_LOADER') || false
  })

  const isDemoUser = computed(() => {
    return user.value?.roles?.some((role: string) => role.includes('ROLE_DEMO_')) || false
  })

  // JWT Token utilities
  function decodeJwtToken(token: string): JwtPayload | null {
    try {
      console.log('')
      const decoded = jwtDecode(token)
      return decoded as JwtPayload
    } catch (error) {
      console.error('Failed to decode JWT token:', error)
      return null
    }
  }


  function isTokenExpired(token: string): boolean {
    const payload = decodeJwtToken(token)
    if (!payload) return true
    
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  }

  // Actions
  async function login(email: string, password: string) {
    const { post } = useApi()
    
    try {
      const response = await post<{
        token: string
        refresh_token: string
      }>('/api/auth', { email, password }, {
        errorOptions: {
          customMessage: 'Login failed. Please check your credentials and try again.'
        }
      })

      if (!response) {
        throw new Error('Login failed')
      }

      const { token, refresh_token } = response

      console.log('🔍 Auth store received response:', response)
      console.log('🔍 Token:', token)
      console.log('🔍 Refresh token:', refresh_token)

      // Store tokens
      const { setItem } = useSecureStorage()
      setItem('JWT_TOKEN', token)
      setItem('REFRESH_TOKEN', refresh_token)

      // Decode token and extract user information
      const payload = decodeJwtToken(token)
      if (!payload) {
        throw new Error('Invalid token received')
      }

      // Create user object from token payload
      const userData: User = {
        email: payload.username,
        roles: payload.roles
      }

      // Set user data
      setUser(userData)

      return response
    } catch (error: any) {
      console.error('Login failed:', error)
      throw new Error(error?.message || 'Login failed')
    }
  }

  async function refreshAuth() {
    const { post } = useApi()
    const { getItem, setItem } = useSecureStorage()
    
    try {
      const refreshToken = getItem('REFRESH_TOKEN')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await post<{
        token: string
        refresh_token: string
      }>('/api/refresh', { refresh_token: refreshToken }, {
        errorOptions: {
          customMessage: 'Token refresh failed. Please log in again.',
          redirectOnAuthError: false
        }
      })

      if (!response) {
        throw new Error('Token refresh failed')
      }

      const { token, refresh_token } = response

      // Store new tokens
      setItem('JWT_TOKEN', token)
      setItem('REFRESH_TOKEN', refresh_token)

      // Decode new token and update user information
      const payload = decodeJwtToken(token)
      if (!payload) {
        throw new Error('Invalid token received')
      }

      const userData: User = {
        email: payload.username,
        roles: payload.roles
      }

      // Update user data
      setUser(userData)

      return response
    } catch (error: any) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout the user
      logout()
      throw new Error(error?.message || 'Token refresh failed')
    }
  }

  function setUser(userData: User) {
    console.log('🔐 Setting user:', userData)
    user.value = userData
    isAuthenticated.value = true
    console.log('🔐 Auth store state:', { user: user.value, isAuthenticated: isAuthenticated.value })
  }

  function clearUser() {
    console.log('🔐 Clearing user')
    user.value = null
    isAuthenticated.value = false
    
    // Clear tokens
    const { removeItem } = useSecureStorage()
    removeItem('JWT_TOKEN')
    removeItem('REFRESH_TOKEN')
    
    console.log('🔐 Auth store state:', { user: user.value, isAuthenticated: isAuthenticated.value })
  }

  function getDashboardPath(): string {
    if (isManager.value) return '/manager/dashboard'
    if (isPilot.value) return '/pilot/dashboard'
    if (isLoader.value) return '/loader/dashboard'
    return '/dashboard'
  }

  function logout() {
    console.log('🚪 Logging out user...')
    // Call backend logout endpoint to invalidate tokens
    const { post } = useApi()
    post('/api/logout', {}, {
      errorOptions: {
        showNotification: false,
        logToConsole: false
      }
    }).finally(() => {
      // Clear user data regardless of logout success
      console.log('🚪 Clearing user data from store')
      clearUser()
    })
  }

  // Initialize user from stored token on app start
  function initializeAuth() {
    const { getItem } = useSecureStorage()
    const token = getItem('JWT_TOKEN')
    
    if (token && !isTokenExpired(token)) {
      const payload = decodeJwtToken(token)
      if (payload) {
        const userData: User = {
          email: payload.username,
          roles: payload.roles
        }
        setUser(userData)
      }
    } else if (token) {
      // Token is expired, clear it
      clearUser()
    }
  }

  return {
    user,
    isAuthenticated,
    isManager,
    isPilot,
    isLoader,
    isDemoUser,
    login,
    refreshAuth,
    logout,
    setUser,
    clearUser,
    getDashboardPath,
    initializeAuth,
    decodeJwtToken,
    isTokenExpired
  }
}) 
import { defineStore } from 'pinia'
import { useApi } from '../app/composables/useApi'

export interface User {
  id: number
  email: string
  roles: string[]
  iat: number
  exp: number
  profileInformation?: any
  lastLogin?: string
  isActive: boolean
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)  
  const isLoading = ref(false)

  // Getters
  const hasRole = (role: string) => {
    return user.value?.roles.includes(role) || false
  }
  
  const isManager = computed(() => {
    return user.value?.roles.includes('ROLE_MANAGER') || 
           user.value?.roles.includes('ROLE_DEMO_MANAGER') || false
  })
  
  const isPilot = computed(() => {
    return user.value?.roles.includes('ROLE_PILOT') || 
           user.value?.roles.includes('ROLE_DEMO_PILOT') || false
  })
  
  const isLoader = computed(() => {
    return user.value?.roles.includes('ROLE_LOADER') || 
           user.value?.roles.includes('ROLE_DEMO_LOADER') || false
  })

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    
    try {
      const { post } = useApi()
      const response = await post<{ user: User; token: string; refreshToken: string }>('/api/auth', { email, password })
      
      if (response && response.user) {
        user.value = response.user
        isAuthenticated.value = true
        return { success: true }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error: any) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate tokens on backend
      const { post } = useApi()
      await post('/api/logout', {}, {
        errorOptions: {
          showNotification: false,
          logToConsole: false
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state
      clearAuth()
      // Navigate to login
      await navigateTo('/login')
    }
  }

  // Check if token is expired
  const isTokenExpired = () => {
    if (!user.value?.exp) return true
    const currentTime = Math.floor(Date.now() / 1000)
    return currentTime >= user.value.exp
  }

  const refreshAuth = async () => {
    try {
      // Check if token is expired
      if (isTokenExpired()) {
        // TODO: Implement refresh token call to backend
        // This will call your refresh endpoint with the refresh token from cookies
        const { post } = useApi()
        const response = await post<{ user: User; token: string; refreshToken: string }>('/api/refresh', {})
        
        if (response && response.user) {
          user.value = response.user
          isAuthenticated.value = true
          return true
        } else {
          clearAuth()
          return false
        }
      }
      
      // Token is still valid
      if (user.value) {
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (error) {
      console.error('Auth refresh failed:', error)
      clearAuth()
      return false
    }
  }

  const checkAuth = async () => {
    if (!isAuthenticated.value) {
      return await refreshAuth()
    }
    return true
  }

  const setUser = (newUser: User) => {
    user.value = newUser
    isAuthenticated.value = true
  }

  const clearAuth = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    
    // Getters
    hasRole,
    isManager,
    isPilot,
    isLoader,
    isTokenExpired,
    
    // Actions
    login,
    logout,
    refreshAuth,
    checkAuth,
    setUser,
    clearAuth
  }
}, {
  persist: true
}) 
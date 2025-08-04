import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { useApi } from '../app/composables/useApi'
import type { User as ApiUser } from '../src/interfaces/user'

// Extended User interface that includes JWT payload fields
export interface User extends ApiUser {
  id?: number
  roles?: string[]
  iat?: number
  exp?: number
  profileInformation?: any
  lastLogin?: string
  isActive?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)  
  const isLoading = ref(false)

  // Reset function for persistence plugin
  const $reset = () => {
    user.value = null
    isAuthenticated.value = false
    isLoading.value = false
  }

  // Getters
  const hasRole = (role: string) => {
    return user.value?.roles?.includes(role) || false
  }
  
  const isManager = computed(() => {
    return user.value?.roles?.includes('ROLE_MANAGER') || 
           user.value?.roles?.includes('ROLE_DEMO_MANAGER') || false
  })
  
  const isPilot = computed(() => {
    return user.value?.roles?.includes('ROLE_PILOT') || 
           user.value?.roles?.includes('ROLE_DEMO_PILOT') || false
  })
  
  const isLoader = computed(() => {
    return user.value?.roles?.includes('ROLE_LOADER') || 
           user.value?.roles?.includes('ROLE_DEMO_LOADER') || false
  })

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    
    try {
      const { post } = useApi()
      const response = await post<{ user: User; token: string; refreshToken: string }>('/api/auth', { email, password })
      
      if (response && response.user) {
        console.log("Setting user data:", response.user)
        user.value = response.user
        isAuthenticated.value = true
        console.log("Auth state after login:", {
          hasUser: !!user.value,
          isAuthenticated: isAuthenticated.value,
          user: user.value
        })
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
      window.location.href = '/login'
    }
  }

  // Check if token is expired
  const isTokenExpired = () => {
    console.log("isTokenExpired called", {
      hasUser: !!user.value,
      exp: user.value?.exp,
      currentTime: Math.floor(Date.now() / 1000)
    })
    
    if (!user.value?.exp) {
      console.log("No expiration time found, considering expired")
      return true
    }
    
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpired = currentTime >= user.value.exp
    
    console.log("Token expiration check:", {
      currentTime,
      expirationTime: user.value.exp,
      isExpired
    })
    
    return isExpired
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
    console.log("checkAuth called", {
      hasUser: !!user.value,
      isAuthenticated: isAuthenticated.value,
      user: user.value
    })
    
    // If we have a user in the persisted state, check if the token is still valid
    if (user.value && isAuthenticated.value) {
      console.log("User exists and is authenticated, checking token expiration")
      // Check if token is expired
      if (isTokenExpired()) {
        console.log("Token is expired, trying to refresh")
        // Token is expired, try to refresh it
        return await refreshAuth()
      } else {
        console.log("Token is still valid")
        // Token is still valid, ensure authentication state is set
        isAuthenticated.value = true
        return true
      }
    }
    
    console.log("No user or not authenticated, trying to refresh")
    // No user or not authenticated, try to refresh
    return await refreshAuth()
  }

  const setUser = (newUser: User) => {
    user.value = newUser
    isAuthenticated.value = true
  }

  const clearAuth = () => {
    user.value = null
    isAuthenticated.value = false
  }

  // Initialize auth state on app startup
  const initializeAuth = () => {
    console.log("Initializing auth state", {
      hasUser: !!user.value,
      isAuthenticated: isAuthenticated.value,
      user: user.value
    })
    
    // Check localStorage to see if persistence is working
    if (process.client) {
      const stored = localStorage.getItem('auth')
      console.log("Stored in localStorage:", stored)
    }
    
    // If we have a user but isAuthenticated is false, fix it
    if (user.value && !isAuthenticated.value) {
      console.log("Fixing auth state - user exists but not authenticated")
      isAuthenticated.value = true
    }
    
    // If we have a user and isAuthenticated is true, check token expiration
    if (user.value && isAuthenticated.value) {
      if (isTokenExpired()) {
        console.log("Token is expired, clearing auth")
        clearAuth()
      } else {
        console.log("Auth state is valid")
      }
    }
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
    clearAuth,
    initializeAuth,
  }
}, {
  persist: true
}) 
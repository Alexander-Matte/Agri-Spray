import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { useApi } from '../app/composables/useApi'
import type { User as ApiUser } from '../src/interfaces/user'

// Extended User interface that includes JWT payload fields
export interface User extends ApiUser {
  id?: number
  email: string
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
  const isCheckingAuth = ref(false)

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
      // Call the Nuxt server /nuxt-api/auth endpoint directly
      const response = await $fetch<{ user: User; token: string; refreshToken: string }>('/nuxt-api/auth', {
        method: 'POST',
        body: { email, password }
      })
      
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
      // Call Nuxt server logout endpoint to clear cookies
      await $fetch('/nuxt-api/logout', {
        method: 'POST'
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

  const checkAuth = async (): Promise<boolean> => {
    // Prevent multiple simultaneous auth checks
    if (isCheckingAuth.value) {
      console.log("Auth check already in progress, waiting...")
      // Wait for the current check to complete
      while (isCheckingAuth.value) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      return isAuthenticated.value
    }

    console.log("checkAuth called - checking server-side authentication")
    
    try {
      isCheckingAuth.value = true
      
      // Call the Nuxt server /nuxt-api/me endpoint directly
      const response = await $fetch<{ authenticated: boolean; user?: User; error?: boolean; message?: string }>('/nuxt-api/me', {
        method: 'GET'
      })
      
      if (response && response.authenticated && response.user) {
        console.log("Server confirmed authentication, setting user data:", response.user)
        user.value = response.user
        isAuthenticated.value = true
        return true
      } else {
        console.log("Server authentication failed or no user data")
        clearAuth()
        return false
      }
    } catch (error: any) {
      console.error('Auth check failed:', error)
      clearAuth()
      return false
    } finally {
      isCheckingAuth.value = false
    }
  }

  const refreshAuth = async (): Promise<boolean> => {
    try {
      console.log("Attempting to refresh authentication...")
      const response = await $fetch<{ user: User; token: string; refreshToken: string }>('/nuxt-api/refresh', {
        method: 'POST'
      })
      
      if (response && response.user) {
        console.log("Token refresh successful, updating user data:", response.user)
        user.value = response.user
        isAuthenticated.value = true
        return true
      } else {
        throw new Error('Invalid refresh response')
      }
    } catch (error: any) {
      console.error('Token refresh failed:', error)
      clearAuth()
      return false
    }
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
  const initializeAuth = async () => {
    console.log("Initializing auth state - will check server-side authentication")
    
    // Always check authentication server-side since we don't persist client state
    return await checkAuth()
  }

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    isCheckingAuth: readonly(isCheckingAuth),
    
    // Getters
    hasRole,
    isManager,
    isPilot,
    isLoader,
    
    // Actions
    login,
    logout,
    checkAuth,
    refreshAuth,
    setUser,
    clearAuth,
    initializeAuth,
  }
}) 
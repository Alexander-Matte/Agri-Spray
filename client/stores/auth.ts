import { defineStore } from 'pinia'
import { useApi } from '../app/composables/useApi'

export interface User {
  id: number
  email: string
  roles: string[]
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
      const response = await $fetch<{ user: User }>('/api/auth', {
        method: 'POST',
        body: { email, password },
        headers: { 'Content-Type': 'application/json' }
      })
      
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
      // JWT bundle handles logout automatically via secure cookies
      // No need to call a logout endpoint
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
      isAuthenticated.value = false
      navigateTo('/login')
    }
  }

  const refreshAuth = async () => {
    try {
      // JWT bundle handles token refresh automatically via secure cookies
      // If we have a user in state, assume they're still authenticated
      if (user.value) {
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (error) {
      console.error('Auth refresh failed:', error)
      user.value = null
      isAuthenticated.value = false
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
    
    // Actions
    login,
    logout,
    refreshAuth,
    checkAuth,
    setUser,
    clearAuth
  }
}) 
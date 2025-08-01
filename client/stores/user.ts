import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  email: string
  roles: string[]
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)

  // Getters
  const isManager = computed(() => {
    return user.value?.roles?.includes('ROLE_MANAGER') || false
  })

  const isPilot = computed(() => {
    return user.value?.roles?.includes('ROLE_PILOT') || false
  })

  const isLoader = computed(() => {
    return user.value?.roles?.includes('ROLE_LOADER') || false
  })

  // Actions
  async function login(email: string, password: string) {
    console.log(email, password)
    try {
      const response = await $fetch('/api/auth', {
        method: 'POST',
        body: { email, password },
      })

      // Check for API-level error
      if ((response as any)?.error) {
        throw new Error((response as any).message || 'Authentication failed')
      }

      // Valid success response
      const { token: receivedToken, user: receivedUser } = response as {
        token: string
        user: User
      }

      if (!receivedToken || !receivedUser) {
        throw new Error('Invalid response format from auth endpoint')
      }

      user.value = receivedUser
      token.value = receivedToken
      isAuthenticated.value = true

      // Store in localStorage if on client
      if (import.meta.client) {
        try {
          localStorage.setItem('auth_token', receivedToken)
          localStorage.setItem('user_data', JSON.stringify(receivedUser))
        } catch (error) {
          console.error('Failed to store in localStorage:', error)
        }
      }

      return response
    } catch (error: any) {
      console.error('Login failed:', error)
      throw new Error(error?.message || 'Login failed')
    }
  }


  function hydrate() {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('user_data')
      const storedToken = localStorage.getItem('auth_token')
      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
        isAuthenticated.value = true
      }
    }
  }

  function getDashboardPath(): string {
    if (isManager.value) return '/manager/dashboard'
    if (isPilot.value) return '/pilot/dashboard'
    if (isLoader.value) return '/loader/dashboard'
    return '/dashboard'
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false

    if (import.meta.client) {
      try {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      } catch (error) {
        console.error('Failed to clear localStorage:', error)
      }
    }
  }

  return { 
    user,
    token,
    isAuthenticated,
    isManager,
    isPilot,
    isLoader,
    login,
    logout,
    getDashboardPath,
    hydrate
  }
})
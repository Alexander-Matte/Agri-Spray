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
    try {
      const response = await $fetch('/api/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response && response.user && response.token) {
        user.value = response.user
        token.value = response.token
        isAuthenticated.value = true

        // Store in localStorage if on client
        if (process.client) {
          try {
            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('user_data', JSON.stringify(response.user))
          } catch (error) {
            console.error('Failed to store in localStorage:', error)
          }
        }

        return response
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
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

    if (process.client) {
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
    getDashboardPath
  }
})
// plugins/init-auth.ts
import { useAuthStore } from '../../stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // Only initialize on client and server once
  try {
    console.log('[Auth Plugin] Initializing authentication state...')
    await authStore.initializeAuth()
    console.log('[Auth Plugin] Auth state:', {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user
    })
  } catch (error) {
    console.error('[Auth Plugin] Failed to initialize auth state:', error)
  }
})

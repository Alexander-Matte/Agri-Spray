import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Check if user has loader role
  if (!authStore.isLoader) {
    // Redirect to appropriate dashboard based on their role
    if (authStore.isManager) {
      return navigateTo('/manager')
    } else if (authStore.isPilot) {
      return navigateTo('/pilot')
    } else {
      return navigateTo('/dashboard')
    }
  }
}) 
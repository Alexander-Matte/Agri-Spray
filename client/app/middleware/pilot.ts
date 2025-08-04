import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Check if user has pilot role
  if (!authStore.isPilot) {
    // Redirect to appropriate dashboard based on their role
    if (authStore.isManager) {
      return navigateTo('/manager')
    } else if (authStore.isLoader) {
      return navigateTo('/loader')
    } else {
      return navigateTo('/dashboard')
    }
  }
}) 
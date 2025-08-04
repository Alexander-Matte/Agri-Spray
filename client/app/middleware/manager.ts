import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  console.log("I am manager middleware")
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Check if user has manager role
  if (!authStore.isManager) {
    // Redirect to appropriate dashboard based on their role
    if (authStore.isPilot) {
      return navigateTo('/pilot')
    } else if (authStore.isLoader) {
      return navigateTo('/loader')
    } else {
      return navigateTo('/dashboard')
    }
  }
}) 
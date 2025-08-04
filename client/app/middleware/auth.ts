import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  console.log("I am auth middleware")
  console.log("Auth state:", {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    hasUser: !!authStore.user
  })
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    console.log("Not authenticated, trying to check auth...")
    // Try to refresh authentication from stored tokens
    const authSuccess = await authStore.checkAuth()
    console.log("Auth check result:", authSuccess)
    
    if (!authSuccess) {
      console.log("Auth check failed, redirecting to login")
      // If still not authenticated, redirect to login
      return navigateTo('/login')
    }
  }

  // If user is authenticated, check if they're trying to access the main dashboard
  if (to.path === '/dashboard') {
    // Redirect to role-specific dashboard
    if (authStore.isManager) {
      return navigateTo('/manager')
    } else if (authStore.isPilot) {
      return navigateTo('/pilot')
    } else if (authStore.isLoader) {
      return navigateTo('/loader')
    }
    // If no specific role, stay on main dashboard
  }

  // Check role-based access for specific routes
  if (to.path.startsWith('/manager') && !authStore.isManager) {
    return navigateTo('/dashboard')
  }
  
  if (to.path.startsWith('/pilot') && !authStore.isPilot) {
    return navigateTo('/dashboard')
  }
  
  if (to.path.startsWith('/loader') && !authStore.isLoader) {
    return navigateTo('/dashboard')
  }

  // If trying to access login page while authenticated, redirect to appropriate dashboard
  if (to.path === '/login' && authStore.isAuthenticated) {
    if (authStore.isManager) {
      return navigateTo('/manager')
    } else if (authStore.isPilot) {
      return navigateTo('/pilot')
    } else if (authStore.isLoader) {
      return navigateTo('/loader')
    }
    return navigateTo('/dashboard')
  }
}) 
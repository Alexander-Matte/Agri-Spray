import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthStore()
  
  // If not authenticated and trying to access protected route
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
}) 
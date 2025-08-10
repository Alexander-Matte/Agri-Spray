// middleware/auth.global.ts
import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Public routes that don’t require auth
  const publicRoutes = ['/', '/login']

  if (publicRoutes.includes(to.path)) {
    if (to.path === '/login' && authStore.isAuthenticated) {
      return navigateTo('/dashboard')
    }
    return
  }

  if (!authStore.isAuthenticated) {
    console.log('User not authenticated — redirecting to login')
    return navigateTo('/login')
  }
})

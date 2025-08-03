<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500">
              Welcome back, {{ user?.email }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <UBadge :color="getRoleColor()" variant="solid">
              {{ getRoleDisplayName() }}
            </UBadge>
            <UButton
              color="primary"
              variant="ghost"
              @click="logout"
              :loading="isLoading"
            >
              Logout
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Role-based Dashboard -->
      <div v-if="isManager" class="space-y-6">
        <ManagerDashboard />
      </div>
      
      <div v-else-if="isPilot" class="space-y-6">
        <PilotDashboard />
      </div>
      
      <div v-else-if="isLoader" class="space-y-6">
        <LoaderDashboard />
      </div>
      
      <div v-else class="space-y-6">
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium text-gray-900">Welcome</h3>
          </template>
          <p class="text-gray-600">
            Your role doesn't have a specific dashboard yet. Please contact your administrator.
          </p>
        </UCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

// Page metadata
definePageMeta({
  middleware: 'auth'
})

// Auth store
const authStore = useAuthStore() as any

// Computed properties
const user = computed(() => authStore.user)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isLoading = computed(() => authStore.isLoading)
const isManager = computed(() => authStore.isManager)
const isPilot = computed(() => authStore.isPilot)
const isLoader = computed(() => authStore.isLoader)

// Methods
const logout = () => authStore.logout()
const checkAuth = () => authStore.checkAuth()

// Methods
const getRoleDisplayName = () => {
  if (isManager.value) return 'Manager'
  if (isPilot.value) return 'Pilot'
  if (isLoader.value) return 'Loader'
  return 'User'
}

const getRoleColor = () => {
  if (isManager.value) return 'info'
  if (isPilot.value) return 'success'
  if (isLoader.value) return 'warning'
  return 'neutral'
}

// Check authentication on page load
onMounted(async () => {
  if (!isAuthenticated.value) {
    const success = await authStore.checkAuth()
    if (!success) {
      await navigateTo('/login')
    }
  }
})
</script> 
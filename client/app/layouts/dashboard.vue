<template>
  <div class="min-h-screen" :class="getBackgroundClass()">
    <!-- Header -->
    <header class="shadow" :class="getHeaderClass()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-white" />
              <span class="text-xl font-bold text-white">Agri-Spray</span>
            </NuxtLink>
            <div class="hidden md:block">
              <h1 class="text-2xl font-bold" :class="getTitleClass()">
                {{ getDashboardTitle() }}
              </h1>
              <p class="text-sm" :class="getSubtitleClass()">
                Welcome back, {{ user?.email || 'User' }}
                <span v-if="isDemoUser" class="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  Demo Mode
                </span>
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <UBadge :color="getRoleColor()" variant="solid">
              {{ getRoleDisplayName() }}
            </UBadge>
            <UButton
              :color="getButtonColor()"
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

    <!-- Navigation Tabs -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <NuxtLink
            to="/dashboard"
            class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
            :class="{ 'border-green-500 text-green-600': $route?.path === '/dashboard' }"
          >
            Dashboard
          </NuxtLink>
          
          <!-- Role-specific navigation -->
          <template v-if="isManager">
            <NuxtLink
              to="/manager/users"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/manager') }"
            >
              Users
            </NuxtLink>
            <NuxtLink
              to="/manager/aircraft"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/manager') }"
            >
              Aircraft
            </NuxtLink>
            <NuxtLink
              to="/manager/missions"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/manager') }"
            >
              Missions
            </NuxtLink>
            <NuxtLink
              to="/manager/loads"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/manager') }"
            >
              Loads
            </NuxtLink>
            <NuxtLink
              to="/manager/reports"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/manager') }"
            >
              Reports
            </NuxtLink>
          </template>
          
          <template v-if="isPilot">
            <NuxtLink
              to="/pilot/missions"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/pilot') }"
            >
              Missions
            </NuxtLink>
            <NuxtLink
              to="/pilot/aircraft"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/pilot') }"
            >
              Aircraft
            </NuxtLink>
          </template>
          
          <template v-if="isLoader">
            <NuxtLink
              to="/loader/loads"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/loader') }"
            >
              Loads
            </NuxtLink>
            <NuxtLink
              to="/loader/chemicals"
              class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              :class="{ 'border-green-500 text-green-600': $route?.path?.startsWith('/loader') }"
            >
              Chemicals
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Slot for page content -->
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { navigateTo } from '#app'

// Auth store
const authStore = useAuthStore() as any

// Computed properties
const user = computed(() => authStore.user)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isLoading = computed(() => authStore.isLoading)
const isManager = computed(() => {
  if (!user.value?.roles) return false
  const roles = Array.isArray(user.value.roles) ? user.value.roles : [user.value.roles]
  return roles.some((role: string) => role && typeof role === 'string' && (role.includes('ROLE_MANAGER') || role.includes('ROLE_DEMO_MANAGER')))
})
const isPilot = computed(() => {
  if (!user.value?.roles) return false
  const roles = Array.isArray(user.value.roles) ? user.value.roles : [user.value.roles]
  return roles.some((role: string) => role && typeof role === 'string' && (role.includes('ROLE_PILOT') || role.includes('ROLE_DEMO_PILOT')))
})
const isLoader = computed(() => {
  if (!user.value?.roles) return false
  const roles = Array.isArray(user.value.roles) ? user.value.roles : [user.value.roles]
  return roles.some((role: string) => role && typeof role === 'string' && (role.includes('ROLE_LOADER') || role.includes('ROLE_DEMO_LOADER')))
})

// Check if user is a demo user
const isDemoUser = computed(() => {
  if (!user.value?.roles) return false
  // Ensure roles is an array before calling .some()
  const roles = Array.isArray(user.value.roles) ? user.value.roles : [user.value.roles]
  return roles.some((role: string) => role && typeof role === 'string' && role.includes('DEMO'))
})

// Methods
const logout = () => authStore.logout()

const getDashboardTitle = () => {
  if (isDemoUser.value) {
    if (isManager.value) return 'Demo Manager Dashboard'
    if (isPilot.value) return 'Demo Pilot Dashboard'
    if (isLoader.value) return 'Demo Loader Dashboard'
  } else {
    if (isManager.value) return 'Manager Dashboard'
    if (isPilot.value) return 'Pilot Dashboard'
    if (isLoader.value) return 'Loader Dashboard'
  }
  return 'Dashboard'
}

const getRoleDisplayName = () => {
  if (isDemoUser.value) {
    if (isManager.value) return 'Demo Manager'
    if (isPilot.value) return 'Demo Pilot'
    if (isLoader.value) return 'Demo Loader'
  } else {
    if (isManager.value) return 'Manager'
    if (isPilot.value) return 'Pilot'
    if (isLoader.value) return 'Loader'
  }
  return 'User'
}

const getRoleColor = () => {
  if (isDemoUser.value) return 'warning'
  if (isManager.value) return 'primary'
  if (isPilot.value) return 'secondary'
  if (isLoader.value) return 'warning'
  return 'neutral'
}

const getButtonColor = () => {
  if (isDemoUser.value) return 'warning'
  return 'primary'
}

const getBackgroundClass = () => {
  if (isDemoUser.value) {
    return 'bg-gradient-to-br from-yellow-50 to-orange-50'
  }
  return 'bg-gray-50'
}

const getHeaderClass = () => {
  if (isDemoUser.value) {
    return 'bg-gradient-to-r from-yellow-400 to-orange-400'
  }
  return 'bg-gradient-to-r from-green-600 to-blue-600'
}

const getTitleClass = () => {
  if (isDemoUser.value) {
    return 'text-white'
  }
  return 'text-white'
}

const getSubtitleClass = () => {
  if (isDemoUser.value) {
    return 'text-yellow-100'
  }
  return 'text-blue-100'
}

// Check authentication on layout load
onMounted(async () => {
  try {
    if (!isAuthenticated.value) {
      const success = await authStore.checkAuth()
      if (!success) {
        await navigateTo('/login')
      }
    }
  } catch (error) {
    console.error('Error during authentication check:', error)
    // Fallback to login if there's an error
    await navigateTo('/login')
  }
})
</script>

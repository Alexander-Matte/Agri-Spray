<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Loader Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500">
              Welcome back, {{ user?.email }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <UBadge color="warning" variant="solid">
              Loader
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
      <LoaderDashboard />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth'

// Page metadata
definePageMeta({
  middleware: 'loader'
})

// Auth store
const authStore = useAuthStore()

// Computed properties
const user = computed(() => authStore.user)
const isLoading = computed(() => authStore.isLoading)

// Methods
const logout = () => authStore.logout()
</script> 
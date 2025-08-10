<template>
  <div>
    <!-- Role-based Dashboard Content -->
    <div v-if="isManager" class="space-y-6">
      <ManagerDashboard :isDemo="isDemoUser" />
    </div>
    
    <div v-else-if="isPilot" class="space-y-6">
      <PilotDashboard :isDemo="isDemoUser" />
    </div>
    
    <div v-else-if="isLoader" class="space-y-6">
      <LoaderDashboard :isDemo="isDemoUser" />
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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Auth store
const authStore = useAuthStore() as any

// Computed properties
const isManager = computed(() => authStore.isManager)
const isPilot = computed(() => authStore.isPilot)
const isLoader = computed(() => authStore.isLoader)

// Check if user is a demo user
const isDemoUser = computed(() => {
  const user = authStore.user
  if (!user?.roles) return false
  return user.roles.some((role: string) => role.includes('DEMO'))
})
</script> 
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-green-600" />
              <span class="text-xl font-bold text-gray-900">Agri-Spray</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ userStore.user?.email }}</span>
            <UButton
              @click="userStore.logout"
              color="gray"
              variant="outline"
              size="sm"
            >
              Logout
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Manage your agricultural spraying operations</p>
      </div>

      <!-- Error Display -->
      <div v-if="currentError" class="mb-6 px-4 sm:px-0">
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-red-400" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <p class="mt-1 text-sm text-red-700">{{ currentError.message }}</p>
            </div>
            <div class="ml-auto pl-3">
              <UButton
                @click="clearError"
                size="xs"
                color="red"
                variant="outline"
              >
                Dismiss
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="mb-6 px-4 sm:px-0">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-path" class="h-6 w-6 text-gray-400 animate-spin" />
            <span class="ml-2 text-gray-600">Loading missions...</span>
          </div>
        </div>
      </div>

      <!-- Missions Section -->
      <div v-else class="px-4 sm:px-0">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">Recent Missions</h2>
              <UButton
                @click="fetchMissions"
                color="primary"
                size="sm"
                :loading="isLoading"
              >
                Refresh
              </UButton>
            </div>
          </div>

          <!-- Missions List -->
          <div class="divide-y divide-gray-200">
            <div v-if="missions.length === 0" class="px-6 py-8 text-center">
              <UIcon name="i-heroicons-document-text" class="h-12 w-12 text-gray-400 mx-auto" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No missions</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by creating your first mission.</p>
            </div>

            <div
              v-for="mission in missions"
              :key="mission.id"
              class="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">{{ mission.title }}</h3>
                  <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="h-4 w-4 mr-1" />
                      {{ mission.location }}
                    </span>
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-calendar" class="h-4 w-4 mr-1" />
                      {{ new Date(mission.scheduledAt).toLocaleDateString() }}
                    </span>
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-square-3-stack-3d" class="h-4 w-4 mr-1" />
                      {{ mission.fieldSizeTotal }} ha
                    </span>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': mission.status === 'completed',
                      'bg-yellow-100 text-yellow-800': mission.status === 'in_progress',
                      'bg-blue-100 text-blue-800': mission.status === 'planned',
                      'bg-red-100 text-red-800': mission.status === 'cancelled'
                    }"
                    class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                  >
                    {{ mission.status }}
                  </span>
                  <UButton
                    size="xs"
                    variant="outline"
                    @click="fetchMission(mission.id)"
                  >
                    View
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Mission Details -->
      <div v-if="currentMission" class="mt-6 px-4 sm:px-0">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Mission Details</h2>
          </div>
          <div class="px-6 py-4">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Title</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentMission.title }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Type</dt>
                <dd class="mt-1 text-sm text-gray-900 capitalize">{{ currentMission.type }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Location</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentMission.location }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1 text-sm text-gray-900 capitalize">{{ currentMission.status }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Total Field Size</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentMission.fieldSizeTotal }} hectares</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Sprayable Area</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentMission.fieldSizeSprayable }} hectares</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const { 
  missions, 
  currentMission, 
  isLoading, 
  currentError,
  fetchMissions, 
  fetchMission,
  clearError 
} = useMissions()

// Load missions on page mount
onMounted(async () => {
  // Redirect managers to their specific dashboard
  if (userStore.isManager) {
    await navigateTo('/manager/dashboard')
    return
  }

  // Redirect pilots to their specific dashboard
  if (userStore.isPilot) {
    await navigateTo('/pilot/dashboard')
    return
  }

  // Redirect loaders to their specific dashboard
  if (userStore.isLoader) {
    await navigateTo('/loader/dashboard')
    return
  }
  
  await fetchMissions()
})
</script> 
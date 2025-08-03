<template>
  <div class="space-y-6">
    <!-- Loader Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-beaker" class="h-8 w-8 text-primary" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Loads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingLoads || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-clock" class="h-8 w-8 text-success" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Today's Loads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.todayLoads || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-check-circle" class="h-8 w-8 text-info" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Completed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.completedLoads || 0 }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Current Loads -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Current Loads</h3>
          <UButton
            color="neutral"
            variant="ghost"
            @click="navigateTo('/loader/loads')"
          >
            View All
          </UButton>
        </div>
      </template>
      
      <div v-if="currentLoads.length === 0" class="text-center py-8">
        <UIcon name="i-heroicons-beaker" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No current loads</h3>
        <p class="mt-1 text-sm text-gray-500">All loads are up to date!</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="load in currentLoads"
          :key="load.id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <UBadge :color="getLoadStatusColor(load.status)" variant="solid">
                {{ load.status }}
              </UBadge>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">{{ load.chemicalMix }}</h4>
              <p class="text-sm text-gray-500">{{ load.volume }}L - {{ load.applicationRate }}L/ha</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">{{ formatDate(load.preparedAt) }}</span>
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              @click="navigateTo(`/loader/loads/${load.id}`)"
            >
              View
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UButton
          color="primary"
          variant="solid"
          @click="navigateTo('/loader/loads/create')"
        >
          <UIcon name="i-heroicons-plus" class="mr-2 h-4 w-4" />
          Prepare New Load
        </UButton>
        
        <UButton
          color="success"
          variant="solid"
          @click="navigateTo('/loader/chemicals')"
        >
          <UIcon name="i-heroicons-beaker" class="mr-2 h-4 w-4" />
          Chemical Inventory
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/app/composables/useApi'

// API
const { get } = useApi()

const currentLoads = ref([])
const stats = ref({
  pendingLoads: 0,
  todayLoads: 0,
  completedLoads: 0
})

// Load data on mount
onMounted(async () => {
  try {
    const loadsData = await get('/api/loads?status=prepared&limit=5')
    currentLoads.value = loadsData || []
    
    // Calculate stats
    stats.value.pendingLoads = currentLoads.value.length
    stats.value.todayLoads = 0 // This would come from API
    stats.value.completedLoads = 0 // This would come from API
  } catch (error) {
    console.error('Failed to load loader dashboard data:', error)
  }
})

// Helper methods
const getLoadStatusColor = (status: string) => {
  switch (status) {
    case 'prepared': return 'primary'
    case 'loaded': return 'warning'
    case 'applied': return 'success'
    case 'completed': return 'info'
    default: return 'neutral'
  }
}

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}
</script> 
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Load Management</h2>
          <p class="text-gray-600 mt-1">
            Prepare and track chemical loads for spraying missions
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
        >
          Prepare New Load
        </UButton>
      </div>
    </div>

    <!-- Load Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
            <UIcon name="i-heroicons-clock" class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Preparing</h3>
          <p class="text-3xl font-bold text-blue-600">{{ preparingLoads }}</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100">
            <UIcon name="i-heroicons-truck" class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Ready</h3>
          <p class="text-3xl font-bold text-green-600">{{ readyLoads }}</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
            <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6 text-purple-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">In Use</h3>
          <p class="text-3xl font-bold text-purple-600">{{ inUseLoads }}</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100">
            <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-gray-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Completed</h3>
          <p class="text-3xl font-bold text-gray-600">{{ completedLoads }}</p>
        </div>
      </UCard>
    </div>

    <!-- Loads List -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Recent Loads</h3>
      </template>
      
      <div class="space-y-4">
        <div v-for="load in loads" :key="load.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h4 class="text-lg font-medium text-gray-900">{{ load.name }}</h4>
                <UBadge :color="getStatusColor(load.status)" variant="solid">
                  {{ load.status }}
                </UBadge>
              </div>
              <p class="text-gray-600 mt-1">{{ load.description }}</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-beaker" class="h-4 w-4 mr-2 text-gray-500" />
                  <span class="text-gray-700">{{ load.chemical }}</span>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-scale" class="h-4 w-4 mr-2 text-gray-500" />
                  <span class="text-gray-700">{{ load.volume }}</span>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-calendar" class="h-4 w-4 mr-2 text-gray-500" />
                  <span class="text-gray-700">{{ load.date }}</span>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-user" class="h-4 w-4 mr-2 text-gray-500" />
                  <span class="text-gray-700">{{ load.pilot }}</span>
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <UButton
                v-if="load.status === 'preparing'"
                size="sm"
                color="success"
                variant="solid"
                icon="i-heroicons-check"
              >
                Mark Ready
              </UButton>
              <UButton
                v-if="load.status === 'ready'"
                size="sm"
                color="warning"
                    variant="solid"
                icon="i-heroicons-truck"
              >
                Dispatch
              </UButton>
              <UButton
                size="sm"
                variant="ghost"
                color="primary"
                icon="i-heroicons-eye"
              >
                View
              </UButton>
                              <UButton
                  size="sm"
                  variant="ghost"
                  color="error"
                  icon="i-heroicons-trash"
                >
                  Delete
                </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Sample load data
const loads = ref([
  {
    id: 1,
    name: 'Herbicide Load #HL-001',
    description: 'Glyphosate-based herbicide for wheat field weed control',
    status: 'preparing',
    chemical: 'Glyphosate 41%',
    volume: '100 gallons',
    date: 'Today',
    pilot: 'Sarah Pilot'
  },
  {
    id: 2,
    name: 'Fertilizer Load #FL-002',
    description: 'Liquid nitrogen fertilizer for corn field application',
    status: 'ready',
    chemical: 'UAN 32%',
    volume: '150 gallons',
    date: 'Today',
    pilot: 'Mike Pilot'
  },
  {
    id: 3,
    name: 'Insecticide Load #IL-003',
    description: 'Pyrethroid insecticide for soybean pest control',
    status: 'in use',
    chemical: 'Lambda-cyhalothrin',
    volume: '75 gallons',
    date: 'Yesterday',
    pilot: 'John Pilot'
  },
  {
    id: 4,
    name: 'Fungicide Load #FGL-004',
    description: 'Triazole fungicide for disease prevention',
    status: 'completed',
    chemical: 'Tebuconazole',
    volume: '50 gallons',
    date: '2 days ago',
    pilot: 'Sarah Pilot'
  }
])

// Computed properties for stats
const preparingLoads = computed(() => loads.value.filter(l => l.status === 'preparing').length)
const readyLoads = computed(() => loads.value.filter(l => l.status === 'ready').length)
const inUseLoads = computed(() => loads.value.filter(l => l.status === 'in use').length)
const completedLoads = computed(() => loads.value.filter(l => l.status === 'completed').length)

const getStatusColor = (status: string) => {
  const colors: Record<string, 'warning' | 'success' | 'info' | 'neutral'> = {
    'preparing': 'warning',
    'ready': 'success',
    'in use': 'info',
    'completed': 'neutral'
  }
  return colors[status] || 'neutral'
}
</script>

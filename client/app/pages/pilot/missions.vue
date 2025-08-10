<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">My Missions</h2>
          <p class="text-gray-600 mt-1">
            View and manage your assigned spraying missions
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
        >
          New Mission
        </UButton>
      </div>
    </div>

    <!-- Mission Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
            <UIcon name="i-heroicons-clock" class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Pending</h3>
          <p class="text-3xl font-bold text-blue-600">{{ pendingMissions }}</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100">
            <UIcon name="i-heroicons-play" class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Active</h3>
          <p class="text-3xl font-bold text-green-600">{{ activeMissions }}</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
            <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-purple-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Completed</h3>
          <p class="text-3xl font-bold text-purple-600">{{ completedMissions }}</p>
        </div>
      </UCard>
    </div>

    <!-- Missions List -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Recent Missions</h3>
      </template>
      
      <div class="space-y-4">
        <div v-for="mission in missions" :key="mission.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h4 class="text-lg font-medium text-gray-900">{{ mission.title }}</h4>
                <UBadge :color="getStatusColor(mission.status)" variant="solid">
                  {{ mission.status }}
                </UBadge>
              </div>
              <p class="text-gray-600 mt-1">{{ mission.description }}</p>
              <div class="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                <span class="flex items-center">
                  <UIcon name="i-heroicons-map-pin" class="h-4 w-4 mr-1" />
                  {{ mission.location }}
                </span>
                <span class="flex items-center">
                  <UIcon name="i-heroicons-calendar" class="h-4 w-4 mr-1" />
                  {{ mission.date }}
                </span>
                <span class="flex items-center">
                  <UIcon name="i-heroicons-clock" class="h-4 w-4 mr-1" />
                  {{ mission.duration }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2">
              <UButton
                v-if="mission.status === 'pending'"
                size="sm"
                color="success"
                variant="solid"
                icon="i-heroicons-play"
              >
                Start
              </UButton>
              <UButton
                v-if="mission.status === 'active'"
                size="sm"
                color="warning"
                variant="solid"
                icon="i-heroicons-pause"
              >
                Pause
              </UButton>
              <UButton
                v-if="mission.status === 'active'"
                size="sm"
                color="success"
                variant="solid"
                icon="i-heroicons-check"
              >
                Complete
              </UButton>
              <UButton
                size="sm"
                variant="ghost"
                color="primary"
                icon="i-heroicons-eye"
              >
                View
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

// Sample mission data
const missions = ref([
  {
    id: 1,
    title: 'Wheat Field Spraying - North Section',
    description: 'Herbicide application for weed control in wheat field',
    status: 'pending',
    location: 'North Farm, Field A',
    date: 'Today',
    duration: '2 hours'
  },
  {
    id: 2,
    title: 'Corn Field Fertilizer Application',
    description: 'Liquid fertilizer application for corn growth',
    status: 'active',
    location: 'East Farm, Field B',
    date: 'Today',
    duration: '3 hours'
  },
  {
    id: 3,
    title: 'Soybean Pest Control',
    description: 'Insecticide application for soybean pest management',
    status: 'completed',
    location: 'South Farm, Field C',
    date: 'Yesterday',
    duration: '1.5 hours'
  }
])

// Computed properties for stats
const pendingMissions = computed(() => missions.value.filter(m => m.status === 'pending').length)
const activeMissions = computed(() => missions.value.filter(m => m.status === 'active').length)
const completedMissions = computed(() => missions.value.filter(m => m.status === 'completed').length)

const getStatusColor = (status: string) => {
  const colors = {
    'pending': 'warning',
    'active': 'success',
    'completed': 'info'
  }
  return colors[status as keyof typeof colors] || 'neutral'
}
</script>

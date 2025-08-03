<template>
  <div class="space-y-6">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-airplane" class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Missions</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.activeMissions || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-users" class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Available Pilots</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.availablePilots || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-truck" class="h-8 w-8 text-orange-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Available Aircraft</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.availableAircraft || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-calendar" class="h-8 w-8 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Today's Missions</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.todayMissions || 0 }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UButton
          color="blue"
          variant="solid"
          @click="navigateTo('/manager/missions/create')"
        >
          <UIcon name="i-heroicons-plus" class="mr-2 h-4 w-4" />
          Create Mission
        </UButton>
        
        <UButton
          color="green"
          variant="solid"
          @click="navigateTo('/manager/aircraft')"
        >
          <UIcon name="i-heroicons-airplane" class="mr-2 h-4 w-4" />
          Manage Aircraft
        </UButton>
        
        <UButton
          color="orange"
          variant="solid"
          @click="navigateTo('/manager/pilots')"
        >
          <UIcon name="i-heroicons-users" class="mr-2 h-4 w-4" />
          Manage Pilots
        </UButton>
      </div>
    </UCard>

    <!-- Recent Missions -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Recent Missions</h3>
          <UButton
            color="gray"
            variant="ghost"
            @click="navigateTo('/manager/missions')"
          >
            View All
          </UButton>
        </div>
      </template>
      
      <div v-if="missions.length === 0" class="text-center py-8">
        <UIcon name="i-heroicons-information-circle" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No missions</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new mission.</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="mission in missions"
          :key="mission.id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <UBadge :color="getStatusColor(mission.status)" variant="solid">
                {{ mission.status }}
              </UBadge>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900">{{ mission.title }}</h4>
              <p class="text-sm text-gray-500">{{ mission.customer?.name }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">{{ formatDate(mission.scheduledDate) }}</span>
            <UButton
              color="gray"
              variant="ghost"
              size="sm"
              @click="navigateTo(`/manager/missions/${mission.id}`)"
            >
              View
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">


// Mission data
const { getMissions, getDashboardStats } = useMissions()

const missions = ref([])
const stats = ref({
  activeMissions: 0,
  availablePilots: 0,
  availableAircraft: 0,
  todayMissions: 0
})

// Load data on mount
onMounted(async () => {
  try {
    const [missionsData, statsData] = await Promise.all([
      getMissions({ limit: 5 }),
      getDashboardStats()
    ])
    
    missions.value = missionsData || []
    stats.value = statsData || stats.value
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  }
})

// Helper methods
const getStatusColor = (status: string) => {
  switch (status) {
    case 'planned': return 'blue'
    case 'in_progress': return 'yellow'
    case 'completed': return 'green'
    case 'cancelled': return 'red'
    default: return 'gray'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script> 
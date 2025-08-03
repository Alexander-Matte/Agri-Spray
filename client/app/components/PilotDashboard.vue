<template>
  <div class="space-y-6">
    <!-- Pilot Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-airplane" class="h-8 w-8 text-primary" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Today's Missions</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.todayMissions || 0 }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-clock" class="h-8 w-8 text-success" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Flight Hours</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.flightHours || 0 }}h</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.completedMissions || 0 }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Current Mission -->
    <UCard v-if="currentMission">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Current Mission</h3>
      </template>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-lg font-medium text-gray-900">{{ currentMission.title }}</h4>
            <p class="text-sm text-gray-500">{{ currentMission.customer?.name }}</p>
          </div>
          <UBadge color="warning" variant="solid">
            {{ currentMission.status }}
          </UBadge>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium text-gray-500">Location:</span>
            <span class="ml-2 text-gray-900">{{ currentMission.location }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-500">Duration:</span>
            <span class="ml-2 text-gray-900">{{ currentMission.estimatedDuration }}h</span>
          </div>
        </div>
        
        <div class="flex space-x-2">
          <UButton
            color="success"
            variant="solid"
            @click="startMission(currentMission.id)"
          >
            Start Mission
          </UButton>
          <UButton
            color="info"
            variant="outline"
            @click="navigateTo(`/pilot/missions/${currentMission.id}`)"
          >
            View Details
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Upcoming Missions -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Upcoming Missions</h3>
          <UButton
            color="neutral"
            variant="ghost"
            @click="navigateTo('/pilot/missions')"
          >
            View All
          </UButton>
        </div>
      </template>
      
      <div v-if="upcomingMissions.length === 0" class="text-center py-8">
        <UIcon name="i-heroicons-calendar" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No upcoming missions</h3>
        <p class="mt-1 text-sm text-gray-500">You're all caught up!</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="mission in upcomingMissions"
          :key="mission.id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <UBadge color="primary" variant="solid">
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
              color="neutral"
              variant="ghost"
              size="sm"
              @click="navigateTo(`/pilot/missions/${mission.id}`)"
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
const { getMissions } = useMissions()

const currentMission = ref<Mission | null>(null)
const upcomingMissions = ref<Mission[]>([])
const stats = ref({
  todayMissions: 0,
  flightHours: 0,
  completedMissions: 0
})

// Load data on mount
onMounted(async () => {
  try {
    const [currentData, upcomingData] = await Promise.all([
      getMissions({ status: 'in_progress', limit: 1 }),
      getMissions({ status: 'planned', limit: 5 })
    ])
    
    currentMission.value = currentData?.[0] || null
    upcomingMissions.value = upcomingData || []
    
    // Calculate stats
    stats.value.todayMissions = upcomingMissions.value.length
    stats.value.completedMissions = 0 // This would come from API
    stats.value.flightHours = 0 // This would come from API
  } catch (error) {
    console.error('Failed to load pilot dashboard data:', error)
  }
})

// Methods
const startMission = async (missionId: number) => {
  // Implementation for starting a mission
  console.log('Starting mission:', missionId)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script> 
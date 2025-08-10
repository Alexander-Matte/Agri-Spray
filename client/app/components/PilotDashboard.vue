<template>
  <div class="space-y-6">
    <!-- Demo Mode Banner -->
    <div v-if="isDemo" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div class="flex items-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-400 mr-2" />
        <div>
          <h3 class="text-sm font-medium text-yellow-800">Demo Mode</h3>
          <p class="text-sm text-yellow-700 mt-1">
            This is a demonstration dashboard. All data shown is sample data and cannot be modified.
          </p>
        </div>
      </div>
    </div>

    <!-- Dashboard Header -->
    <div class="bg-white rounded-lg shadow p-6" :class="{ 'border-2 border-yellow-200': isDemo }">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isDemo ? 'Demo ' : '' }}Pilot Dashboard
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isDemo ? 'Sample flight data for demonstration purposes' : 'Your flight missions and aircraft status' }}
          </p>
        </div>
        <UButton
          :color="isDemo ? 'warning' : 'primary'"
          variant="solid"
          @click="refreshData"
        >
          <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-2" />
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Flight Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-blue-100'">
            <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-blue-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Today's Flights</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-blue-600'">
            {{ isDemo ? '3' : '2' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample flights' : 'Scheduled flights' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-green-100'">
            <UIcon name="i-heroicons-clock" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-green-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Flight Hours</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-green-600'">
            {{ isDemo ? '156' : '142' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample hours' : 'This month' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-purple-100'">
            <UIcon name="i-heroicons-map" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Coverage Area</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'">
            {{ isDemo ? '450' : '380' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample acres' : 'Acres covered' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-red-100'">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-red-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Alerts</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-red-600'">
            {{ isDemo ? '2' : '1' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample alerts' : 'Require attention' }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Current Mission -->
    <UCard :class="{ 'border-2 border-yellow-200': isDemo }">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Current Mission
        </h3>
      </template>
      <div v-if="currentMission" class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-lg font-medium text-gray-900">{{ currentMission.title }}</h4>
            <p class="text-sm text-gray-500">{{ currentMission.customer }}</p>
          </div>
          <UBadge :color="getStatusColor(currentMission.status)" variant="solid">
            {{ currentMission.status }}
          </UBadge>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-500">Aircraft</p>
            <p class="text-sm text-gray-900">{{ currentMission.aircraft }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Location</p>
            <p class="text-sm text-gray-900">{{ currentMission.location }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Progress</p>
            <p class="text-sm text-gray-900">{{ currentMission.progress }}%</p>
          </div>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-300" 
            :class="getProgressColor(currentMission.progress)"
            :style="{ width: currentMission.progress + '%' }"
          ></div>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <UIcon name="i-heroicons-information-circle" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No active mission</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ isDemo ? 'Sample: No missions scheduled for today' : 'No missions scheduled for today' }}
        </p>
      </div>
    </UCard>

    <!-- Recent Flights -->
    <UCard :class="{ 'border-2 border-yellow-200': isDemo }">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Recent Flights
        </h3>
      </template>
      <div class="space-y-4">
        <div v-for="(flight, index) in recentFlights" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getFlightColor(flight.type)">
              <UIcon :name="getFlightIcon(flight.type)" class="h-4 w-4 text-white" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ flight.title }}</p>
              <p class="text-sm text-gray-500">{{ flight.duration }} • {{ flight.area }} acres</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ flight.date }}</p>
            <UBadge :color="getStatusColor(flight.status)" variant="solid" size="sm">
              {{ flight.status }}
            </UBadge>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  isDemo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDemo: false
})

// Sample data for demo mode
const currentMission = computed(() => {
  if (props.isDemo) {
    return {
      title: 'Sample Spray Mission #SP-002',
      customer: 'Sample Farm Co.',
      aircraft: 'Sample Aircraft A-001',
      location: 'Sample Field, Sample County',
      status: 'in_progress',
      progress: 65
    }
  }
  
  // Real data would come from API
  return {
    title: 'Spray Mission #SP-002',
    customer: 'Green Acres Farm',
    aircraft: 'Aircraft A-001',
    location: 'North Field, Johnson County',
    status: 'in_progress',
    progress: 65
  }
})

const recentFlights = computed(() => {
  if (props.isDemo) {
    return [
      {
        type: 'spray',
        title: 'Sample Spray Mission #SP-001',
        duration: '2h 15m',
        area: '120',
        date: 'Today',
        status: 'completed'
      },
      {
        type: 'survey',
        title: 'Sample Survey Flight #SF-003',
        duration: '1h 30m',
        area: '85',
        date: 'Yesterday',
        status: 'completed'
      },
      {
        type: 'spray',
        title: 'Sample Spray Mission #SP-004',
        duration: '3h 45m',
        area: '200',
        date: '2 days ago',
        status: 'completed'
      }
    ]
  }
  
  // Real data would come from API
  return [
    {
      type: 'spray',
      title: 'Spray Mission #SP-001',
      duration: '2h 15m',
      area: '120',
      date: 'Today',
      status: 'completed'
    },
    {
      type: 'survey',
      title: 'Survey Flight #SF-003',
      duration: '1h 30m',
      area: '85',
      date: 'Yesterday',
      status: 'completed'
    },
    {
      type: 'spray',
      title: 'Spray Mission #SP-004',
      duration: '3h 45m',
      area: '200',
      date: '2 days ago',
      status: 'completed'
    }
  ]
})

// Methods
const refreshData = () => {
  // In demo mode, just show a message
  if (props.isDemo) {
    alert('Demo mode: Data refresh simulated')
    return
  }
  
  // Real implementation would refresh data from API
  console.log('Refreshing data...')
}

const getStatusColor = (status: string) => {
  const colors = {
    planned: 'blue',
    in_progress: 'yellow',
    completed: 'green',
    cancelled: 'red'
  }
  return colors[status as keyof typeof colors] || 'gray'
}

const getProgressColor = (progress: number) => {
  if (progress < 25) return 'bg-red-500'
  if (progress < 50) return 'bg-yellow-500'
  if (progress < 75) return 'bg-blue-500'
  return 'bg-green-500'
}

const getFlightColor = (type: string) => {
  const colors = {
    spray: 'bg-green-500',
    survey: 'bg-blue-500',
    emergency: 'bg-red-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const getFlightIcon = (type: string) => {
  const icons = {
    spray: 'i-heroicons-paper-airplane',
    survey: 'i-heroicons-map',
    emergency: 'i-heroicons-exclamation-triangle'
  }
  return icons[type as keyof typeof icons] || 'i-heroicons-information-circle'
}
</script> 
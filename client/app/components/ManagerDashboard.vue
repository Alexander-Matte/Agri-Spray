<template>
  <div class="space-y-6 manager-dashboard-component">
    <!-- Demo Mode Banner -->
    <div v-if="isDemo" class="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
      <div class="flex items-center">
        <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-yellow-400 mr-2" />
        <div>
          <h3 class="text-sm font-medium text-yellow-800">Demo Mode</h3>
          <p class="text-sm text-yellow-700 mt-1">
            This is a demonstration dashboard. You can perform all manager actions to explore the system functionality.
          </p>
        </div>
      </div>
    </div>

    <!-- Dashboard Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isDemo ? 'Demo ' : '' }}Manager Dashboard
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isDemo ? 'Full-featured demonstration dashboard - explore all manager capabilities' : 'Overview of your operations and team' }}
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          @click="refreshData"
        >
          <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-2" />
          Refresh
        </UButton>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard 
        class="text-center" 
        :class="{ 'border-2': isDemo }"
      >
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-green-100'">
            <UIcon name="i-heroicons-users" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-green-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Team Members</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-green-600'">
            {{ isDemo ? '12' : '8' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample team size' : 'Active team members' }}
          </p>
        </div>
      </UCard>

      <UCard 
        class="text-center" 
        :class="{ 'border-2': isDemo }"
      >
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-green-100'">
            <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-green-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Active Missions</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-green-600'">
            {{ isDemo ? '5' : '3' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample missions' : 'Currently running' }}
          </p>
        </div>
      </UCard>

      <UCard 
        class="text-center" 
        :class="{ 'border-2': isDemo }"
      >
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-purple-100'">
            <UIcon name="i-heroicons-truck" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Aircraft</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'">
            {{ isDemo ? '8' : '4' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample fleet size' : 'Available aircraft' }}
          </p>
        </div>
      </UCard>

      <UCard 
        class="text-center" 
        :class="{ 'border-2': isDemo }"
      >
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-red-100'">
            <UIcon name="i-heroicons-clock" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-red-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Pending Tasks</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-red-600'">
            {{ isDemo ? '15' : '7' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample tasks' : 'Require attention' }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <UCard 
      :class="{ 'border-2': isDemo }"
    >
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Recent Activity
        </h3>
      </template>
      <div class="space-y-4">
        <div v-for="(activity, index) in (safeRecentActivities || [])" :key="index" class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getActivityColor(activity?.type || 'default')">
              <UIcon :name="getActivityIcon(activity?.type || 'default')" class="h-4 w-4 text-white" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">{{ activity?.title || 'Unknown Activity' }}</p>
            <p class="text-sm text-gray-500">{{ activity?.description || 'No description available' }}</p>
          </div>
          <div class="flex-shrink-0">
            <span class="text-sm text-gray-500">{{ activity?.time || 'Unknown time' }}</span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

// Props
interface Props {
  isDemo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDemo: false
})

// Component lifecycle
onMounted(() => {
  console.log('ManagerDashboard component mounted, isDemo:', props.isDemo)
})

// Sample data for demo mode
const recentActivities = computed(() => {
  try {
    if (props.isDemo) {
      return [
        {
          type: 'mission',
          title: 'Mission Completed',
          description: 'Sample mission #SP-001 completed successfully',
          time: '2 hours ago'
        },
        {
          type: 'maintenance',
          title: 'Aircraft Maintenance',
          description: 'Sample aircraft maintenance scheduled',
          time: '4 hours ago'
        },
        {
          type: 'team',
          title: 'Team Update',
          description: 'Sample team member status updated',
          time: '6 hours ago'
        }
      ]
    }
    
    // Real data would come from API
    return [
      {
        type: 'mission',
        title: 'Mission Completed',
        description: 'Mission #SP-001 completed successfully',
        time: '2 hours ago'
      },
      {
        type: 'maintenance',
        title: 'Aircraft Maintenance',
        description: 'Aircraft maintenance scheduled',
        time: '4 hours ago'
      },
      {
        type: 'team',
        title: 'Team Update',
        description: 'Team member status updated',
        time: '6 hours ago'
      }
    ]
  } catch (error) {
    console.error('Error in recentActivities computed:', error)
    // Return empty array as fallback
    return []
  }
})

// Safe access to recentActivities with fallback
const safeRecentActivities = computed(() => {
  return recentActivities.value || []
})

// Methods
const refreshData = () => {
  try {
    // Show a message for demo mode
    if (props.isDemo) {
      alert('Demo mode: Data refresh simulated')
    } else {
      // Real implementation would refresh data from API
      console.log('Refreshing data...')
    }
  } catch (error) {
    console.error('Error in refreshData:', error)
    // Fallback behavior
    alert('Error refreshing data. Please try again.')
  }
}

const getActivityColor = (type: string) => {
  const colors = {
    mission: 'bg-primary-500',
    maintenance: 'bg-secondary-500',
    team: 'bg-green-600',
    default: 'bg-gray-500'
  }
  return colors[type as keyof typeof colors] || colors.default
}

const getActivityIcon = (type: string) => {
  const icons = {
    mission: 'i-heroicons-paper-airplane',
    maintenance: 'i-heroicons-wrench-screwdriver',
    team: 'i-heroicons-users',
    default: 'i-heroicons-information-circle'
  }
  return icons[type as keyof typeof icons] || icons.default
}
</script> 
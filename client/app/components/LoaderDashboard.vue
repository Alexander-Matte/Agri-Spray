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
            {{ isDemo ? 'Demo ' : '' }}Loader Dashboard
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isDemo ? 'Sample loading operations for demonstration purposes' : 'Your loading operations and equipment status' }}
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

    <!-- Loading Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-blue-100'">
            <UIcon name="i-heroicons-truck" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-blue-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Today's Loads</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-blue-600'">
            {{ isDemo ? '8' : '5' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample loads' : 'Completed loads' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-green-100'">
            <UIcon name="i-heroicons-beaker" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-green-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Chemicals Used</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-green-600'">
            {{ isDemo ? '450' : '320' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample gallons' : 'Gallons today' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-purple-100'">
            <UIcon name="i-heroicons-clock" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Loading Time</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-purple-600'">
            {{ isDemo ? '2.5' : '2.1' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample hours' : 'Avg hours/load' }}
          </p>
        </div>
      </UCard>

      <UCard class="text-center" :class="{ 'border-2 border-yellow-200': isDemo }">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="isDemo ? 'bg-yellow-100' : 'bg-red-100'">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6" :class="isDemo ? 'text-yellow-600' : 'text-red-600'" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Issues</h3>
          <p class="text-3xl font-bold" :class="isDemo ? 'text-yellow-600' : 'text-red-600'">
            {{ isDemo ? '1' : '0' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            {{ isDemo ? 'Sample issues' : 'Reported today' }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Current Loading Operation -->
    <UCard :class="{ 'border-2 border-yellow-200': isDemo }">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Current Loading Operation
        </h3>
      </template>
      <div v-if="currentOperation" class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-lg font-medium text-gray-900">{{ currentOperation.title }}</h4>
            <p class="text-sm text-gray-500">{{ currentOperation.aircraft }}</p>
          </div>
          <UBadge :color="getStatusColor(currentOperation.status)" variant="solid">
            {{ currentOperation.status }}
          </UBadge>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-500">Chemical Mix</p>
            <p class="text-sm text-gray-900">{{ currentOperation.chemicalMix }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Target Volume</p>
            <p class="text-sm text-gray-900">{{ currentOperation.targetVolume }} gallons</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Progress</p>
            <p class="text-sm text-gray-900">{{ currentOperation.progress }}%</p>
          </div>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-300" 
            :class="getProgressColor(currentOperation.progress)"
            :style="{ width: currentOperation.progress + '%' }"
          ></div>
        </div>
        
        <div class="flex space-x-2">
          <UButton
            :color="isDemo ? 'warning' : 'success'"
            variant="solid"
            @click="startOperation"
            :disabled="currentOperation.status !== 'pending'"
          >
            Start Loading
          </UButton>
          <UButton
            :color="isDemo ? 'warning' : 'primary'"
            variant="outline"
            @click="viewDetails"
          >
            View Details
          </UButton>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <UIcon name="i-heroicons-information-circle" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No active loading operation</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ isDemo ? 'Sample: No operations scheduled for today' : 'No operations scheduled for today' }}
        </p>
      </div>
    </UCard>

    <!-- Equipment Status -->
    <UCard :class="{ 'border-2 border-yellow-200': isDemo }">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Equipment Status
        </h3>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(equipment, index) in equipmentStatus" :key="index" 
             class="p-4 border border-gray-200 rounded-lg" 
             :class="{ 'border-yellow-300 bg-yellow-50': isDemo }">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getEquipmentColor(equipment.status)">
                <UIcon :name="getEquipmentIcon(equipment.type)" class="h-4 w-4 text-white" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ equipment.name }}</p>
                <p class="text-xs text-gray-500">{{ equipment.type }}</p>
              </div>
            </div>
            <UBadge :color="getStatusColor(equipment.status)" variant="solid" size="sm">
              {{ equipment.status }}
            </UBadge>
          </div>
          <div class="mt-3 text-sm text-gray-600">
            <p>Last maintenance: {{ equipment.lastMaintenance }}</p>
            <p>Next check: {{ equipment.nextCheck }}</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Recent Operations -->
    <UCard :class="{ 'border-2 border-yellow-200': isDemo }">
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">
          {{ isDemo ? 'Sample ' : '' }}Recent Operations
        </h3>
      </template>
      <div class="space-y-4">
        <div v-for="(operation, index) in recentOperations" :key="index" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getOperationColor(operation.type)">
              <UIcon :name="getOperationIcon(operation.type)" class="h-4 w-4 text-white" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ operation.title }}</p>
              <p class="text-sm text-gray-500">{{ operation.aircraft }} • {{ operation.volume }} gallons</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ operation.date }}</p>
            <UBadge :color="getStatusColor(operation.status)" variant="solid" size="sm">
              {{ operation.status }}
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
const currentOperation = computed(() => {
  if (props.isDemo) {
    return {
      title: 'Sample Loading Operation #LO-001',
      aircraft: 'Sample Aircraft A-001',
      chemicalMix: 'Sample Herbicide Mix A',
      targetVolume: '250',
      status: 'pending',
      progress: 0
    }
  }
  
  // Real data would come from API
  return {
    title: 'Loading Operation #LO-001',
    aircraft: 'Aircraft A-001',
    chemicalMix: 'Herbicide Mix A',
    targetVolume: '250',
    status: 'pending',
    progress: 0
  }
})

const equipmentStatus = computed(() => {
  if (props.isDemo) {
    return [
      {
        name: 'Sample Loader #1',
        type: 'Chemical Loader',
        status: 'operational',
        lastMaintenance: '2 weeks ago',
        nextCheck: 'Next week'
      },
      {
        name: 'Sample Mixer #1',
        type: 'Chemical Mixer',
        status: 'operational',
        lastMaintenance: '1 week ago',
        nextCheck: 'Next week'
      },
      {
        name: 'Sample Pump #1',
        type: 'Transfer Pump',
        status: 'maintenance',
        lastMaintenance: '3 weeks ago',
        nextCheck: 'Today'
      }
    ]
  }
  
  // Real data would come from API
  return [
    {
      name: 'Loader #1',
      type: 'Chemical Loader',
      status: 'operational',
      lastMaintenance: '2 weeks ago',
      nextCheck: 'Next week'
    },
    {
      name: 'Mixer #1',
      type: 'Chemical Mixer',
      status: 'operational',
      lastMaintenance: '1 week ago',
      nextCheck: 'Next week'
    },
    {
      name: 'Pump #1',
      type: 'Transfer Pump',
      status: 'operational',
      lastMaintenance: '3 weeks ago',
      nextCheck: 'Next week'
    }
  ]
})

const recentOperations = computed(() => {
  if (props.isDemo) {
    return [
      {
        type: 'loading',
        title: 'Sample Loading #LO-001',
        aircraft: 'Sample Aircraft A-001',
        volume: '250',
        date: 'Today',
        status: 'completed'
      },
      {
        type: 'mixing',
        title: 'Sample Mixing #MX-002',
        aircraft: 'Sample Aircraft A-002',
        volume: '300',
        date: 'Yesterday',
        status: 'completed'
      },
      {
        type: 'loading',
        title: 'Sample Loading #LO-003',
        aircraft: 'Sample Aircraft A-003',
        volume: '200',
        date: '2 days ago',
        status: 'completed'
      }
    ]
  }
  
  // Real data would come from API
  return [
    {
      type: 'loading',
      title: 'Loading #LO-001',
      aircraft: 'Aircraft A-001',
      volume: '250',
      date: 'Today',
      status: 'completed'
    },
    {
      type: 'mixing',
      title: 'Mixing #MX-002',
      aircraft: 'Aircraft A-002',
      volume: '300',
      date: 'Yesterday',
      status: 'completed'
    },
    {
      type: 'loading',
      title: 'Loading #LO-003',
      aircraft: 'Aircraft A-003',
      volume: '200',
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

const startOperation = () => {
  // In demo mode, just show a message
  if (props.isDemo) {
    alert('Demo mode: Operation start simulated')
    return
  }
  
  // Real implementation would start the operation
  console.log('Starting loading operation...')
}

const viewDetails = () => {
  // In demo mode, just show a message
  if (props.isDemo) {
    alert('Demo mode: View details simulated')
    return
  }
  
  // Real implementation would navigate to details
  console.log('Viewing operation details...')
}

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'blue',
    in_progress: 'yellow',
    completed: 'green',
    cancelled: 'red',
    operational: 'green',
    maintenance: 'red'
  }
  return colors[status as keyof typeof colors] || 'gray'
}

const getProgressColor = (progress: number) => {
  if (progress < 25) return 'bg-red-500'
  if (progress < 50) return 'bg-yellow-500'
  if (progress < 75) return 'bg-blue-500'
  return 'bg-green-500'
}

const getEquipmentColor = (status: string) => {
  const colors = {
    operational: 'bg-green-500',
    maintenance: 'bg-red-500',
    offline: 'bg-gray-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getEquipmentIcon = (type: string) => {
  const icons = {
    'Chemical Loader': 'i-heroicons-truck',
    'Chemical Mixer': 'i-heroicons-beaker',
    'Transfer Pump': 'i-heroicons-arrow-path'
  }
  return icons[type as keyof typeof icons] || 'i-heroicons-cog'
}

const getOperationColor = (type: string) => {
  const colors = {
    loading: 'bg-blue-500',
    mixing: 'bg-green-500',
    transfer: 'bg-purple-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const getOperationIcon = (type: string) => {
  const icons = {
    loading: 'i-heroicons-truck',
    mixing: 'i-heroicons-beaker',
    transfer: 'i-heroicons-arrow-path'
  }
  return icons[type as keyof typeof icons] || 'i-heroicons-cog'
}
</script> 
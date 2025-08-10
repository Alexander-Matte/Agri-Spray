<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Mission Management</h2>
          <p class="text-gray-600 mt-1">
            Monitor and manage all spraying missions across the fleet
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
          @click="showAddMissionModal = true"
        >
          Create Mission
        </UButton>
      </div>
    </div>

    <!-- Mission Filters -->
    <UCard>
      <div class="flex flex-wrap gap-4">
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Statuses</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        
        <select
          v-model="pilotFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Pilots</option>
          <option v-for="pilot in pilots" :key="pilot.id" :value="pilot.id">
            {{ pilot.name }}
          </option>
        </select>
        
        <UButton
          variant="ghost"
          @click="clearFilters"
        >
          Clear Filters
        </UButton>
      </div>
    </UCard>

    <!-- Missions Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">All Missions</h3>
      </template>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mission
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pilot
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aircraft
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="mission in filteredMissions" :key="mission.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ mission.name }}</div>
                  <div class="text-sm text-gray-500">{{ mission.field }}</div>
                  <div class="text-xs text-gray-400">{{ mission.date }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <UIcon name="i-heroicons-user" class="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ mission.pilot }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ mission.aircraft }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UBadge :color="getStatusColor(mission.status)" variant="solid">
                  {{ mission.status }}
                </UBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      class="bg-green-600 h-2 rounded-full" 
                      :style="{ width: mission.progress + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-500">{{ mission.progress }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="primary"
                    icon="i-heroicons-eye"
                    @click="viewMission(mission)"
                  >
                    View
                  </UButton>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="warning"
                    icon="i-heroicons-pencil-square"
                    @click="editMission(mission)"
                  >
                    Edit
                  </UButton>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="danger"
                    icon="i-heroicons-trash"
                    @click="deleteMission(mission)"
                  >
                    Delete
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <!-- Add Mission Modal -->
    <UModal v-model="showAddMissionModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Create New Mission</h3>
        </template>
        
        <form @submit.prevent="addMission" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mission Name</label>
            <input
              v-model="newMission.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="SP-001"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Field Location</label>
            <input
              v-model="newMission.field"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="North Field - Section A"
              required
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pilot</label>
              <select
                v-model="newMission.pilotId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Pilot</option>
                <option v-for="pilot in pilots" :key="pilot.id" :value="pilot.id">
                  {{ pilot.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Aircraft</label>
              <select
                v-model="newMission.aircraftId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Aircraft</option>
                <option v-for="aircraft in availableAircraft" :key="aircraft.id" :value="aircraft.id">
                  {{ aircraft.registration }}
                </option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              v-model="newMission.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </form>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              variant="ghost"
              @click="showAddMissionModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="addMission"
            >
              Create Mission
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Sample data
const missions = ref([
  {
    id: 1,
    name: 'SP-001',
    field: 'North Field - Section A',
    pilot: 'Sarah Johnson',
    aircraft: 'N-12345',
    status: 'in-progress',
    progress: 65,
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'SP-002',
    field: 'South Field - Section B',
    pilot: 'Mike Smith',
    aircraft: 'N-67890',
    status: 'planned',
    progress: 0,
    date: '2024-01-16'
  },
  {
    id: 3,
    name: 'SP-003',
    field: 'East Field - Section C',
    pilot: 'John Davis',
    aircraft: 'N-11111',
    status: 'completed',
    progress: 100,
    date: '2024-01-14'
  }
])

const pilots = ref([
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Mike Smith' },
  { id: 3, name: 'John Davis' }
])

const availableAircraft = ref([
  { id: 1, registration: 'N-12345' },
  { id: 2, registration: 'N-67890' },
  { id: 3, registration: 'N-11111' }
])

// Filters
const statusFilter = ref('')
const pilotFilter = ref('')

// Modal state
const showAddMissionModal = ref(false)

// New mission form
const newMission = ref({
  name: '',
  field: '',
  pilotId: '',
  aircraftId: '',
  date: ''
})

// Computed
const filteredMissions = computed(() => {
  let filtered = missions.value
  
  if (statusFilter.value) {
    filtered = filtered.filter(m => m.status === statusFilter.value)
  }
  
  if (pilotFilter.value) {
    filtered = filtered.filter(m => pilots.value.find(p => p.id === pilotFilter.value)?.name === m.pilot)
  }
  
  return filtered
})

// Methods
const clearFilters = () => {
  statusFilter.value = ''
  pilotFilter.value = ''
}

const addMission = () => {
  const pilot = pilots.value.find(p => p.id === parseInt(newMission.value.pilotId))
  const aircraft = availableAircraft.value.find(a => a.id === parseInt(newMission.value.aircraftId))
  
  if (pilot && aircraft) {
    const missionData = {
      id: Date.now(),
      name: newMission.value.name,
      field: newMission.value.field,
      pilot: pilot.name,
      aircraft: aircraft.registration,
      status: 'planned',
      progress: 0,
      date: newMission.value.date
    }
    
    missions.value.push(missionData)
    showAddMissionModal.value = false
    
    // Reset form
    newMission.value = {
      name: '',
      field: '',
      pilotId: '',
      aircraftId: '',
      date: ''
    }
  }
}

const viewMission = (mission: any) => {
  console.log('View mission:', mission)
  // TODO: Implement mission view
}

const editMission = (mission: any) => {
  console.log('Edit mission:', mission)
  // TODO: Implement mission edit
}

const deleteMission = (mission: any) => {
  if (confirm(`Are you sure you want to delete mission ${mission.name}?`)) {
    const index = missions.value.findIndex(m => m.id === mission.id)
    if (index > -1) {
      missions.value.splice(index, 1)
    }
  }
}

const getStatusColor = (status: string) => {
  const colors = {
    'planned': 'neutral',
    'in-progress': 'warning',
    'completed': 'success',
    'cancelled': 'danger'
  }
  return colors[status as keyof typeof colors] || 'neutral'
}
</script>

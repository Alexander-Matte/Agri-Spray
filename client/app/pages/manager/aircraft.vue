<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Aircraft Fleet Management</h2>
          <p class="text-gray-600 mt-1">
            Manage aircraft specifications, maintenance schedules, and operational status
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
          @click="showAddAircraftModal = true"
        >
          Add Aircraft
        </UButton>
      </div>
    </div>

    <!-- Aircraft Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="aircraft in aircraft" :key="aircraft.id" class="hover:shadow-lg transition-shadow">
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ aircraft.registration }}</h3>
                <p class="text-sm text-gray-500">{{ aircraft.type }}</p>
              </div>
            </div>
            <UBadge :color="getStatusColor(aircraft.status)" variant="solid">
              {{ aircraft.status }}
            </UBadge>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Capacity:</span>
              <span class="font-medium">{{ aircraft.capacity }}L</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Last Maintenance:</span>
              <span class="font-medium">{{ aircraft.lastMaintenance }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Flight Hours:</span>
              <span class="font-medium">{{ aircraft.flightHours }}h</span>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <UButton
              size="sm"
              variant="ghost"
              color="primary"
              icon="i-heroicons-pencil-square"
              @click="editAircraft(aircraft)"
            >
              Edit
            </UButton>
            <UButton
              size="sm"
              variant="ghost"
              color="warning"
              icon="i-heroicons-wrench-screwdriver"
              @click="scheduleMaintenance(aircraft)"
            >
              Maintenance
            </UButton>
            <UButton
              size="sm"
              variant="ghost"
              color="danger"
              icon="i-heroicons-trash"
              @click="deleteAircraft(aircraft)"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Add Aircraft Modal -->
    <UModal v-model="showAddAircraftModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Add New Aircraft</h3>
        </template>
        
        <form @submit.prevent="addAircraft" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Registration</label>
            <input
              v-model="newAircraft.registration"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="N-12345"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              v-model="newAircraft.type"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Air Tractor AT-802"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Capacity (L)</label>
            <input
              v-model="newAircraft.capacity"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="800"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="newAircraft.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </form>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              variant="ghost"
              @click="showAddAircraftModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="addAircraft"
            >
              Add Aircraft
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

// Sample aircraft data
const aircraft = ref([
  {
    id: 1,
    registration: 'N-12345',
    type: 'Air Tractor AT-802',
    capacity: 800,
    status: 'active',
    lastMaintenance: '2 weeks ago',
    flightHours: 1250
  },
  {
    id: 2,
    registration: 'N-67890',
    type: 'Thrush 510G',
    capacity: 600,
    status: 'maintenance',
    lastMaintenance: '1 week ago',
    flightHours: 890
  },
  {
    id: 3,
    registration: 'N-11111',
    type: 'Air Tractor AT-502',
    capacity: 500,
    status: 'active',
    lastMaintenance: '3 weeks ago',
    flightHours: 2100
  }
])

// Modal state
const showAddAircraftModal = ref(false)

// New aircraft form
const newAircraft = ref({
  registration: '',
  type: '',
  capacity: '',
  status: 'active'
})

// Methods
const addAircraft = () => {
  const aircraftData = {
    id: Date.now(),
    registration: newAircraft.value.registration,
    type: newAircraft.value.type,
    capacity: parseInt(newAircraft.value.capacity),
    status: newAircraft.value.status,
    lastMaintenance: 'New',
    flightHours: 0
  }
  
  aircraft.value.push(aircraftData)
  showAddAircraftModal.value = false
  
  // Reset form
  newAircraft.value = {
    registration: '',
    type: '',
    capacity: '',
    status: 'active'
  }
}

const editAircraft = (aircraft: any) => {
  console.log('Edit aircraft:', aircraft)
  // TODO: Implement edit functionality
}

const scheduleMaintenance = (aircraft: any) => {
  console.log('Schedule maintenance for:', aircraft)
  // TODO: Implement maintenance scheduling
}

const deleteAircraft = (aircraft: any) => {
  if (confirm(`Are you sure you want to delete ${aircraft.registration}?`)) {
    const index = aircraft.value.findIndex(a => a.id === aircraft.id)
    if (index > -1) {
      aircraft.value.splice(index, 1)
    }
  }
}

const getStatusColor = (status: string) => {
  const colors = {
    'active': 'success',
    'maintenance': 'warning',
    'inactive': 'danger'
  }
  return colors[status as keyof typeof colors] || 'neutral'
}
</script>

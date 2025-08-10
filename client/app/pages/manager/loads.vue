<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Load Management</h2>
          <p class="text-gray-600 mt-1">
            Monitor and manage chemical loads, application rates, and safety protocols
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
          @click="showAddLoadModal = true"
        >
          Create Load Plan
        </UButton>
      </div>
    </div>

    <!-- Load Filters -->
    <UCard>
      <div class="flex flex-wrap gap-4">
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Statuses</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="in-use">In Use</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          v-model="chemicalFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Chemicals</option>
          <option v-for="chemical in chemicals" :key="chemical.id" :value="chemical.id">
            {{ chemical.name }}
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

    <!-- Loads Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="load in filteredLoads" :key="load.id" class="hover:shadow-lg transition-shadow">
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-beaker" class="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ load.name }}</h3>
                <p class="text-sm text-gray-500">{{ load.chemical }}</p>
              </div>
            </div>
            <UBadge :color="getStatusColor(load.status) as any" variant="solid">
              {{ load.status }}
            </UBadge>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Volume:</span>
              <span class="font-medium">{{ load.volume }}L</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Application Rate:</span>
              <span class="font-medium">{{ load.applicationRate }}L/ha</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Target Field:</span>
              <span class="font-medium">{{ load.targetField }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Created:</span>
              <span class="font-medium">{{ load.createdDate }}</span>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <UButton
              size="sm"
              variant="ghost"
              color="primary"
              icon="i-heroicons-eye"
              @click="viewLoad(load)"
            >
              View
            </UButton>
            <UButton
              size="sm"
              variant="ghost"
              color="warning"
              icon="i-heroicons-pencil-square"
              @click="editLoad(load)"
            >
              Edit
            </UButton>
            <UButton
              size="sm"
              variant="ghost"
              color="error"
              icon="i-heroicons-trash"
              @click="deleteLoad(load)"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Add Load Modal -->
    <UModal v-model="showAddLoadModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Create New Load Plan</h3>
        </template>
        
        <form @submit.prevent="addLoad" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Load Name</label>
            <input
              v-model="newLoad.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Load-001"
              required
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Chemical</label>
              <select
                v-model="newLoad.chemicalId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Chemical</option>
                <option v-for="chemical in chemicals" :key="chemical.id" :value="chemical.id">
                  {{ chemical.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Volume (L)</label>
              <input
                v-model="newLoad.volume"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="800"
                required
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Application Rate (L/ha)</label>
              <input
                v-model="newLoad.applicationRate"
                type="number"
                step="0.1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="2.5"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Target Field</label>
              <input
                v-model="newLoad.targetField"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="North Field - Section A"
                required
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="newLoad.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Additional notes about this load plan..."
            ></textarea>
          </div>
        </form>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              variant="ghost"
              @click="showAddLoadModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="addLoad"
            >
              Create Load Plan
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
const loads = ref([
  {
    id: 1,
    name: 'Load-001',
    chemical: 'Glyphosate 360',
    volume: 800,
    applicationRate: 2.5,
    targetField: 'North Field - Section A',
    status: 'ready',
    createdDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Load-002',
    chemical: '2,4-D Amine',
    volume: 600,
    applicationRate: 1.8,
    targetField: 'South Field - Section B',
    status: 'preparing',
    createdDate: '2024-01-16'
  },
  {
    id: 3,
    name: 'Load-003',
    chemical: 'Dicamba',
    volume: 500,
    applicationRate: 2.0,
    targetField: 'East Field - Section C',
    status: 'in-use',
    createdDate: '2024-01-14'
  }
])

const chemicals = ref([
  { id: 1, name: 'Glyphosate 360' },
  { id: 2, name: '2,4-D Amine' },
  { id: 3, name: 'Dicamba' },
  { id: 4, name: 'Atrazine' }
])

// Filters
const statusFilter = ref('')
const chemicalFilter = ref('')

// Modal state
const showAddLoadModal = ref(false)

// New load form
const newLoad = ref({
  name: '',
  chemicalId: '',
  volume: '',
  applicationRate: '',
  targetField: '',
  notes: ''
})

// Computed
const filteredLoads = computed(() => {
  let filtered = loads.value
  
  if (statusFilter.value) {
    filtered = filtered.filter(l => l.status === statusFilter.value)
  }
  
  if (chemicalFilter.value) {
    filtered = filtered.filter(l => chemicals.value.find(c => c.id === parseInt(chemicalFilter.value))?.name === l.chemical)
  }
  
  return filtered
})

// Methods
const clearFilters = () => {
  statusFilter.value = ''
  chemicalFilter.value = ''
}

const addLoad = () => {
  const chemical = chemicals.value.find(c => c.id === parseInt(newLoad.value.chemicalId))
  
  if (chemical) {
    const loadData = {
      id: Date.now(),
      name: newLoad.value.name,
      chemical: chemical.name,
      volume: parseInt(newLoad.value.volume),
      applicationRate: parseFloat(newLoad.value.applicationRate),
      targetField: newLoad.value.targetField,
      status: 'preparing',
      createdDate: new Date().toISOString().split('T')[0] || ''
    }
    
    loads.value.push(loadData)
    showAddLoadModal.value = false
    
    // Reset form
    newLoad.value = {
      name: '',
      chemicalId: '',
      volume: '',
      applicationRate: '',
      targetField: '',
      notes: ''
    }
  }
}

const viewLoad = (load: any) => {
  console.log('View load:', load)
  // TODO: Implement load view
}

const editLoad = (load: any) => {
  console.log('Edit load:', load)
  // TODO: Implement load edit
}

const deleteLoad = (load: any) => {
  if (confirm(`Are you sure you want to delete load ${load.name}?`)) {
    const index = loads.value.findIndex(l => l.id === load.id)
    if (index > -1) {
      loads.value.splice(index, 1)
    }
  }
}

const getStatusColor = (status: string) => {
  const colors = {
    'preparing': 'warning',
    'ready': 'success',
    'in-use': 'info',
    'completed': 'neutral'
  }
  return colors[status as keyof typeof colors] || 'neutral'
}
</script>

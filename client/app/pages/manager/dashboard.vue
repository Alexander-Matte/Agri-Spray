<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-green-600" />
              <span class="text-xl font-bold text-gray-900">Agri-Spray Manager</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ userStore.user?.email }}</span>
            <UButton
              @click="userStore.logout"
              color="gray"
              variant="outline"
              size="sm"
            >
              Logout
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <UButton
              v-for="item in sidebarItems"
              :key="item.id"
              :variant="activeSection === item.id ? 'solid' : 'ghost'"
              :color="activeSection === item.id ? 'primary' : 'gray'"
              class="w-full justify-start mb-1"
              @click="activeSection = item.id"
            >
              <UIcon :name="item.icon" class="h-5 w-5 mr-3" />
              {{ item.name }}
            </UButton>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Stats Section -->
        <div v-if="activeSection === 'stats'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Statistics</h1>
            <p class="mt-1 text-gray-600">Overview of your agricultural spraying operations</p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-blue-600" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Current Missions</p>
                  <p class="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-clock" class="h-8 w-8 text-green-600" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Past Missions</p>
                  <p class="text-2xl font-semibold text-gray-900">156</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-user-group" class="h-8 w-8 text-purple-600" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Total Aircraft</p>
                  <p class="text-2xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UIcon name="i-heroicons-users" class="h-8 w-8 text-orange-600" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Active Pilots</p>
                  <p class="text-2xl font-semibold text-gray-900">15</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Stats -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Mission "Field A-12" completed successfully</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">New pilot John Smith added to the team</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Chemical inventory updated</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <UButton
                  @click="activeSection = 'missions'"
                  color="primary"
                  variant="outline"
                  class="w-full justify-start"
                >
                  <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                  Create New Mission
                </UButton>
                <UButton
                  @click="activeSection = 'pilots'"
                  color="primary"
                  variant="outline"
                  class="w-full justify-start"
                >
                  <UIcon name="i-heroicons-user-plus" class="h-4 w-4 mr-2" />
                  Add New Pilot
                </UButton>
                <UButton
                  @click="activeSection = 'chemicals'"
                  color="primary"
                  variant="outline"
                  class="w-full justify-start"
                >
                  <UIcon name="i-heroicons-beaker" class="h-4 w-4 mr-2" />
                  Manage Chemicals
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Missions Section -->
        <div v-else-if="activeSection === 'missions'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Missions</h1>
              <p class="mt-1 text-gray-600">Manage and create new spraying missions</p>
            </div>
            <UButton
              color="primary"
              @click="showCreateMission = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Create Mission
            </UButton>
          </div>

          <!-- Mission List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Missions</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-document-text" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No missions yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating your first mission.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showCreateMission = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Create Mission
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pilots Section -->
        <div v-else-if="activeSection === 'pilots'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Pilots</h1>
              <p class="mt-1 text-gray-600">Manage your pilot team</p>
            </div>
            <UButton
              color="primary"
              @click="showAddPilot = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Add Pilot
            </UButton>
          </div>

          <!-- Pilot List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Pilots</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-user-group" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No pilots yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first pilot.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showAddPilot = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Add Pilot
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aircraft Section -->
        <div v-else-if="activeSection === 'aircraft'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Aircraft</h1>
              <p class="mt-1 text-gray-600">Manage your aircraft fleet</p>
            </div>
            <UButton
              color="primary"
              @click="showAddAircraft = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Add Aircraft
            </UButton>
          </div>

          <!-- Aircraft List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Aircraft</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-paper-airplane" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No aircraft yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first aircraft.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showAddAircraft = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Add Aircraft
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chemicals Section -->
        <div v-else-if="activeSection === 'chemicals'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Chemicals</h1>
              <p class="mt-1 text-gray-600">Manage your chemical inventory</p>
            </div>
            <UButton
              color="primary"
              @click="showAddChemical = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Add Chemical
            </UButton>
          </div>

          <!-- Chemical List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Chemicals</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-beaker" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No chemicals yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first chemical.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showAddChemical = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Add Chemical
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loaders Section -->
        <div v-else-if="activeSection === 'loaders'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Loaders</h1>
              <p class="mt-1 text-gray-600">Manage your loader team</p>
            </div>
            <UButton
              color="primary"
              @click="showAddLoader = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Add Loader
            </UButton>
          </div>

          <!-- Loader List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Loaders</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-truck" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No loaders yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first loader.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showAddLoader = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Add Loader
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customers Section -->
        <div v-else-if="activeSection === 'customers'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
              <p class="mt-1 text-gray-600">Manage your customer relationships</p>
            </div>
            <UButton
              color="primary"
              @click="showAddCustomer = true"
            >
              <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
              Add Customer
            </UButton>
          </div>

          <!-- Customer List Placeholder -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">All Customers</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-building-office" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No customers yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first customer.</p>
                <div class="mt-6">
                  <UButton
                    color="primary"
                    @click="showAddCustomer = true"
                  >
                    <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-2" />
                    Add Customer
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reports Section -->
        <div v-else-if="activeSection === 'reports'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
            <p class="mt-1 text-gray-600">Generate and view operational reports</p>
          </div>

          <!-- Reports Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Mission Reports</h3>
              <p class="text-sm text-gray-600 mb-4">Generate detailed reports for completed missions</p>
              <UButton color="primary" variant="outline" class="w-full">
                Generate Report
              </UButton>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Financial Reports</h3>
              <p class="text-sm text-gray-600 mb-4">View revenue, costs, and profitability analysis</p>
              <UButton color="primary" variant="outline" class="w-full">
                View Reports
              </UButton>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Performance Reports</h3>
              <p class="text-sm text-gray-600 mb-4">Track pilot and aircraft performance metrics</p>
              <UButton color="primary" variant="outline" class="w-full">
                View Metrics
              </UButton>
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div v-else-if="activeSection === 'settings'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
            <p class="mt-1 text-gray-600">Manage your account and system preferences</p>
          </div>

          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">System Settings</h2>
            </div>
            <div class="p-6 space-y-6">
              <div>
                <h3 class="text-md font-medium text-gray-900 mb-3">General Settings</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Email Notifications</span>
                    <UToggle v-model="settings.emailNotifications" />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">SMS Notifications</span>
                    <UToggle v-model="settings.smsNotifications" />
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-md font-medium text-gray-900 mb-3">Display Settings</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Dark Mode</span>
                    <UToggle v-model="settings.darkMode" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../../stores/user'

const userStore = useUserStore()

// Reactive data
const activeSection = ref('stats')
const showCreateMission = ref(false)
const showAddPilot = ref(false)
const showAddAircraft = ref(false)
const showAddChemical = ref(false)
const showAddLoader = ref(false)
const showAddCustomer = ref(false)

const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  darkMode: false
})

// Sidebar navigation items
const sidebarItems = [
  { id: 'stats', name: 'Stats', icon: 'i-heroicons-chart-bar' },
  { id: 'missions', name: 'Missions', icon: 'i-heroicons-document-text' },
  { id: 'pilots', name: 'Pilots', icon: 'i-heroicons-user-group' },
  { id: 'aircraft', name: 'Aircraft', icon: 'i-heroicons-paper-airplane' },
  { id: 'chemicals', name: 'Chemicals', icon: 'i-heroicons-beaker' },
  { id: 'loaders', name: 'Loaders', icon: 'i-heroicons-truck' },
  { id: 'customers', name: 'Customers', icon: 'i-heroicons-building-office' },
  { id: 'reports', name: 'Reports', icon: 'i-heroicons-document-chart-bar' },
  { id: 'settings', name: 'Settings', icon: 'i-heroicons-cog-6-tooth' }
]

// Check if user is authenticated and has manager role
onMounted(() => {
  if (!userStore.isAuthenticated) {
    navigateTo('/login')
    return
  }

  if (!userStore.isManager) {
    navigateTo('/dashboard')
    return
  }
})
</script> 
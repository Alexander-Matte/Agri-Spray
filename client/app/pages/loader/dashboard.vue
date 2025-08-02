<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-truck" class="h-8 w-8 text-orange-600" />
              <span class="text-xl font-bold text-gray-900">Agri-Spray Loader</span>
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
        <!-- Current Loads Section -->
        <div v-if="activeSection === 'current'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Current Loads</h1>
            <p class="mt-1 text-gray-600">Active loads you're working on</p>
          </div>

          <!-- Current Loads List -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Active Loads</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-truck" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No active loads</h3>
                <p class="mt-1 text-sm text-gray-500">You don't have any active loads assigned.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Load History Section -->
        <div v-else-if="activeSection === 'history'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Load History</h1>
            <p class="mt-1 text-gray-600">Your completed loads</p>
          </div>

          <!-- Load History List -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Completed Loads</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-clock" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No completed loads</h3>
                <p class="mt-1 text-sm text-gray-500">Your load history will appear here.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chemicals Section -->
        <div v-else-if="activeSection === 'chemicals'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Chemical Inventory</h1>
            <p class="mt-1 text-gray-600">Manage chemical stock and mixing</p>
          </div>

          <!-- Chemical Inventory -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Available Chemicals</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-beaker" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No chemicals available</h3>
                <p class="mt-1 text-sm text-gray-500">Chemical inventory will appear here.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Equipment Section -->
        <div v-else-if="activeSection === 'equipment'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Equipment</h1>
            <p class="mt-1 text-gray-600">Manage loading equipment and tools</p>
          </div>

          <!-- Equipment List -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Available Equipment</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-wrench-screwdriver" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No equipment available</h3>
                <p class="mt-1 text-sm text-gray-500">Equipment inventory will appear here.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div v-else-if="activeSection === 'profile'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
            <p class="mt-1 text-gray-600">Manage your loader profile</p>
          </div>

          <!-- Profile Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <p class="mt-1 text-sm text-gray-900">{{ userStore.user?.email }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Role</label>
                    <p class="mt-1 text-sm text-gray-900">Loader</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
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
const activeSection = ref('current')

const settings = ref({
  emailNotifications: true,
  smsNotifications: false
})

// Sidebar navigation items
const sidebarItems = [
  { id: 'current', name: 'Current Loads', icon: 'i-heroicons-truck' },
  { id: 'history', name: 'Load History', icon: 'i-heroicons-clock' },
  { id: 'chemicals', name: 'Chemicals', icon: 'i-heroicons-beaker' },
  { id: 'equipment', name: 'Equipment', icon: 'i-heroicons-wrench-screwdriver' },
  { id: 'profile', name: 'My Profile', icon: 'i-heroicons-user' }
]

// Check if user is authenticated and has loader role
onMounted(() => {
  if (!userStore.isAuthenticated) {
    navigateTo('/login')
    return
  }

  if (!userStore.isLoader) {
    navigateTo('/dashboard')
    return
  }
})
</script> 
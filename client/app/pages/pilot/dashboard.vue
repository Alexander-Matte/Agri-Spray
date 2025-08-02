<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-blue-600" />
              <span class="text-xl font-bold text-gray-900">Agri-Spray Pilot</span>
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
        <!-- Current Mission Section -->
        <div v-if="activeSection === 'current'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Current Mission</h1>
            <p class="mt-1 text-gray-600">Your active spraying mission</p>
          </div>

          <!-- Current Mission Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center py-12">
              <UIcon name="i-heroicons-paper-airplane" class="h-12 w-12 text-gray-400 mx-auto" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No active mission</h3>
              <p class="mt-1 text-sm text-gray-500">You don't have any active missions assigned.</p>
            </div>
          </div>
        </div>

        <!-- Mission History Section -->
        <div v-else-if="activeSection === 'history'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Mission History</h1>
            <p class="mt-1 text-gray-600">Your completed missions</p>
          </div>

          <!-- Mission History List -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Completed Missions</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-clock" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No completed missions</h3>
                <p class="mt-1 text-sm text-gray-500">Your mission history will appear here.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Aircraft Section -->
        <div v-else-if="activeSection === 'aircraft'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Aircraft</h1>
            <p class="mt-1 text-gray-600">Aircraft assigned to you</p>
          </div>

          <!-- Aircraft List -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Assigned Aircraft</h2>
            </div>
            <div class="p-6">
              <div class="text-center py-12">
                <UIcon name="i-heroicons-paper-airplane" class="h-12 w-12 text-gray-400 mx-auto" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No aircraft assigned</h3>
                <p class="mt-1 text-sm text-gray-500">You don't have any aircraft assigned yet.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div v-else-if="activeSection === 'profile'" class="space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
            <p class="mt-1 text-gray-600">Manage your pilot profile</p>
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
                    <p class="mt-1 text-sm text-gray-900">Pilot</p>
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
  { id: 'current', name: 'Current Mission', icon: 'i-heroicons-paper-airplane' },
  { id: 'history', name: 'Mission History', icon: 'i-heroicons-clock' },
  { id: 'aircraft', name: 'My Aircraft', icon: 'i-heroicons-paper-airplane' },
  { id: 'profile', name: 'My Profile', icon: 'i-heroicons-user' }
]

// Check if user is authenticated and has pilot role
onMounted(() => {
  if (!userStore.isAuthenticated) {
    navigateTo('/login')
    return
  }

  if (!userStore.isPilot) {
    navigateTo('/dashboard')
    return
  }
})
</script> 
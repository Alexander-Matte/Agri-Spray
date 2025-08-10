<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">User Management</h2>
          <p class="text-gray-600 mt-1">
            Manage system users, roles, and permissions
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          icon="i-heroicons-plus"
        >
          Add User
        </UButton>
      </div>
    </div>

    <!-- Users Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">System Users</h3>
      </template>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <UIcon name="i-heroicons-user" class="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UBadge :color="getRoleColor(user.role)" variant="solid">
                  {{ user.role }}
                </UBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UBadge :color="user.status === 'active' ? 'success' : 'danger'" variant="solid">
                  {{ user.status }}
                </UBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastActive }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="primary"
                    icon="i-heroicons-pencil-square"
                  >
                    Edit
                  </UButton>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="danger"
                    icon="i-heroicons-trash"
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
  </div>
</template>

<script setup lang="ts">
// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Sample user data
const users = ref([
  {
    id: 1,
    name: 'John Manager',
    email: 'john.manager@agri-spray.com',
    role: 'Manager',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Sarah Pilot',
    email: 'sarah.pilot@agri-spray.com',
    role: 'Pilot',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    name: 'Mike Loader',
    email: 'mike.loader@agri-spray.com',
    role: 'Loader',
    status: 'active',
    lastActive: '30 minutes ago'
  },
  {
    id: 4,
    name: 'Demo User',
    email: 'demo@agri-spray.com',
    role: 'Demo',
    status: 'inactive',
    lastActive: '1 day ago'
  }
])

const getRoleColor = (role: string) => {
  const colors = {
    'Manager': 'info',
    'Pilot': 'success',
    'Loader': 'warning',
    'Demo': 'neutral'
  }
  return colors[role as keyof typeof colors] || 'neutral'
}
</script>

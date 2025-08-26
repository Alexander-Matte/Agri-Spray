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
        <UModal
          title="Modal with close button"
          :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full'
          }"
        >
          <UButton label="Add User" class="bg-primary-200 text-primary-600" variant="subtle" />

          <template #body>
            <div>
              <UserFormModal />
            </div>
          </template>
        </UModal>
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
import UserFormModal from '~/components/forms/UserFormModal.vue'

// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Sample user data
const users = ref([])

const getRoleColor = (role: string) => {
  const colors = {
    'Manager': 'info',
    'Pilot': 'success',
    'Loader': 'warning',
    'Demo': 'neutral'
  }
  return colors[role as keyof typeof colors] || 'neutral'
}

const addUser = () => {
  console.log('addUser')
}

import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'


// Form schema based on User interface
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  plainPassword: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/^(?=.*\d)/, 'Password must contain at least one number')
    .regex(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
  roles: z.array(z.string()).min(1, 'At least one role must be selected')
})

type Schema = z.output<typeof schema>

// Available roles with proper structure for USelectMenu
const availableRoles = [
  { label: 'Manager', value: 'ROLE_MANAGER', icon: 'i-heroicons-user-group' },
  { label: 'Admin', value: 'ROLE_ADMIN', icon: 'i-heroicons-shield-check' },
  { label: 'Pilot', value: 'ROLE_PILOT', icon: 'i-heroicons-paper-airplane' },
  { label: 'Loader', value: 'ROLE_LOADER', icon: 'i-heroicons-truck' }
]

// Form state
const state = reactive<Partial<Schema>>({
  email: '',
  plainPassword: '',
  roles: []
})



// Reset form function - must be declared before watch
const resetForm = () => {
  state.email = ''
  state.plainPassword = ''
  state.roles = []
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</script>

<template>
  <UForm 
  :schema="schema" 
  :state="state"
  class="space-y-6" 
  @submit="onSubmit"
  >
    <!-- Email Field -->
    <UFormField label="Email Address" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        placeholder="user@agri-spray.com"
        icon="i-heroicons-envelope"
        size="lg"
        class="w-full text-black bg-white border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        color="secondary"
      />
    </UFormField>

    <!-- Password Field -->
    <UFormField label="Password" name="plainPassword" required>
      <UInput
        v-model="state.plainPassword"
        type="password"
        placeholder="Enter secure password"
        icon="i-heroicons-lock-closed"
        size="lg"
        class="w-full text-gray-900 bg-white border-gray-300 focus:ring-primary-500 focus:border-primary-500"
      />
      <template #help>
        <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
          Must be at least 8 characters with uppercase, lowercase, number, and special character
        </p>
      </template>
    </UFormField>

    <!-- Roles Field -->
    <UFormField label="User Roles" name="roles" required>
      <USelectMenu
        v-model="state.roles"
        :items="availableRoles"
        multiple
        placeholder="Select user roles"
        size="lg"
        class="w-full"
      />
      <template #help>
        <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
          Select one or more roles for the user
        </p>
      </template>
    </UFormField>

    <!-- Form Actions -->
    <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
      <UButton
        type="button"
        color="neutral"
        variant="soft"
        size="lg"
        class="flex-1 sm:flex-none"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        color="primary"
        size="lg"
        class="flex-1 sm:flex-none"
      >
        Create User
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useDemoStore } from '../../../stores/demo'

// Form schema based on User interface
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  plainPassword: z.string()
    .min(8, 'Password must be at least 8 characters long'),
  roles: z.array(z.string()).min(1, 'At least one role must be selected')
})

type Schema = z.output<typeof schema>

// Available roles as simple strings for USelectMenu
const availableRoles = ['ROLE_MANAGER', 'ROLE_PILOT', 'ROLE_LOADER']

// Form state
const state = reactive<Partial<Schema>>({
  email: undefined,
  plainPassword: undefined,
  roles: undefined
})


const resetForm = () => {
  state.email = undefined
  state.plainPassword = undefined
  state.roles = undefined
}


// Handle form submission
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const formData = event.data
    console.log('Form submitted with data:', formData)
    
    // Check if we're in demo mode
    const { isDemo, createDemoUser } = useDemoStore()
    
    if (isDemo) {
      // Save to demo store instead of API
      console.log('💾 Saving user to demo store')
      const demoUser = await createDemoUser(formData)
      console.log('✅ Demo user created:', demoUser)
    } else {
      // Send to real API
      console.log('🌐 Sending to real API')
      await $fetch('/api/users', { method: 'POST', body: formData })
      console.log('✅ User created via API')
    }
    
    resetForm()
    
  } catch (error: any) {
    console.error('Form submission error:', error)
  }
}
</script>




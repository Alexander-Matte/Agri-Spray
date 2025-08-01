<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <NuxtLink to="/" class="flex justify-center items-center space-x-2 mb-6">
          <UIcon name="i-heroicons-paper-airplane" class="h-12 w-12 text-green-600" />
          <span class="text-2xl font-bold text-gray-900">Agri-Spray</span>
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Access your personalized dashboard
        </p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div class="space-y-4">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                placeholder="Enter your email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-600"
                autocomplete="email"
                required
              />
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                v-model="form.password"
                type="password"
                id="password"
                placeholder="Enter your password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-600"
                autocomplete="current-password"
                required
              />
            </div>

            <!-- Remember Me -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  v-model="form.rememberMe"
                  type="checkbox"
                  id="rememberMe"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded bg-gray-50"
                />
                <label for="rememberMe" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              color="primary"
              size="lg"
              :loading="isLoading"
              :disabled="isLoading"
              class="w-full"
            >
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </UButton>
          </div>
        </div>
      </form>

      <!-- Demo Accounts -->
      <div class="mt-8">
        <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Demo Accounts</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p class="text-sm font-medium text-gray-900">Manager</p>
                <p class="text-xs text-gray-500">manager@agri-spray.com</p>
              </div>
              <UButton
                size="xs"
                variant="outline"
                color="primary"
              >
                Use
              </UButton>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p class="text-sm font-medium text-gray-900">Pilot</p>
                <p class="text-xs text-gray-500">pilot@agri-spray.com</p>
              </div>
              <UButton
                size="xs"
                variant="outline"
                color="primary"
              >
                Use
              </UButton>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p class="text-sm font-medium text-gray-900">Loader</p>
                <p class="text-xs text-gray-500">loader@agri-spray.com</p>
              </div>
              <UButton
                size="xs"
                variant="outline"
                color="primary"
              >
                Use
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center">
        <NuxtLink
          to="/"
          class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user'
  const userStore = useUserStore()

  onBeforeMount(async () => {
  userStore.hydrate();
  console.log('User store hydrated:', userStore);
});



// Form data - ensure it's properly initialized for SSR
const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

// Form validation errors
const errors = ref({})

// Loading state
const isLoading = ref(false)

// Handle form submission
const handleSubmit = async () => {
  if (!userStore) {
    console.error('User store not available')
    return
  }
  console.log(form.value.email)
  try {
    isLoading.value = true
    await userStore.login(form.value.email, form.value.password)
    // Redirect to dashboard after successful login
    //await navigateTo(userStore.getDashboardPath())
  } catch (error) {
    console.error('Login failed:', error)
    // Handle login error
  } finally {
    isLoading.value = false
  }
}
</script> 
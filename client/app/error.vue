<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

// Get error details
const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return 'Page not found'
  }
  return props.error?.message || 'Something went wrong'
})

const errorDescription = computed(() => {
  if (props.error?.statusCode === 404) {
    return 'The page you are looking for doesn\'t exist or has been moved.'
  }
  return 'We encountered an unexpected error. Please try again or contact support if the problem persists.'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/" class="flex justify-center items-center space-x-2 mb-6">
          <UIcon name="i-heroicons-paper-airplane" class="h-12 w-12 text-green-600" />
          <span class="text-2xl font-bold text-gray-900">Agri-Spray</span>
        </NuxtLink>
      </div>

      <!-- Error Content -->
      <div class="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <!-- Error Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <UIcon 
              :name="error?.statusCode === 404 ? 'i-heroicons-exclamation-triangle' : 'i-heroicons-exclamation-circle'" 
              class="h-10 w-10 text-red-600" 
            />
          </div>
        </div>

        <!-- Error Code -->
        <h1 class="text-6xl font-bold text-gray-900 mb-4">
          {{ error?.statusCode || '500' }}
        </h1>

        <!-- Error Message -->
         <!-- TODO: Remove message for Production -->
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          {{ errorMessage }}
        </h2>

        <!-- Error Description -->
        <p class="text-gray-600 mb-8">
          {{ errorDescription }}
        </p>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <UButton
            to="/"
            color="primary"
            size="lg"
            icon="i-heroicons-home"
            class="w-full"
          >
            Go Back Home
          </UButton>
          
          <UButton
            @click="$router.go(-1)"
            variant="outline"
            color="neutral"
            size="lg"
            icon="i-heroicons-arrow-left"
            class="w-full"
          >
            Go Back
          </UButton>
        </div>
      </div>

      <!-- Additional Help -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500 mb-2">
          Need help? Contact our support team
        </p>
        <a 
          href="mailto:support@agri-spray.com" 
          class="text-sm text-green-600 hover:text-green-500 font-medium"
        >
          support@agri-spray.com
        </a>
      </div>
    </div>
  </div>
</template>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-2">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-green-600" />
            <span class="text-xl font-bold text-gray-900">Agri-Spray</span>
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/#features" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            Features
          </NuxtLink>
          <NuxtLink 
            to="/#about" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/#contact" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            Contact
          </NuxtLink>
        </div>

        <!-- Auth Actions -->
        <div class="flex items-center space-x-4">
          <!-- Show welcome message and dashboard button when authenticated -->
          <template v-if="authStore.isAuthenticated">
            <span class="text-gray-700 hidden md:block">
              Welcome, {{ authStore.user?.email }}
            </span>
            <NuxtLink 
              to="/dashboard"
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              To Dashboard
            </NuxtLink>
          </template>
          
          <!-- Show sign in button when not authenticated -->
          <template v-else>
            <NuxtLink 
              to="/login"
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Sign In
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-green-600 focus:outline-none focus:text-green-600"
          >
            <UIcon 
              :name="isMobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" 
              class="h-6 w-6" 
            />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="flex flex-col space-y-4">
          <NuxtLink 
            to="/#features" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
            @click="closeMobileMenu"
          >
            Features
          </NuxtLink>
          <NuxtLink 
            to="/#about" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
            @click="closeMobileMenu"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/#contact" 
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
            @click="closeMobileMenu"
          >
            Contact
          </NuxtLink>
          <div class="pt-4 border-t border-gray-200">
            <!-- Show welcome message and dashboard button when authenticated -->
            <template v-if="authStore.isAuthenticated">
              <div class="text-gray-700 mb-3 p-2 bg-gray-50 rounded">
                Welcome, {{ authStore.user?.email }}
              </div>
              <NuxtLink 
                to="/dashboard"
                class="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 text-center"
                @click="closeMobileMenu"
              >
                Dashboard
              </NuxtLink>
            </template>
            
            <!-- Show sign in button when not authenticated -->
            <template v-else>
              <NuxtLink 
                to="/login"
                class="block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200 text-center"
                @click="closeMobileMenu"
              >
                Sign In
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

// Auth store
const authStore = useAuthStore()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  closeMobileMenu()
})
</script>

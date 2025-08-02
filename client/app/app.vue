<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize authentication from stored tokens
  authStore.initializeAuth()
  console.log('Auth store initialized:', authStore)
})
</script>

<style scoped>

</style> 
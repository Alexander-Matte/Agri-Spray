<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

onMounted(() => {
  const authStore = useAuthStore()
  authStore.initializeAuth()
})
</script>

<style scoped>

</style> 
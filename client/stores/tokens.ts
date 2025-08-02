import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('tokens', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  // Actions
  function setTokens(access: string, refresh: string) {
    accessToken.value = access
    refreshToken.value = refresh

    console.log('🔐 Setting tokens:', { accessToken: accessToken.value, refreshToken: refreshToken.value })
  }

  function clearTokens() {
    accessToken.value = null
    refreshToken.value = null
  }

  function updateAccessToken(token: string) {
    accessToken.value = token
  }

  function updateRefreshToken(token: string) {
    refreshToken.value = token
  }

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearTokens,
    updateAccessToken,
    updateRefreshToken
  } 
}) 
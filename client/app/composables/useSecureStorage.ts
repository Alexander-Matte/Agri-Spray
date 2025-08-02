import { useCookie } from '#app'

export interface SecureStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export const useSecureStorage = (): SecureStorage => {
  return {
    getItem(key: string): string | null {
      try {
        const cookie = useCookie(key, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        return cookie.value || null
      } catch (error) {
        console.error('Failed to get secure cookie:', error)
        return null
      }
    },

    setItem(key: string, value: string): void {
      try {
        const cookie = useCookie(key, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        cookie.value = value
      } catch (error) {
        console.error('Failed to set secure cookie:', error)
      }
    },

    removeItem(key: string): void {
      try {
        const cookie = useCookie(key, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        })
        cookie.value = null
      } catch (error) {
        console.error('Failed to remove secure cookie:', error)
      }
    }
  }
}

// Fallback to localStorage for non-sensitive data
export const useLocalStorage = (): SecureStorage => {
  return {
    getItem(key: string): string | null {
      if (import.meta.client) {
        return localStorage.getItem(key)
      }
      return null
    },

    setItem(key: string, value: string): void {
      if (import.meta.client) {
        localStorage.setItem(key, value)
      }
    },

    removeItem(key: string): void {
      if (import.meta.client) {
        localStorage.removeItem(key)
      }
    }
  }
} 
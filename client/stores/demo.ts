import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useDemoManagerStore } from './demoManager'
import { useDemoPilotStore } from './demoPilot'
import { useDemoLoaderStore } from './demoLoader'

export const useDemoStore = defineStore('demo', () => {
  // State
  const isDemoMode = ref(false)
  const demoStartTime = ref<number | null>(null)
  const sessionWarningShown = ref(false)
  
  // Session timeout (30 minutes)
  const SESSION_DURATION = 30 * 60 * 1000
  const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before expiry

  // Store references
  const authStore = useAuthStore()
  const managerStore = useDemoManagerStore()
  const pilotStore = useDemoPilotStore()
  const loaderStore = useDemoLoaderStore()

  // Getters
  const isDemo = computed(() => {
    return authStore.user?.roles?.some(role => 
      role.includes('ROLE_DEMO_')
    ) || false
  })

  const demoRole = computed(() => {
    if (!authStore.user?.roles) return null
    
    if (authStore.user.roles.includes('ROLE_DEMO_MANAGER')) return 'manager'
    if (authStore.user.roles.includes('ROLE_DEMO_PILOT')) return 'pilot'
    if (authStore.user.roles.includes('ROLE_DEMO_LOADER')) return 'loader'
    
    return null
  })

  const sessionTimeRemaining = computed(() => {
    if (!demoStartTime.value) return 0
    const elapsed = Date.now() - demoStartTime.value
    return Math.max(0, SESSION_DURATION - elapsed)
  })

  const sessionMinutesRemaining = computed(() => {
    return Math.ceil(sessionTimeRemaining.value / (1000 * 60))
  })

  const shouldShowWarning = computed(() => {
    return sessionTimeRemaining.value <= WARNING_TIME && 
           sessionTimeRemaining.value > 0 && 
           !sessionWarningShown.value
  })

  // Actions
  const initializeDemoMode = () => {
    if (!isDemo.value) return

    console.log('🚀 Initializing demo mode for role:', demoRole.value)
    
    isDemoMode.value = true
    demoStartTime.value = Date.now()
    sessionWarningShown.value = false

    // Initialize the appropriate store based on role
    switch (demoRole.value) {
      case 'manager':
        managerStore.initializeDemoData()
        break
      case 'pilot':
        pilotStore.initializeDemoData()
        break
      case 'loader':
        loaderStore.initializeDemoData()
        break
    }

    // Set up session warning
    setTimeout(() => {
      if (shouldShowWarning.value) {
        showSessionWarning()
      }
    }, SESSION_DURATION - WARNING_TIME)
  }

  const extendDemoSession = () => {
    if (!isDemoMode.value) return

    console.log('🔄 Extending demo session')
    
    demoStartTime.value = Date.now()
    sessionWarningShown.value = false

    // Extend session in the appropriate store
    switch (demoRole.value) {
      case 'manager':
        managerStore.extendSession()
        break
      case 'pilot':
        pilotStore.extendSession()
        break
      case 'loader':
        loaderStore.extendSession()
        break
    }
  }

  const showSessionWarning = () => {
    sessionWarningShown.value = true
    
    // You can integrate with your toast/notification system here
    console.warn(`⚠️ Demo session will expire in ${sessionMinutesRemaining.value} minutes`)
    
    // Show user a notification
    if (typeof window !== 'undefined') {
      const extend = confirm(
        `Your demo session will expire in ${sessionMinutesRemaining.value} minutes. Would you like to extend it?`
      )
      
      if (extend) {
        extendDemoSession()
      }
    }
  }

  const clearAllDemoData = () => {
    console.log('🧹 Clearing all demo data')
    
    isDemoMode.value = false
    demoStartTime.value = null
    sessionWarningShown.value = false

    // Clear all demo stores
    managerStore.clearDemoData()
    pilotStore.clearDemoData()
    loaderStore.clearDemoData()
  }

  // User management for demo mode
  const createDemoUser = async (userData: any) => {
    if (!isDemoMode.value || demoRole.value !== 'manager') {
      throw new Error('Demo user creation only available in manager demo mode')
    }

    console.log('👤 Creating demo user:', userData)
    
    // Add to demo manager store instead of calling API
    const demoUser = managerStore.addUser(userData)
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return demoUser
  }

  const getDemoUsers = () => {
    if (!isDemoMode.value || demoRole.value !== 'manager') {
      return []
    }

    return managerStore.users
  }

  // Mission management for demo mode
  const createDemoMission = async (missionData: any) => {
    if (!isDemoMode.value) {
      throw new Error('Demo mission creation only available in demo mode')
    }

    console.log('✈️ Creating demo mission:', missionData)
    
    let demoMission
    
    switch (demoRole.value) {
      case 'manager':
        demoMission = managerStore.addMission(missionData)
        break
      case 'pilot':
        // Pilots can create flight logs
        demoMission = pilotStore.addFlightLog(missionData)
        break
      default:
        throw new Error('Mission creation not available for this demo role')
    }
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return demoMission
  }

  // Chemical/Load management for demo mode
  const createDemoLoad = async (loadData: any) => {
    if (!isDemoMode.value || demoRole.value !== 'loader') {
      throw new Error('Demo load creation only available in loader demo mode')
    }

    console.log('🧪 Creating demo load:', loadData)
    
    const demoLoad = loaderStore.createLoad(loadData)
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return demoLoad
  }

  // Activity tracking to extend session on user interaction
  const trackDemoActivity = () => {
    if (isDemoMode.value) {
      extendDemoSession()
    }
  }

  // Watch for demo mode changes
  const handleAuthChange = () => {
    if (isDemo.value && !isDemoMode.value) {
      initializeDemoMode()
    } else if (!isDemo.value && isDemoMode.value) {
      clearAllDemoData()
    }
  }

  // Auto-track user activity
  if (typeof window !== 'undefined') {
    const activityEvents = ['click', 'keydown', 'scroll', 'mousemove']
    let lastActivity = Date.now()
    
    activityEvents.forEach(event => {
      window.addEventListener(event, () => {
        const now = Date.now()
        // Only extend session if it's been more than 1 minute since last activity
        if (now - lastActivity > 60 * 1000) {
          trackDemoActivity()
          lastActivity = now
        }
      }, { passive: true })
    })

    // Clear demo data when browser/tab closes
    window.addEventListener('beforeunload', () => {
      if (isDemoMode.value) {
        clearAllDemoData()
      }
    })
  }

  return {
    // State
    isDemoMode,
    demoStartTime,
    sessionWarningShown,
    
    // Getters
    isDemo,
    demoRole,
    sessionTimeRemaining,
    sessionMinutesRemaining,
    shouldShowWarning,
    
    // Actions
    initializeDemoMode,
    extendDemoSession,
    clearAllDemoData,
    createDemoUser,
    getDemoUsers,
    createDemoMission,
    createDemoLoad,
    trackDemoActivity,
    handleAuthChange,
    
    // Store references for direct access if needed
    managerStore,
    pilotStore,
    loaderStore
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../src/interfaces/user'

export interface DemoUser extends User {
  id: string
  createdAt: string
  lastModified: string
}

export interface DemoMission {
  id: string
  title: string
  description: string
  assignedPilot?: string
  assignedLoader?: string
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled'
  location: string
  scheduledDate: string
  aircraft?: string
  chemical?: string
  acres: number
  createdAt: string
  lastModified: string
}

export interface DemoAircraft {
  id: string
  name: string
  model: string
  tailNumber: string
  status: 'available' | 'in-use' | 'maintenance'
  capacity: number
  createdAt: string
  lastModified: string
}

export const useDemoManagerStore = defineStore('demoManager', () => {
  // State
  const users = ref<DemoUser[]>([])
  const missions = ref<DemoMission[]>([])
  const aircraft = ref<DemoAircraft[]>([])
  const isInitialized = ref(false)
  const sessionTimeout = ref<NodeJS.Timeout | null>(null)
  
  // Session timeout (30 minutes)
  const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds
  const STORAGE_KEY_PREFIX = 'agri_demo_manager_'

  // Getters
  const totalUsers = computed(() => users.value.length)
  const totalMissions = computed(() => missions.value.length)
  const activeMissions = computed(() => 
    missions.value.filter(m => m.status === 'in-progress' || m.status === 'assigned')
  )
  const completedMissions = computed(() => 
    missions.value.filter(m => m.status === 'completed')
  )
  const availableAircraft = computed(() => 
    aircraft.value.filter(a => a.status === 'available')
  )

  // Utility functions
  const generateId = () => `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
      }))
    } catch (error) {
      console.warn('Failed to save demo data to localStorage:', error)
    }
  }

  const loadFromLocalStorage = (key: string) => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (!stored) return null

      const parsed = JSON.parse(stored)
      
      // Check if data has expired
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`)
        return null
      }
      
      return parsed.data
    } catch (error) {
      console.warn('Failed to load demo data from localStorage:', error)
      return null
    }
  }

  const clearLocalStorage = () => {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }

  // Session management
  const startSession = () => {
    // Clear any existing timeout
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    // Set new timeout
    sessionTimeout.value = setTimeout(() => {
      console.log('Demo session expired, clearing data')
      clearDemoData()
    }, SESSION_DURATION)
  }

  const extendSession = () => {
    // Extend the session on user activity
    startSession()
    
    // Update expiration timestamp in localStorage
    const keys = ['users', 'missions', 'aircraft']
    keys.forEach(key => {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          parsed.expiresAt = Date.now() + SESSION_DURATION
          localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(parsed))
        } catch (error) {
          console.warn('Failed to extend session for key:', key)
        }
      }
    })
  }

  // Actions
  const initializeDemoData = () => {
    if (isInitialized.value) return

    // Load existing data from localStorage
    const storedUsers = loadFromLocalStorage('users')
    const storedMissions = loadFromLocalStorage('missions')
    const storedAircraft = loadFromLocalStorage('aircraft')

    if (storedUsers) users.value = storedUsers
    if (storedMissions) missions.value = storedMissions
    if (storedAircraft) aircraft.value = storedAircraft

    // If no data exists, create some sample data
    if (users.value.length === 0) {
      createSampleData()
    }

    isInitialized.value = true
    startSession()
  }

  const createSampleData = () => {
    // Sample aircraft
    const sampleAircraft: DemoAircraft[] = [
      {
        id: generateId(),
        name: 'Spray Eagle 1',
        model: 'Air Tractor AT-802A',
        tailNumber: 'N801AG',
        status: 'available',
        capacity: 800,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      {
        id: generateId(),
        name: 'Sky Sprayer',
        model: 'Thrush 710P',
        tailNumber: 'N710SP',
        status: 'available',
        capacity: 710,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      }
    ]

    aircraft.value = sampleAircraft
    saveToLocalStorage('aircraft', aircraft.value)
  }

  // User management
  const addUser = (userData: Omit<User, 'id'>) => {
    extendSession()
    
    const newUser: DemoUser = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    users.value.push(newUser)
    saveToLocalStorage('users', users.value)
    
    return newUser
  }

  const updateUser = (id: string, updates: Partial<DemoUser>) => {
    extendSession()
    
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('users', users.value)
      return users.value[index]
    }
    return null
  }

  const deleteUser = (id: string) => {
    extendSession()
    
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
      saveToLocalStorage('users', users.value)
      return true
    }
    return false
  }

  // Mission management
  const addMission = (missionData: Omit<DemoMission, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newMission: DemoMission = {
      ...missionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    missions.value.push(newMission)
    saveToLocalStorage('missions', missions.value)
    
    return newMission
  }

  const updateMission = (id: string, updates: Partial<DemoMission>) => {
    extendSession()
    
    const index = missions.value.findIndex(m => m.id === id)
    if (index !== -1) {
      missions.value[index] = {
        ...missions.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('missions', missions.value)
      return missions.value[index]
    }
    return null
  }

  const deleteMission = (id: string) => {
    extendSession()
    
    const index = missions.value.findIndex(m => m.id === id)
    if (index !== -1) {
      missions.value.splice(index, 1)
      saveToLocalStorage('missions', missions.value)
      return true
    }
    return false
  }

  // Aircraft management
  const addAircraft = (aircraftData: Omit<DemoAircraft, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newAircraft: DemoAircraft = {
      ...aircraftData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    aircraft.value.push(newAircraft)
    saveToLocalStorage('aircraft', aircraft.value)
    
    return newAircraft
  }

  const updateAircraft = (id: string, updates: Partial<DemoAircraft>) => {
    extendSession()
    
    const index = aircraft.value.findIndex(a => a.id === id)
    if (index !== -1) {
      aircraft.value[index] = {
        ...aircraft.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('aircraft', aircraft.value)
      return aircraft.value[index]
    }
    return null
  }

  const deleteAircraft = (id: string) => {
    extendSession()
    
    const index = aircraft.value.findIndex(a => a.id === id)
    if (index !== -1) {
      aircraft.value.splice(index, 1)
      saveToLocalStorage('aircraft', aircraft.value)
      return true
    }
    return false
  }

  // Cleanup
  const clearDemoData = () => {
    users.value = []
    missions.value = []
    aircraft.value = []
    isInitialized.value = false
    
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
      sessionTimeout.value = null
    }
    
    clearLocalStorage()
  }

  // Browser close detection
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      clearDemoData()
    })
  }

  return {
    // State
    users,
    missions, 
    aircraft,
    isInitialized,
    
    // Getters
    totalUsers,
    totalMissions,
    activeMissions,
    completedMissions,
    availableAircraft,
    
    // Actions
    initializeDemoData,
    extendSession,
    addUser,
    updateUser,
    deleteUser,
    addMission,
    updateMission,
    deleteMission,
    addAircraft,
    updateAircraft,
    deleteAircraft,
    clearDemoData
  }
})

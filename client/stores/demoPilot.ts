import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DemoFlightLog {
  id: string
  missionId: string
  missionTitle: string
  date: string
  startTime: string
  endTime: string
  flightDuration: number // in minutes
  aircraftId: string
  aircraftName: string
  location: string
  acres: number
  chemicalUsed: string
  gallonsApplied: number
  conditions: {
    windSpeed: number
    windDirection: string
    temperature: number
    humidity: number
    visibility: string
  }
  notes: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: string
  lastModified: string
}

export interface DemoMaintenance {
  id: string
  aircraftId: string
  aircraftName: string
  type: 'routine' | 'repair' | 'inspection'
  description: string
  scheduledDate: string
  completedDate?: string
  hoursLogged: number
  status: 'scheduled' | 'in-progress' | 'completed'
  notes: string
  createdAt: string
  lastModified: string
}

export const useDemoPilotStore = defineStore('demoPilot', () => {
  // State
  const flightLogs = ref<DemoFlightLog[]>([])
  const maintenanceRecords = ref<DemoMaintenance[]>([])
  const isInitialized = ref(false)
  const sessionTimeout = ref<NodeJS.Timeout | null>(null)
  
  // Session timeout (30 minutes)
  const SESSION_DURATION = 30 * 60 * 1000
  const STORAGE_KEY_PREFIX = 'agri_demo_pilot_'

  // Getters
  const totalFlights = computed(() => flightLogs.value.length)
  const completedFlights = computed(() => 
    flightLogs.value.filter(f => f.status === 'completed')
  )
  const upcomingFlights = computed(() => 
    flightLogs.value.filter(f => f.status === 'scheduled')
  )
  const totalFlightHours = computed(() => 
    completedFlights.value.reduce((total, flight) => total + flight.flightDuration, 0) / 60
  )
  const totalAcresSprayed = computed(() => 
    completedFlights.value.reduce((total, flight) => total + flight.acres, 0)
  )
  const pendingMaintenance = computed(() => 
    maintenanceRecords.value.filter(m => m.status !== 'completed')
  )

  // Utility functions
  const generateId = () => `demo_pilot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
      }))
    } catch (error) {
      console.warn('Failed to save pilot demo data to localStorage:', error)
    }
  }

  const loadFromLocalStorage = (key: string) => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (!stored) return null

      const parsed = JSON.parse(stored)
      
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`)
        return null
      }
      
      return parsed.data
    } catch (error) {
      console.warn('Failed to load pilot demo data from localStorage:', error)
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
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    sessionTimeout.value = setTimeout(() => {
      console.log('Demo pilot session expired, clearing data')
      clearDemoData()
    }, SESSION_DURATION)
  }

  const extendSession = () => {
    startSession()
    
    const keys = ['flightLogs', 'maintenanceRecords']
    keys.forEach(key => {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          parsed.expiresAt = Date.now() + SESSION_DURATION
          localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(parsed))
        } catch (error) {
          console.warn('Failed to extend pilot session for key:', key)
        }
      }
    })
  }

  // Actions
  const initializeDemoData = () => {
    if (isInitialized.value) return

    const storedFlightLogs = loadFromLocalStorage('flightLogs')
    const storedMaintenance = loadFromLocalStorage('maintenanceRecords')

    if (storedFlightLogs) flightLogs.value = storedFlightLogs
    if (storedMaintenance) maintenanceRecords.value = storedMaintenance

    if (flightLogs.value.length === 0) {
      createSampleData()
    }

    isInitialized.value = true
    startSession()
  }

  const createSampleData = () => {
    // Sample flight logs
    const sampleFlights: DemoFlightLog[] = [
      {
        id: generateId(),
        missionId: 'demo_mission_1',
        missionTitle: 'Johnson Farm Corn Field',
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '10:30',
        flightDuration: 150,
        aircraftId: 'demo_aircraft_1',
        aircraftName: 'Spray Eagle 1',
        location: 'Johnson Farm, Field A',
        acres: 240,
        chemicalUsed: 'Atrazine 4L',
        gallonsApplied: 60,
        conditions: {
          windSpeed: 8,
          windDirection: 'NW',
          temperature: 72,
          humidity: 45,
          visibility: 'Clear'
        },
        notes: 'Perfect spraying conditions. Field completed successfully.',
        status: 'completed',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      }
    ]

    flightLogs.value = sampleFlights
    saveToLocalStorage('flightLogs', flightLogs.value)
  }

  // Flight log management
  const addFlightLog = (logData: Omit<DemoFlightLog, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newLog: DemoFlightLog = {
      ...logData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    flightLogs.value.push(newLog)
    saveToLocalStorage('flightLogs', flightLogs.value)
    
    return newLog
  }

  const updateFlightLog = (id: string, updates: Partial<DemoFlightLog>) => {
    extendSession()
    
    const index = flightLogs.value.findIndex(f => f.id === id)
    if (index !== -1) {
      flightLogs.value[index] = {
        ...flightLogs.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('flightLogs', flightLogs.value)
      return flightLogs.value[index]
    }
    return null
  }

  const deleteFlightLog = (id: string) => {
    extendSession()
    
    const index = flightLogs.value.findIndex(f => f.id === id)
    if (index !== -1) {
      flightLogs.value.splice(index, 1)
      saveToLocalStorage('flightLogs', flightLogs.value)
      return true
    }
    return false
  }

  // Maintenance management
  const addMaintenanceRecord = (maintenanceData: Omit<DemoMaintenance, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newRecord: DemoMaintenance = {
      ...maintenanceData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    maintenanceRecords.value.push(newRecord)
    saveToLocalStorage('maintenanceRecords', maintenanceRecords.value)
    
    return newRecord
  }

  const updateMaintenanceRecord = (id: string, updates: Partial<DemoMaintenance>) => {
    extendSession()
    
    const index = maintenanceRecords.value.findIndex(m => m.id === id)
    if (index !== -1) {
      maintenanceRecords.value[index] = {
        ...maintenanceRecords.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('maintenanceRecords', maintenanceRecords.value)
      return maintenanceRecords.value[index]
    }
    return null
  }

  const deleteMaintenanceRecord = (id: string) => {
    extendSession()
    
    const index = maintenanceRecords.value.findIndex(m => m.id === id)
    if (index !== -1) {
      maintenanceRecords.value.splice(index, 1)
      saveToLocalStorage('maintenanceRecords', maintenanceRecords.value)
      return true
    }
    return false
  }

  // Flight operations
  const startFlight = (flightId: string) => {
    extendSession()
    
    const flight = flightLogs.value.find(f => f.id === flightId)
    if (flight) {
      flight.status = 'in-progress'
      flight.startTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      flight.lastModified = new Date().toISOString()
      saveToLocalStorage('flightLogs', flightLogs.value)
      return flight
    }
    return null
  }

  const completeFlight = (flightId: string, completionData: {
    endTime: string
    gallonsApplied: number
    conditions: DemoFlightLog['conditions']
    notes: string
  }) => {
    extendSession()
    
    const flight = flightLogs.value.find(f => f.id === flightId)
    if (flight) {
      flight.status = 'completed'
      flight.endTime = completionData.endTime
      flight.gallonsApplied = completionData.gallonsApplied
      flight.conditions = completionData.conditions
      flight.notes = completionData.notes
      
      // Calculate flight duration
      const start = new Date(`1970-01-01T${flight.startTime}:00`)
      const end = new Date(`1970-01-01T${completionData.endTime}:00`)
      flight.flightDuration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60))
      
      flight.lastModified = new Date().toISOString()
      saveToLocalStorage('flightLogs', flightLogs.value)
      return flight
    }
    return null
  }

  // Cleanup
  const clearDemoData = () => {
    flightLogs.value = []
    maintenanceRecords.value = []
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
    flightLogs,
    maintenanceRecords,
    isInitialized,
    
    // Getters
    totalFlights,
    completedFlights,
    upcomingFlights,
    totalFlightHours,
    totalAcresSprayed,
    pendingMaintenance,
    
    // Actions
    initializeDemoData,
    extendSession,
    addFlightLog,
    updateFlightLog,
    deleteFlightLog,
    addMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    startFlight,
    completeFlight,
    clearDemoData
  }
})

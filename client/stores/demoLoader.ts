import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DemoLoad {
  id: string
  missionId: string
  missionTitle: string
  aircraftId: string
  aircraftName: string
  chemicalId: string
  chemicalName: string
  quantity: number // in gallons
  concentration: number // percentage
  mixRatio: string
  loadDate: string
  loadTime: string
  completedBy: string
  status: 'pending' | 'mixing' | 'loaded' | 'applied' | 'empty'
  notes: string
  safetyChecklist: {
    ppeWorn: boolean
    spillKitReady: boolean
    equipmentInspected: boolean
    windConditionsAcceptable: boolean
    emergencyContactsReady: boolean
  }
  createdAt: string
  lastModified: string
}

export interface DemoChemical {
  id: string
  name: string
  type: 'herbicide' | 'insecticide' | 'fungicide' | 'fertilizer'
  activeIngredient: string
  concentration: string
  manufacturerInfo: {
    name: string
    lotNumber: string
    expirationDate: string
  }
  safetyInfo: {
    signalWord: 'Caution' | 'Warning' | 'Danger'
    reiHours: number // Restricted Entry Interval
    phiDays: number // Pre-Harvest Interval
  }
  inventoryCount: number // containers in stock
  unitSize: number // gallons per container
  costPerUnit: number
  storageLocation: string
  msdsFileUrl?: string
  notes: string
  createdAt: string
  lastModified: string
}

export interface DemoInventoryTransaction {
  id: string
  chemicalId: string
  chemicalName: string
  type: 'received' | 'used' | 'expired' | 'returned'
  quantity: number
  unitCost: number
  totalCost: number
  vendor?: string
  invoiceNumber?: string
  expirationDate?: string
  transactionDate: string
  notes: string
  createdAt: string
  lastModified: string
}

export const useDemoLoaderStore = defineStore('demoLoader', () => {
  // State
  const loads = ref<DemoLoad[]>([])
  const chemicals = ref<DemoChemical[]>([])
  const inventoryTransactions = ref<DemoInventoryTransaction[]>([])
  const isInitialized = ref(false)
  const sessionTimeout = ref<NodeJS.Timeout | null>(null)
  
  // Session timeout (30 minutes)
  const SESSION_DURATION = 30 * 60 * 1000
  const STORAGE_KEY_PREFIX = 'agri_demo_loader_'

  // Getters
  const totalLoads = computed(() => loads.value.length)
  const completedLoads = computed(() => 
    loads.value.filter(l => l.status === 'applied' || l.status === 'empty')
  )
  const pendingLoads = computed(() => 
    loads.value.filter(l => l.status === 'pending' || l.status === 'mixing')
  )
  const activeLoads = computed(() => 
    loads.value.filter(l => l.status === 'loaded')
  )
  const totalChemicalsInStock = computed(() => 
    chemicals.value.reduce((total, chemical) => total + chemical.inventoryCount, 0)
  )
  const lowStockChemicals = computed(() => 
    chemicals.value.filter(chemical => chemical.inventoryCount <= 2)
  )
  const expiringSoonChemicals = computed(() => {
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    
    return chemicals.value.filter(chemical => {
      const expirationDate = new Date(chemical.manufacturerInfo.expirationDate)
      return expirationDate <= threeMonthsFromNow && expirationDate > new Date()
    })
  })
  const totalInventoryValue = computed(() => 
    chemicals.value.reduce((total, chemical) => 
      total + (chemical.inventoryCount * chemical.unitSize * chemical.costPerUnit), 0
    )
  )

  // Utility functions
  const generateId = () => `demo_loader_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
      }))
    } catch (error) {
      console.warn('Failed to save loader demo data to localStorage:', error)
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
      console.warn('Failed to load loader demo data from localStorage:', error)
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
      console.log('Demo loader session expired, clearing data')
      clearDemoData()
    }, SESSION_DURATION)
  }

  const extendSession = () => {
    startSession()
    
    const keys = ['loads', 'chemicals', 'inventoryTransactions']
    keys.forEach(key => {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          parsed.expiresAt = Date.now() + SESSION_DURATION
          localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(parsed))
        } catch (error) {
          console.warn('Failed to extend loader session for key:', key)
        }
      }
    })
  }

  // Actions
  const initializeDemoData = () => {
    if (isInitialized.value) return

    const storedLoads = loadFromLocalStorage('loads')
    const storedChemicals = loadFromLocalStorage('chemicals')
    const storedTransactions = loadFromLocalStorage('inventoryTransactions')

    if (storedLoads) loads.value = storedLoads
    if (storedChemicals) chemicals.value = storedChemicals
    if (storedTransactions) inventoryTransactions.value = storedTransactions

    if (chemicals.value.length === 0) {
      createSampleData()
    }

    isInitialized.value = true
    startSession()
  }

  const createSampleData = () => {
    // Sample chemicals
    const sampleChemicals: DemoChemical[] = [
      {
        id: generateId(),
        name: 'Atrazine 4L',
        type: 'herbicide',
        activeIngredient: 'Atrazine',
        concentration: '42.6%',
        manufacturerInfo: {
          name: 'Syngenta',
          lotNumber: 'AT2024-001',
          expirationDate: '2025-12-31'
        },
        safetyInfo: {
          signalWord: 'Caution',
          reiHours: 12,
          phiDays: 60
        },
        inventoryCount: 8,
        unitSize: 2.5,
        costPerUnit: 45.50,
        storageLocation: 'Building A, Shelf 1',
        notes: 'Store in cool, dry place',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      {
        id: generateId(),
        name: 'Roundup PowerMAX',
        type: 'herbicide',
        activeIngredient: 'Glyphosate',
        concentration: '48.7%',
        manufacturerInfo: {
          name: 'Bayer',
          lotNumber: 'RP2024-002',
          expirationDate: '2025-09-15'
        },
        safetyInfo: {
          signalWord: 'Warning',
          reiHours: 4,
          phiDays: 7
        },
        inventoryCount: 12,
        unitSize: 2.5,
        costPerUnit: 52.75,
        storageLocation: 'Building A, Shelf 2',
        notes: 'High-concentration formula',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      }
    ]

    chemicals.value = sampleChemicals
    saveToLocalStorage('chemicals', chemicals.value)
  }

  // Load management
  const createLoad = (loadData: Omit<DemoLoad, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newLoad: DemoLoad = {
      ...loadData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    loads.value.push(newLoad)
    saveToLocalStorage('loads', loads.value)
    
    return newLoad
  }

  const updateLoad = (id: string, updates: Partial<DemoLoad>) => {
    extendSession()
    
    const index = loads.value.findIndex(l => l.id === id)
    if (index !== -1) {
      loads.value[index] = {
        ...loads.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('loads', loads.value)
      return loads.value[index]
    }
    return null
  }

  const deleteLoad = (id: string) => {
    extendSession()
    
    const index = loads.value.findIndex(l => l.id === id)
    if (index !== -1) {
      loads.value.splice(index, 1)
      saveToLocalStorage('loads', loads.value)
      return true
    }
    return false
  }

  // Chemical management
  const addChemical = (chemicalData: Omit<DemoChemical, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newChemical: DemoChemical = {
      ...chemicalData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    chemicals.value.push(newChemical)
    saveToLocalStorage('chemicals', chemicals.value)
    
    return newChemical
  }

  const updateChemical = (id: string, updates: Partial<DemoChemical>) => {
    extendSession()
    
    const index = chemicals.value.findIndex(c => c.id === id)
    if (index !== -1) {
      chemicals.value[index] = {
        ...chemicals.value[index],
        ...updates,
        lastModified: new Date().toISOString()
      }
      saveToLocalStorage('chemicals', chemicals.value)
      return chemicals.value[index]
    }
    return null
  }

  const deleteChemical = (id: string) => {
    extendSession()
    
    const index = chemicals.value.findIndex(c => c.id === id)
    if (index !== -1) {
      chemicals.value.splice(index, 1)
      saveToLocalStorage('chemicals', chemicals.value)
      return true
    }
    return false
  }

  // Inventory management
  const recordInventoryTransaction = (transactionData: Omit<DemoInventoryTransaction, 'id' | 'createdAt' | 'lastModified'>) => {
    extendSession()
    
    const newTransaction: DemoInventoryTransaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    inventoryTransactions.value.push(newTransaction)
    saveToLocalStorage('inventoryTransactions', inventoryTransactions.value)
    
    // Update chemical inventory count
    const chemical = chemicals.value.find(c => c.id === transactionData.chemicalId)
    if (chemical) {
      if (transactionData.type === 'received') {
        chemical.inventoryCount += transactionData.quantity
      } else if (transactionData.type === 'used' || transactionData.type === 'expired') {
        chemical.inventoryCount = Math.max(0, chemical.inventoryCount - transactionData.quantity)
      }
      chemical.lastModified = new Date().toISOString()
      saveToLocalStorage('chemicals', chemicals.value)
    }
    
    return newTransaction
  }

  const markLoadAsUsed = (loadId: string) => {
    extendSession()
    
    const load = loads.value.find(l => l.id === loadId)
    if (load && load.status === 'loaded') {
      // Record chemical usage
      recordInventoryTransaction({
        chemicalId: load.chemicalId,
        chemicalName: load.chemicalName,
        type: 'used',
        quantity: Math.ceil(load.quantity / chemicals.value.find(c => c.id === load.chemicalId)?.unitSize || 1),
        unitCost: chemicals.value.find(c => c.id === load.chemicalId)?.costPerUnit || 0,
        totalCost: 0, // Will be calculated
        transactionDate: new Date().toISOString().split('T')[0],
        notes: `Used for mission: ${load.missionTitle}`
      })
      
      // Update load status
      load.status = 'applied'
      load.lastModified = new Date().toISOString()
      saveToLocalStorage('loads', loads.value)
      
      return load
    }
    return null
  }

  // Cleanup
  const clearDemoData = () => {
    loads.value = []
    chemicals.value = []
    inventoryTransactions.value = []
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
    loads,
    chemicals,
    inventoryTransactions,
    isInitialized,
    
    // Getters
    totalLoads,
    completedLoads,
    pendingLoads,
    activeLoads,
    totalChemicalsInStock,
    lowStockChemicals,
    expiringSoonChemicals,
    totalInventoryValue,
    
    // Actions
    initializeDemoData,
    extendSession,
    createLoad,
    updateLoad,
    deleteLoad,
    addChemical,
    updateChemical,
    deleteChemical,
    recordInventoryTransaction,
    markLoadAsUsed,
    clearDemoData
  }
})

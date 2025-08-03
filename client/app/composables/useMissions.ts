import { useApi } from './useApi'

export interface Mission {
  id: number
  title: string
  type: string
  status: string
  scheduledDate: string
  estimatedDuration: number
  location: string
  fieldSizes: number[]
  notes?: string
  customer?: {
    id: number
    name: string
  }
  pilot?: {
    id: number
    name: string
  }
  aircraft?: {
    id: number
    registration: string
  }
  loads?: Load[]
}

export interface Load {
  id: number
  chemicalMix: string
  volume: number
  applicationRate: number
  status: string
  preparedAt?: string
  loadedAt?: string
  completedAt?: string
  chemical?: {
    id: number
    name: string
  }
  loader?: {
    id: number
    name: string
  }
}

export interface DashboardStats {
  activeMissions: number
  availablePilots: number
  availableAircraft: number
  todayMissions: number
  completedMissions: number
  totalMissions: number
}

export const useMissions = () => {
  const { get, post, put, del } = useApi()

  // Get missions with optional filters
  const getMissions = async (params: {
    limit?: number
    status?: string
    date?: string
    pilot?: number
    customer?: number
  } = {}) => {
    const queryParams = new URLSearchParams()
    
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.status) queryParams.append('status', params.status)
    if (params.date) queryParams.append('date', params.date)
    if (params.pilot) queryParams.append('pilot', params.pilot.toString())
    if (params.customer) queryParams.append('customer', params.customer.toString())

    const endpoint = `/api/missions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return await get<Mission[]>(endpoint)
  }

  // Get a single mission
  const getMission = async (id: number) => {
    return await get<Mission>(`/api/missions/${id}`)
  }

  // Create a new mission
  const createMission = async (missionData: Partial<Mission>) => {
    return await post<Mission>('/api/missions', missionData)
  }

  // Update a mission
  const updateMission = async (id: number, missionData: Partial<Mission>) => {
    return await put<Mission>(`/api/missions/${id}`, missionData)
  }

  // Delete a mission
  const deleteMission = async (id: number) => {
    return await del(`/api/missions/${id}`)
  }

  // Get dashboard statistics
  const getDashboardStats = async () => {
    return await get<DashboardStats>('/api/dashboard/stats')
  }

  // Get mission summaries
  const getMissionSummaries = async () => {
    return await get<Mission[]>('/api/missions/summary')
  }

  // Get loads for a mission
  const getMissionLoads = async (missionId: number) => {
    return await get<Load[]>(`/api/missions/${missionId}/loads`)
  }

  // Create a load for a mission
  const createLoad = async (missionId: number, loadData: Partial<Load>) => {
    return await post<Load>(`/api/missions/${missionId}/loads`, loadData)
  }

  // Update a load
  const updateLoad = async (loadId: number, loadData: Partial<Load>) => {
    return await put<Load>(`/api/loads/${loadId}`, loadData)
  }

  // Delete a load
  const deleteLoad = async (loadId: number) => {
    return await del(`/api/loads/${loadId}`)
  }

  return {
    // Mission operations
    getMissions,
    getMission,
    createMission,
    updateMission,
    deleteMission,
    
    // Dashboard operations
    getDashboardStats,
    getMissionSummaries,
    
    // Load operations
    getMissionLoads,
    createLoad,
    updateLoad,
    deleteLoad
  }
} 
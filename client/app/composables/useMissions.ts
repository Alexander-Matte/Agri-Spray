import { ref, readonly } from 'vue'

export interface Mission {
  id: number
  title: string
  type: string
  fieldSizeTotal: number
  fieldSizeSprayable: number
  location: string
  status: string
  scheduledAt: string
  createdAt: string
  updatedAt: string
  pilot?: {
    id: number
    name: string
  }
  customer?: {
    id: number
    name: string
  }
  base?: {
    id: number
    name: string
  }
}

export interface CreateMissionData {
  title: string
  type: string
  fieldSizeTotal: number
  fieldSizeSprayable: number
  location: string
  scheduledAt?: string
  pilotId?: number
  customerId?: number
  baseId?: number
}

export const useMissions = () => {
  const missions = ref<Mission[]>([])
  const currentMission = ref<Mission | null>(null)
  const { api, get, post, put, del } = useApi()
  const { currentError, isLoading, clearError } = useApiError()

  // Fetch all missions
  const fetchMissions = async () => {
    const response = await get<Mission[]>('/api/missions', {
      errorOptions: {
        customMessage: 'Failed to load missions. Please try again.'
      },
      retryOptions: {
        retryOnError: true,
        maxRetries: 2
      }
    })

    if (response) {
      missions.value = response
    }

    return response
  }

  // Fetch single mission
  const fetchMission = async (id: number) => {
    const response = await get<Mission>(`/api/missions/${id}`, {
      errorOptions: {
        customMessage: 'Failed to load mission details.'
      }
    })

    if (response) {
      currentMission.value = response
    }

    return response
  }

  // Create new mission
  const createMission = async (missionData: CreateMissionData) => {
    const response = await post<Mission>('/api/missions', missionData, {
      errorOptions: {
        customMessage: 'Failed to create mission. Please check your input and try again.'
      }
    })

    if (response) {
      // Add to missions list
      missions.value.push(response)
    }

    return response
  }

  // Update mission
  const updateMission = async (id: number, missionData: Partial<CreateMissionData>) => {
    const response = await put<Mission>(`/api/missions/${id}`, missionData, {
      errorOptions: {
        customMessage: 'Failed to update mission. Please try again.'
      }
    })

    if (response) {
      // Update in missions list
      const index = missions.value.findIndex(m => m.id === id)
      if (index !== -1) {
        missions.value[index] = response
      }
      
      // Update current mission if it's the one being updated
      if (currentMission.value?.id === id) {
        currentMission.value = response
      }
    }

    return response
  }

  // Delete mission
  const deleteMission = async (id: number) => {
    const response = await del<{ success: boolean }>(`/api/missions/${id}`, {
      errorOptions: {
        customMessage: 'Failed to delete mission. Please try again.'
      }
    })

    if (response) {
      // Remove from missions list
      missions.value = missions.value.filter(m => m.id !== id)
      
      // Clear current mission if it's the one being deleted
      if (currentMission.value?.id === id) {
        currentMission.value = null
      }
    }

    return response
  }

  // Search missions
  const searchMissions = async (query: string) => {
    const response = await get<Mission[]>('/api/missions', {
      params: { search: query },
      errorOptions: {
        customMessage: 'Failed to search missions.'
      }
    })

    if (response) {
      missions.value = response
    }

    return response
  }

  // Get missions by status
  const getMissionsByStatus = async (status: string) => {
    const response = await get<Mission[]>('/api/missions', {
      params: { status },
      errorOptions: {
        customMessage: `Failed to load ${status} missions.`
      }
    })

    if (response) {
      missions.value = response
    }

    return response
  }

  return {
    // State
    missions: readonly(missions),
    currentMission: readonly(currentMission),
    currentError: readonly(currentError),
    isLoading: readonly(isLoading),

    // Actions
    fetchMissions,
    fetchMission,
    createMission,
    updateMission,
    deleteMission,
    searchMissions,
    getMissionsByStatus,
    clearError
  }
} 
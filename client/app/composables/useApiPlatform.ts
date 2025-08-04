import { useApi } from './useApi'

// API Platform resource types
import type { User } from '../../src/interfaces/user'
import type { Pilot } from '../../src/interfaces/pilot'
import type { Mission } from '../../src/interfaces/mission'
import type { Loader } from '../../src/interfaces/loader'
import type { Load } from '../../src/interfaces/load'
import type { Customer } from '../../src/interfaces/customer'
import type { Chemical } from '../../src/interfaces/chemical'
import type { Base } from '../../src/interfaces/base'
import type { Aircraft } from '../../src/interfaces/aircraft'

export const useApiPlatform = () => {
  const { get, post, put, patch, del } = useApi()

  // User operations
  const getUsers = () => get<User[]>('/api/users')
  const getUser = (id: string) => get<User>(`/api/users/${id}`)
  const createUser = (user: Partial<User>) => post<User>('/api/users', user)
  const updateUser = (id: string, user: Partial<User>) => put<User>(`/api/users/${id}`, user)
  const patchUser = (id: string, user: Partial<User>) => patch<User>(`/api/users/${id}`, user)
  const deleteUser = (id: string) => del(`/api/users/${id}`)

  // Pilot operations
  const getPilots = () => get<Pilot[]>('/api/pilots')
  const getPilot = (id: string) => get<Pilot>(`/api/pilots/${id}`)
  const createPilot = (pilot: Partial<Pilot>) => post<Pilot>('/api/pilots', pilot)
  const updatePilot = (id: string, pilot: Partial<Pilot>) => put<Pilot>(`/api/pilots/${id}`, pilot)
  const patchPilot = (id: string, pilot: Partial<Pilot>) => patch<Pilot>(`/api/pilots/${id}`, pilot)
  const deletePilot = (id: string) => del(`/api/pilots/${id}`)

  // Mission operations
  const getMissions = () => get<Mission[]>('/api/missions')
  const getMission = (id: string) => get<Mission>(`/api/missions/${id}`)
  const createMission = (mission: Partial<Mission>) => post<Mission>('/api/missions', mission)
  const updateMission = (id: string, mission: Partial<Mission>) => put<Mission>(`/api/missions/${id}`, mission)
  const patchMission = (id: string, mission: Partial<Mission>) => patch<Mission>(`/api/missions/${id}`, mission)
  const deleteMission = (id: string) => del(`/api/missions/${id}`)

  // Loader operations
  const getLoaders = () => get<Loader[]>('/api/loaders')
  const getLoader = (id: string) => get<Loader>(`/api/loaders/${id}`)
  const createLoader = (loader: Partial<Loader>) => post<Loader>('/api/loaders', loader)
  const updateLoader = (id: string, loader: Partial<Loader>) => put<Loader>(`/api/loaders/${id}`, loader)
  const patchLoader = (id: string, loader: Partial<Loader>) => patch<Loader>(`/api/loaders/${id}`, loader)
  const deleteLoader = (id: string) => del(`/api/loaders/${id}`)

  // Load operations
  const getLoads = () => get<Load[]>('/api/loads')
  const getLoad = (id: string) => get<Load>(`/api/loads/${id}`)
  const createLoad = (load: Partial<Load>) => post<Load>('/api/loads', load)
  const updateLoad = (id: string, load: Partial<Load>) => put<Load>(`/api/loads/${id}`, load)
  const patchLoad = (id: string, load: Partial<Load>) => patch<Load>(`/api/loads/${id}`, load)
  const deleteLoad = (id: string) => del(`/api/loads/${id}`)

  // Customer operations
  const getCustomers = () => get<Customer[]>('/api/customers')
  const getCustomer = (id: string) => get<Customer>(`/api/customers/${id}`)
  const createCustomer = (customer: Partial<Customer>) => post<Customer>('/api/customers', customer)
  const updateCustomer = (id: string, customer: Partial<Customer>) => put<Customer>(`/api/customers/${id}`, customer)
  const patchCustomer = (id: string, customer: Partial<Customer>) => patch<Customer>(`/api/customers/${id}`, customer)
  const deleteCustomer = (id: string) => del(`/api/customers/${id}`)

  // Chemical operations
  const getChemicals = () => get<Chemical[]>('/api/chemicals')
  const getChemical = (id: string) => get<Chemical>(`/api/chemicals/${id}`)
  const createChemical = (chemical: Partial<Chemical>) => post<Chemical>('/api/chemicals', chemical)
  const updateChemical = (id: string, chemical: Partial<Chemical>) => put<Chemical>(`/api/chemicals/${id}`, chemical)
  const patchChemical = (id: string, chemical: Partial<Chemical>) => patch<Chemical>(`/api/chemicals/${id}`, chemical)
  const deleteChemical = (id: string) => del(`/api/chemicals/${id}`)

  // Base operations
  const getBases = () => get<Base[]>('/api/bases')
  const getBase = (id: string) => get<Base>(`/api/bases/${id}`)
  const createBase = (base: Partial<Base>) => post<Base>('/api/bases', base)
  const updateBase = (id: string, base: Partial<Base>) => put<Base>(`/api/bases/${id}`, base)
  const patchBase = (id: string, base: Partial<Base>) => patch<Base>(`/api/bases/${id}`, base)
  const deleteBase = (id: string) => del(`/api/bases/${id}`)

  // Aircraft operations
  const getAircraft = () => get<Aircraft[]>('/api/aircraft')
  const getAircraftById = (id: string) => get<Aircraft>(`/api/aircraft/${id}`)
  const createAircraft = (aircraft: Partial<Aircraft>) => post<Aircraft>('/api/aircraft', aircraft)
  const updateAircraft = (id: string, aircraft: Partial<Aircraft>) => put<Aircraft>(`/api/aircraft/${id}`, aircraft)
  const patchAircraft = (id: string, aircraft: Partial<Aircraft>) => patch<Aircraft>(`/api/aircraft/${id}`, aircraft)
  const deleteAircraft = (id: string) => del(`/api/aircraft/${id}`)

  return {
    // User operations
    getUsers,
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,

    // Pilot operations
    getPilots,
    getPilot,
    createPilot,
    updatePilot,
    patchPilot,
    deletePilot,

    // Mission operations
    getMissions,
    getMission,
    createMission,
    updateMission,
    patchMission,
    deleteMission,

    // Loader operations
    getLoaders,
    getLoader,
    createLoader,
    updateLoader,
    patchLoader,
    deleteLoader,

    // Load operations
    getLoads,
    getLoad,
    createLoad,
    updateLoad,
    patchLoad,
    deleteLoad,

    // Customer operations
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    patchCustomer,
    deleteCustomer,

    // Chemical operations
    getChemicals,
    getChemical,
    createChemical,
    updateChemical,
    patchChemical,
    deleteChemical,

    // Base operations
    getBases,
    getBase,
    createBase,
    updateBase,
    patchBase,
    deleteBase,

    // Aircraft operations
    getAircraft,
    getAircraftById,
    createAircraft,
    updateAircraft,
    patchAircraft,
    deleteAircraft,
  }
} 
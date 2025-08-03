import { $fetch } from 'ofetch'
import { useAuthStore } from '../../stores/auth'

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
  params?: Record<string, any>
  errorOptions?: {
    showNotification?: boolean
    logToConsole?: boolean
    redirectOnAuthError?: boolean
    customMessage?: string
  }
  retryOptions?: {
    maxRetries?: number
    retryOnError?: boolean
  }
}

export const useApi = () => {
  const { handleError, withErrorHandling, retryApiCall } = useApiError()

  // Get auth headers
  const getAuthHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Host': 'localhost'
    }

    // Note: JWT tokens are now automatically sent via secure cookies
    // No need to manually set Authorization header
    return headers
  }

  // Base API call with error handling
  const apiCall = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const {
      method = 'GET',
      body,
      headers = {},
      params,
      errorOptions = {},
      retryOptions = {}
    } = options
  
    const config = {
      method,
      body,
      headers: {
        ...getAuthHeaders(),
        ...headers
      },
      params
    }
  
    // Remove body for GET requests
    if (method === 'GET') {
      delete config.body
    }
  
    // Perform the fetch request - $fetch automatically handles JSON parsing
    const response = await $fetch<T>(endpoint, config)
    
    // Return the response directly - $fetch already handles JSON parsing
    return response
  }

  // API call with automatic error handling
  const api = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T | null> => {
    const { errorOptions = {}, retryOptions = {} } = options

    if (retryOptions.retryOnError) {
      return await retryApiCall(
        () => apiCall<T>(endpoint, options),
        retryOptions.maxRetries || 3,
        errorOptions
      )
    }

    return await withErrorHandling(
      () => apiCall<T>(endpoint, options),
      errorOptions
    )
  }

  // Convenience methods for common HTTP methods
  const get = async <T>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}): Promise<T | null> => {
    return await api<T>(endpoint, { ...options, method: 'GET' })
  }

  const post = async <T>(endpoint: string, body: any, options: Omit<ApiOptions, 'method' | 'body'> = {}): Promise<T | null> => {
    return await api<T>(endpoint, { ...options, method: 'POST', body })
  }

  const put = async <T>(endpoint: string, body: any, options: Omit<ApiOptions, 'method' | 'body'> = {}): Promise<T | null> => {
    return await api<T>(endpoint, { ...options, method: 'PUT', body })
  }

  const patch = async <T>(endpoint: string, body: any, options: Omit<ApiOptions, 'method' | 'body'> = {}): Promise<T | null> => {
    return await api<T>(endpoint, { ...options, method: 'PATCH', body })
  }

  const del = async <T>(endpoint: string, options: Omit<ApiOptions, 'method'> = {}): Promise<T | null> => {
    return await api<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // API call with automatic token refresh
  const apiWithRefresh = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T | null> => {
    try {
      return await apiCall<T>(endpoint, options)
    } catch (error: any) {
      // If it's a 401 error, try to refresh tokens
      if (error?.response?.status === 401) {
        try {
          const authStore = useAuthStore()
          await authStore.refreshAuth()
          // Retry the original request
          return await apiCall<T>(endpoint, options)
        } catch (refreshError: any) {
          // If refresh fails, handle the error normally
          handleError(refreshError, options.errorOptions)
          return null
        }
      }
      
      // Handle other errors normally
      handleError(error, options.errorOptions)
      return null
    }
  }

  return {
    // Base methods
    api,
    apiCall,
    apiWithRefresh,

    // Convenience methods
    get,
    post,
    put,
    patch,
    del,

    // Utility methods
    getAuthHeaders
  }
} 
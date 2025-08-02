import { ref } from 'vue'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: any
  timestamp: Date
}

export interface ApiErrorHandlerOptions {
  showNotification?: boolean
  logToConsole?: boolean
  redirectOnAuthError?: boolean
  customMessage?: string
}

export const useApiError = () => {
  const currentError = ref<ApiError | null>(null)
  const isLoading = ref(false)
  const errorCount = ref(0)

  // Clear current error
  const clearError = () => {
    currentError.value = null
  }

  // Handle different types of errors
  const handleError = (error: any, options: ApiErrorHandlerOptions = {}) => {
    const {
      showNotification = true,
      logToConsole = true,
      redirectOnAuthError = true,
      customMessage
    } = options

    // Create standardized error object
    const apiError: ApiError = {
      message: customMessage || getErrorMessage(error),
      status: error?.response?.status,
      code: error?.code,
      details: error?.response?._data || error?.data,
      timestamp: new Date()
    }

    // Set current error
    currentError.value = apiError
    errorCount.value++

    // Log to console if enabled
    if (logToConsole) {
      console.error('🚨 API Error:', {
        message: apiError.message,
        status: apiError.status,
        code: apiError.code,
        details: apiError.details,
        timestamp: apiError.timestamp
      })
    }

    // Handle authentication errors
    if (apiError.status === 401) {
      handleAuthError(redirectOnAuthError)
    }

    // Handle server errors
    if (apiError.status && apiError.status >= 500) {
      handleServerError(apiError)
    }

    // Show notification if enabled
    if (showNotification) {
      showErrorNotification(apiError)
    }

    return apiError
  }

  // Get user-friendly error message
  const getErrorMessage = (error: any): string => {
    // Check for custom error message from API
    if (error?.response?._data?.message) {
      return error.response._data.message
    }

    // Check for error message in response data
    if (error?.data?.message) {
      return error.data.message
    }

    // Check for error message property
    if (error?.message) {
      return error.message
    }

    // Handle specific HTTP status codes
    if (error?.response?.status) {
      return getStatusMessage(error.response.status)
    }

    // Default error message
    return 'An unexpected error occurred. Please try again.'
  }

  // Get status-specific error messages
  const getStatusMessage = (status: number): string => {
    const statusMessages: Record<number, string> = {
      400: 'Invalid request. Please check your input and try again.',
      401: 'Authentication required. Please log in again.',
      403: 'Access denied. You don\'t have permission to perform this action.',
      404: 'The requested resource was not found.',
      409: 'Conflict. The resource already exists or has been modified.',
      422: 'Validation error. Please check your input and try again.',
      429: 'Too many requests. Please wait a moment and try again.',
      500: 'Server error. Please try again later.',
      502: 'Bad gateway. Please try again later.',
      503: 'Service unavailable. Please try again later.',
      504: 'Gateway timeout. Please try again later.'
    }

    return statusMessages[status] || `HTTP ${status} error occurred.`
  }

  // Handle authentication errors
  const handleAuthError = (redirect: boolean = true) => {
    const userStore = useUserStore()
    
    // Clear user session
    userStore.logout()
    
    if (redirect) {
      // Navigate to login page
      navigateTo('/login')
    }
  }

  // Handle server errors
  const handleServerError = (error: ApiError) => {
    // Could implement retry logic, fallback behavior, etc.
    console.warn('Server error detected:', error)
  }

  // Show error notification (using Nuxt UI or your preferred notification system)
  const showErrorNotification = (error: ApiError) => {
    // You can integrate with Nuxt UI notifications here
    // For now, we'll use console.warn as a placeholder
    console.warn('Error Notification:', error.message)
    
    // Example with Nuxt UI (uncomment if you want to use it):
    // const { toast } = useToast()
    // toast.add({
    //   title: 'Error',
    //   description: error.message,
    //   color: 'red',
    //   timeout: 5000
    // })
  }

  // Wrapper for API calls with automatic error handling
  const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    options: ApiErrorHandlerOptions = {}
  ): Promise<T | null> => {
    isLoading.value = true
    clearError()

    try {
      const result = await apiCall()
      return result
    } catch (error: any) {
      handleError(error, options)
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Check if error is retryable
  const isRetryableError = (error: ApiError): boolean => {
    const retryableStatuses = [408, 429, 500, 502, 503, 504]
    return retryableStatuses.includes(error.status || 0)
  }

  // Retry API call with exponential backoff
  const retryApiCall = async <T>(
    apiCall: () => Promise<T>,
    maxRetries: number = 3,
    options: ApiErrorHandlerOptions = {}
  ): Promise<T | null> => {
    let lastError: ApiError | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await apiCall()
        return result
      } catch (error: any) {
        lastError = handleError(error, { ...options, showNotification: false })
        
        if (!isRetryableError(lastError) || attempt === maxRetries) {
          // Show notification on final attempt or non-retryable error
          if (lastError) {
            showErrorNotification(lastError)
          }
          return null
        }

        // Exponential backoff: wait 2^attempt * 1000ms
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    return null
  }

  return {
    // State
    currentError: readonly(currentError),
    isLoading: readonly(isLoading),
    errorCount: readonly(errorCount),

    // Methods
    clearError,
    handleError,
    withErrorHandling,
    retryApiCall,
    isRetryableError,
    getErrorMessage,
    getStatusMessage
  }
} 
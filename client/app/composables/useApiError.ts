import { useToast } from '@nuxt/ui'

export interface ErrorOptions {
  showNotification?: boolean
  logToConsole?: boolean
  redirectOnAuthError?: boolean
  customMessage?: string
}

export const useApiError = () => {
  const toast = useToast()

  // Handle API errors
  const handleError = (error: any, options: ErrorOptions = {}) => {
    const {
      showNotification = true,
      logToConsole = true,
      redirectOnAuthError = true,
      customMessage
    } = options

    // Log error to console if enabled
    if (logToConsole) {
      console.error('API Error:', error)
    }

    // Get error message
    let message = customMessage || 'An error occurred'
    
    if (error?.response?.data?.message) {
      message = error.response.data.message
    } else if (error?.message) {
      message = error.message
    } else if (error?.response?.status) {
      switch (error.response.status) {
        case 400:
          message = 'Bad request'
          break
        case 401:
          message = 'Unauthorized'
          if (redirectOnAuthError) {
            navigateTo('/login')
          }
          break
        case 403:
          message = 'Forbidden'
          break
        case 404:
          message = 'Resource not found'
          break
        case 422:
          message = 'Validation error'
          break
        case 500:
          message = 'Server error'
          break
        default:
          message = `Error ${error.response.status}`
      }
    }

    // Show notification if enabled
    if (showNotification) {
      toast.add({
        title: 'Error',
        description: message,
        color: 'red',
        timeout: 5000
      })
    }

    return message
  }

  // Wrap API calls with error handling
  const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    options: ErrorOptions = {}
  ): Promise<T | null> => {
    try {
      return await apiCall()
    } catch (error: any) {
      handleError(error, options)
      return null
    }
  }

  // Retry API calls with exponential backoff
  const retryApiCall = async <T>(
    apiCall: () => Promise<T>,
    maxRetries: number = 3,
    options: ErrorOptions = {}
  ): Promise<T | null> => {
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall()
      } catch (error: any) {
        lastError = error
        
        // Don't retry on client errors (4xx)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          break
        }

        // If this is the last attempt, don't wait
        if (attempt === maxRetries) {
          break
        }

        // Wait with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    // Handle the final error
    handleError(lastError, options)
    return null
  }

  return {
    handleError,
    withErrorHandling,
    retryApiCall
  }
} 
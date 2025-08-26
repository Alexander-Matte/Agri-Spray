export default defineEventHandler(async (event) => {
  try {
    // Get the API base URL from runtime config
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl
    
    // Fetch users from Symfony backend
    const response = await $fetch(`${apiBaseUrl}/users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    return response
    
  } catch (error: any) {
    // Handle fetch errors (network, API errors)
    if (error.statusCode) {
      // This is already a Nuxt error, re-throw it
      throw error
    }
    
    // Handle network or other errors
    console.error('Error calling Symfony backend:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while communicating with backend',
      data: {
        originalError: error.message
      }
    })
  }
})

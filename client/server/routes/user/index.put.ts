import type { User } from '../../../src/interfaces/user'

export default defineEventHandler(async (event) => {
  try {
    // Get the request body
    const body = await readBody<User>(event)
    
    // Get the user ID from the query parameters
    const query = getQuery(event)
    const userId = query.id
    
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required for updates'
      })
    }
    
    // Get the API base URL from runtime config
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl
    
    // Call Symfony backend to update user
    const response = await $fetch(`${apiBaseUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
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

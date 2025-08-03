import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Clear the authentication cookies
    deleteCookie(event, 'token', {
      path: '/'
    })
    
    deleteCookie(event, 'refresh_token', {
      path: '/'
    })

    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error) {
    console.error('Logout error:', error)
    
    setResponseStatus(event, 500)
    return {
      error: true,
      message: 'Logout failed'
    }
  }
}) 
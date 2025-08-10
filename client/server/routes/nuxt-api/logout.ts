import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 Logout endpoint called - clearing authentication cookies')
    
    // Clear the authentication cookies with proper path and domain
    deleteCookie(event, 'token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    deleteCookie(event, 'refresh_token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    console.log('✅ Authentication cookies cleared successfully')

    return {
      success: true,
      message: 'Logged out successfully'
    }
  } catch (error) {
    console.error('❌ Logout error:', error)
    
    setResponseStatus(event, 500)
    return {
      error: true,
      message: 'Logout failed'
    }
  }
}) 
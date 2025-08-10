import { getCookie, setCookie, deleteCookie } from 'h3'
import { useJwtDecode } from '../../../app/composables/useJwtDecode'

interface JwtPayload {
  id: number
  username: string
  roles: string[]
  iat: number
  exp: number
}

interface AuthResponse {
  authenticated: boolean
  user?: {
    id: number
    email: string
    roles: string[]
    iat: number
    exp: number
  }
  error?: boolean
  message?: string
}

interface RefreshResponse {
  token: string
  refresh_token: string
}

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  console.log('🔍 /me endpoint called')
  try {
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    // Helper function to refresh tokens
    const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
      try {
        const refreshResponse = await $fetch<RefreshResponse>(
          `${apiBaseUrl}/api/token/refresh`,
          {
            method: 'POST',
            body: { refresh_token: refreshToken },
            headers: { 'Content-Type': 'application/json' },
          }
        )

        const decodedToken = useJwtDecode(refreshResponse.token) as JwtPayload

        // Set new cookies
        setCookie(event, 'token', refreshResponse.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60, // 1 hour
        })

        setCookie(event, 'refresh_token', refreshResponse.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        return {
          authenticated: true,
          user: {
            id: decodedToken.id,
            email: decodedToken.username,
            roles: decodedToken.roles,
            iat: decodedToken.iat,
            exp: decodedToken.exp,
          }
        }
      } catch (error) {
        console.error('❌ Token refresh failed:', error)
        return { authenticated: false, error: true, message: 'Token refresh failed' }
      }
    }

    // Helper function to clear all auth cookies
    const clearAuthCookies = () => {
      deleteCookie(event, 'token')
      deleteCookie(event, 'refresh_token')
    }

    // Helper function to handle authentication failure
    const handleAuthFailure = (message: string, status: number = 401): AuthResponse => {
      clearAuthCookies()
      setResponseStatus(event, status)
      return { authenticated: false, error: true, message }
    }

    // Get current token
    const token = getCookie(event, 'token')
    const refreshToken = getCookie(event, 'refresh_token')

    // If no token, try to refresh
    if (!token) {
      if (!refreshToken) {
        return handleAuthFailure('No authentication tokens available')
      }
      
      const refreshResult = await refreshTokens(refreshToken)
      if (refreshResult.authenticated) {
        return refreshResult
      }
      
      return handleAuthFailure('Authentication failed - please login again')
    }

    // Validate existing token
    let decodedToken: JwtPayload
    try {
      decodedToken = useJwtDecode(token) as JwtPayload
    } catch (error) {
      console.error('❌ Token decode failed:', error)
      
      if (!refreshToken) {
        return handleAuthFailure('Invalid token and no refresh token available')
      }
      
      const refreshResult = await refreshTokens(refreshToken)
      if (refreshResult.authenticated) {
        return refreshResult
      }
      
      return handleAuthFailure('Authentication failed - please login again')
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime >= decodedToken.exp) {
      if (!refreshToken) {
        return handleAuthFailure('Token expired and no refresh token available')
      }
      
      const refreshResult = await refreshTokens(refreshToken)
      if (refreshResult.authenticated) {
        return refreshResult
      }
      
      return handleAuthFailure('Token expired and refresh failed - please login again')
    }

    // Token is valid, return user data
    return {
      authenticated: true,
      user: {
        id: decodedToken.id,
        email: decodedToken.username,
        roles: decodedToken.roles,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      }
    }

  } catch (err: any) {
    console.error('❌ /me endpoint error:', err)

    // Clear cookies on any error
    deleteCookie(event, 'token')
    deleteCookie(event, 'refresh_token')

    setResponseStatus(event, err?.response?.status || 500)

    return {
      error: true,
      message: err?.response?._data?.message || err.message || 'Authentication check failed',
      authenticated: false
    }
  }
})

import { getCookie, setCookie } from 'h3'
import { useJwtDecode } from '../../app/composables/useJwtDecode'

interface JwtPayload {
  id: number
  email: string
  roles: string[]
  iat: number
  exp: number
}

export default defineEventHandler(async (event) => {
  try {
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    // Get refresh token from cookies
    const refreshToken = getCookie(event, 'refresh_token')
    
    if (!refreshToken) {
      setResponseStatus(event, 401)
      return {
        error: true,
        message: 'No refresh token available'
      }
    }

    // Call backend refresh endpoint
    const response = await $fetch<{ token: string; refresh_token: string }>(
      `${apiBaseUrl}/token/refresh`,
      {
        method: 'POST',
        body: {
          refresh_token: refreshToken
        },
        headers: {
          Host: 'localhost',
          'Content-Type': 'application/json',
        },
      }
    )

    const decodedToken = useJwtDecode(response.token) as JwtPayload

    // Set new cookies
    setCookie(event, 'token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    })

    setCookie(event, 'refresh_token', response.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return {
      user: {
        id: decodedToken.id,
        email: decodedToken.email,
        roles: decodedToken.roles,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      },
      token: response.token,
      refreshToken: response.refresh_token,
    }
  } catch (err: any) {
    console.error('❌ Token refresh failed:', err)

    setResponseStatus(event, err?.response?.status || 500)

    return {
      error: true,
      message:
        err?.response?._data?.message ||
        err.message ||
        'Token refresh failed',
    }
  }
}) 
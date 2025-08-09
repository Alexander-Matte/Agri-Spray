import { useJwtDecode } from '../../app/composables/useJwtDecode'
import { setCookie } from 'h3'

interface JwtPayload {
  id: number
  email: string
  roles: string[]
  iat: number
  exp: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    const response = await $fetch<{ token: string; refresh_token: string }>(
      `${apiBaseUrl}/api/auth`,
      {
        method: 'POST',
        body,
        headers: {
          Host: 'localhost',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.token) {
      throw new Error('No token received from API')
    }

    const decodedToken = useJwtDecode(response.token) as JwtPayload

    // Set cookies on the response
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
      // Optionally return the tokens if you want to use them client-side too
      token: response.token,
      refreshToken: response.refresh_token,
    }
  } catch (err: any) {
    console.error('❌ Error in /api/auth handler:', err)

    setResponseStatus(event, err?.response?.status || 500)

    return {
      error: true,
      message:
        err?.response?._data?.message ||
        err.message ||
        'Unknown error occurred',
    }
  }
})

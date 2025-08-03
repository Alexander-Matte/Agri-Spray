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
    const body = await readBody(event)
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    const response = await $fetch<{ token: string, refresh_token: string }>(`${apiBaseUrl}/auth`, {
      method: 'POST',
      body,
      headers: {
        'Host': 'localhost',
        'Content-Type': 'application/json'
      }
    })

    const decodedToken = useJwtDecode(response.token) as JwtPayload
    const refreshToken = response.refresh_token

    return {
      user: {
        id: decodedToken.id,
        email: decodedToken.email,
        roles: decodedToken.roles,
        iat: decodedToken.iat,
        exp: decodedToken.exp
      },
      token: response.token,
      refreshToken: refreshToken
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

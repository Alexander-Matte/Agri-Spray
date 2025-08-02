interface RefreshResponse {
  token: string
  refresh_token: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    // Validate required fields
    if (!body.refresh_token) {
      setResponseStatus(event, 400)
      return {
        error: true,
        message: 'Refresh token is required'
      }
    }

    console.log('🔄 Attempting token refresh')

    const response = await $fetch<RefreshResponse>(`${apiBaseUrl}/api/token/refresh`, {
      method: 'POST',
      body: {
        refresh_token: body.refresh_token
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('✅ Token refresh successful')

    // Return the new access token and refresh token
    return {
      token: response.token,
      refresh_token: response.refresh_token
    }
  } catch (err: any) {
    console.error('❌ Token refresh failed:', err)

    // Handle different types of errors
    if (err.response?.status === 401) {
      setResponseStatus(event, 401)
      return {
        error: true,
        message: 'Invalid or expired refresh token'
      }
    }

    if (err.response?.status === 400) {
      setResponseStatus(event, 400)
      return {
        error: true,
        message: err.response._data?.message || 'Invalid request data'
      }
    }

    setResponseStatus(event, 500)
    return {
      error: true,
      message: 'Token refresh service unavailable. Please try again later.'
    }
  }
}) 
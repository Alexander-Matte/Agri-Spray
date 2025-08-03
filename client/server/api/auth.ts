interface JwtPayload {
  id: number
  email: string
  roles: string[]
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const apiBaseUrl = process.env.API_BASE_URL?.replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not defined')
    }

    console.log(body)

    const response = await $fetch(`${apiBaseUrl}/auth`, {
      method: 'POST',
      body,
      headers: {
        'Host': 'localhost',
        'Content-Type': 'application/json'
      }
    })

    console.log('✅ Response from auth endpoint:', response)

    // Return the raw response so you can see it in the frontend
    return response
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

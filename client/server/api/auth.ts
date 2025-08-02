interface JwtPayload {
  id: number
  email: string
  roles: string[]
}

interface LoginResponse {
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
    if (!body.email || !body.password) {
      setResponseStatus(event, 400)
      return {
        error: true,
        message: 'Email and password are required'
      }
    }

    console.log('🔐 Attempting login for:', body.email)

    const test = await $fetch(`${apiBaseUrl}/api/auth`, {
      method: 'POST',
      body: {
        username: body.email,
        password: body.password
      }
    })

    console.log('🔍 Test response:', test)  

    // Send username and password to the auth endpoint
    const response = await $fetch<LoginResponse>(`${apiBaseUrl}/api/auth`, {
      method: 'POST',
      body: {
        username: body.email,
        password: body.password
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    console.log('🔍 Full response from backend:', response)
    console.log('🔍 Response type:', typeof response)
    
    // Parse response if it's a string
    let parsedResponse: any = response
    if (typeof response === 'string') {
      const responseStr = response as string
      console.log('🔍 Response length:', responseStr.length)
      console.log('🔍 Response raw:', responseStr)
      
      if (!responseStr || responseStr.trim() === '') {
        console.error('🔍 Empty response received')
        throw new Error('Empty response from backend')
      }
      try {
        parsedResponse = JSON.parse(responseStr)
        console.log('🔍 Parsed response:', parsedResponse)
      } catch (e) {
        console.error('🔍 Failed to parse response:', e)
        console.error('🔍 Raw response that failed to parse:', responseStr)
        throw new Error('Invalid response format')
      }
    }
    
    console.log('🔍 Response keys:', Object.keys(parsedResponse || {}))
    console.log('🔍 Response.token:', parsedResponse?.token)
    console.log('🔍 Response.refresh_token:', parsedResponse?.refresh_token)


    // Return the response with tokens
    return {
      token: parsedResponse.token,
      refresh_token: parsedResponse.refresh_token
    }
  } catch (err: any) {
    console.error('❌ Login failed:', err)

    // Handle different types of errors
    if (err.response?.status === 401) {
      setResponseStatus(event, 401)
      return {
        error: true,
        message: 'Invalid email or password'
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
      message: 'Authentication service unavailable. Please try again later.'
    }
  }
})

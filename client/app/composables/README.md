# API Error Handling Composables

This directory contains composables for consistent API error handling across the Agri-Spray application.

## Overview

The error handling system consists of two main composables:
- `useApiError` - Core error handling logic
- `useApi` - API wrapper with integrated error handling

## Usage Examples

### Basic API Call with Error Handling

```typescript
// In a component or composable
const { get, post } = useApi()

// GET request with automatic error handling
const missions = await get<Mission[]>('/api/missions', {
  errorOptions: {
    customMessage: 'Failed to load missions'
  }
})

// POST request with retry logic
const newMission = await post<Mission>('/api/missions', missionData, {
  errorOptions: {
    customMessage: 'Failed to create mission'
  },
  retryOptions: {
    retryOnError: true,
    maxRetries: 3
  }
})
```

### Using the Error Handling Composable Directly

```typescript
const { handleError, withErrorHandling, currentError, isLoading } = useApiError()

// Manual error handling
try {
  const result = await someApiCall()
  return result
} catch (error) {
  handleError(error, {
    customMessage: 'Custom error message',
    showNotification: true,
    logToConsole: true
  })
}

// Automatic error handling wrapper
const result = await withErrorHandling(
  () => someApiCall(),
  { customMessage: 'Operation failed' }
)
```

### Domain-Specific Composable (Example: Missions)

```typescript
// In a component
const { 
  missions, 
  currentMission, 
  isLoading, 
  currentError,
  fetchMissions, 
  createMission 
} = useMissions()

// Load missions on component mount
onMounted(async () => {
  await fetchMissions()
})

// Create a new mission
const handleCreateMission = async (missionData) => {
  const result = await createMission(missionData)
  if (result) {
    // Success - mission was created
    console.log('Mission created:', result)
  }
  // Error handling is automatic
}
```

## Error Handling Features

### Automatic Features
- **Authentication Errors (401)**: Automatic logout and redirect to login
- **Server Errors (5xx)**: Logging and user-friendly messages
- **Network Errors**: Retry logic with exponential backoff
- **Validation Errors (422)**: Display validation messages

### Customizable Options
- `showNotification`: Show/hide error notifications
- `logToConsole`: Enable/disable console logging
- `redirectOnAuthError`: Control automatic redirect on auth errors
- `customMessage`: Override default error messages
- `retryOnError`: Enable automatic retry for retryable errors
- `maxRetries`: Set maximum retry attempts

### Error Types Handled
- HTTP status codes (400, 401, 403, 404, 409, 422, 429, 500, 502, 503, 504)
- Network errors
- Authentication failures
- Validation errors
- Server errors

## Best Practices

### 1. Use Domain-Specific Composables
Create composables for specific entities (missions, pilots, etc.) that use the base API composables:

```typescript
// ✅ Good - Domain-specific composable
const { missions, fetchMissions } = useMissions()

// ❌ Avoid - Direct API calls in components
const missions = await $fetch('/api/missions')
```

### 2. Provide Meaningful Error Messages
```typescript
// ✅ Good - Specific error message
await createMission(data, {
  errorOptions: {
    customMessage: 'Failed to create mission. Please check your input.'
  }
})

// ❌ Avoid - Generic error message
await createMission(data)
```

### 3. Use Retry Logic for Critical Operations
```typescript
// ✅ Good - Retry for important operations
await fetchMissions({
  retryOptions: {
    retryOnError: true,
    maxRetries: 3
  }
})
```

### 4. Handle Loading States
```typescript
// ✅ Good - Show loading state
const { isLoading, missions } = useMissions()

<template>
  <div v-if="isLoading">Loading missions...</div>
  <div v-else>
    <MissionList :missions="missions" />
  </div>
</template>
```

### 5. Display Error States
```typescript
// ✅ Good - Show error state
const { currentError, missions } = useMissions()

<template>
  <div v-if="currentError" class="error-message">
    {{ currentError.message }}
  </div>
  <MissionList :missions="missions" />
</template>
```

## Integration with Nuxt UI

To integrate with Nuxt UI notifications, uncomment and configure the notification code in `useApiError.ts`:

```typescript
const showErrorNotification = (error: ApiError) => {
  const { toast } = useToast()
  toast.add({
    title: 'Error',
    description: error.message,
    color: 'red',
    timeout: 5000
  })
}
```

## Testing

The composables are designed to be easily testable:

```typescript
// Mock the API composable for testing
vi.mock('~/composables/useApi', () => ({
  useApi: () => ({
    get: vi.fn(),
    post: vi.fn()
  })
}))
```

## Error Recovery

The system includes automatic error recovery features:
- **Token Refresh**: Automatic JWT token refresh on 401 errors
- **Retry Logic**: Exponential backoff for retryable errors
- **Graceful Degradation**: Fallback behavior for non-critical errors
- **User Feedback**: Clear error messages and loading states 
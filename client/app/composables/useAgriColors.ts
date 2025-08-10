export const useAgriColors = () => {
  // Color palette constants
  const colors = {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
  }

  // Gradient utilities
  const gradients = {
    primary: 'bg-gradient-to-br from-green-50 to-blue-50',
    reverse: 'bg-gradient-to-br from-blue-50 to-green-50',
    dark: 'bg-gradient-to-br from-green-900 to-blue-900',
    subtle: 'bg-gradient-to-r from-green-50 via-blue-50 to-green-50',
  }

  // Status color mapping
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'success',
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
      error: 'error',
      info: 'info',
      default: 'primary',
    }
    return statusMap[status.toLowerCase()] || 'primary'
  }

  // Role color mapping
  const getRoleColor = (role: string) => {
    const roleMap: Record<string, string> = {
      manager: 'primary',
      pilot: 'secondary',
      loader: 'warning',
      admin: 'error',
      user: 'neutral',
    }
    return roleMap[role.toLowerCase()] || 'primary'
  }

  // Priority color mapping
  const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      high: 'error',
      medium: 'warning',
      low: 'success',
      critical: 'error',
      normal: 'primary',
    }
    return priorityMap[priority.toLowerCase()] || 'primary'
  }

  // CSS variable getters
  const getCssVariable = (colorName: string, shade: string | number) => {
    return `var(--color-${colorName}-${shade})`
  }

  // Tailwind class generators
  const getTailwindClass = (type: 'bg' | 'text' | 'border', colorName: string, shade: string | number) => {
    return `${type}-${colorName}-${shade}`
  }

  // Semantic color helpers
  const semantic = {
    brand: colors.primary[600],
    accent: colors.secondary[600],
    surface: colors.neutral[50],
    surfaceHover: colors.neutral[100],
    border: colors.neutral[200],
    borderFocus: colors.primary[500],
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textMuted: colors.neutral[500],
    success: colors.success[600],
    warning: colors.warning[600],
    error: colors.error[600],
    info: colors.info[600],
  }

  return {
    colors,
    gradients,
    semantic,
    getStatusColor,
    getRoleColor,
    getPriorityColor,
    getCssVariable,
    getTailwindClass,
  }
}

import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  ui: {
  // Agri-Spray specific configuration
  agriSpray: {
    theme: {
      name: 'Agri-Spray Professional',
      version: '1.0.0',
      description: 'Professional agricultural spraying management system theme'
    },
    
    // Demo mode configuration
    demo: {
      enabled: true,
      colors: {
        primary: 'warning',
        accent: 'warning-200',
        text: 'warning-800'
      }
    },
    
    // Dashboard configuration
    dashboard: {
      colors: {
        manager: 'primary',
        pilot: 'secondary',
        loader: 'info',
        success: 'success',
        warning: 'warning',
        error: 'error'
      }
    }
  }
})

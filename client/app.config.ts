import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  ui: {
    // Global color configuration
    colors: {
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'blue',
      neutral: 'slate'
    },
    
    // Global component theme overrides
    button: {
      slots: {
        base: 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
      },
      variants: {
        size: {
          xs: { base: 'px-2 py-1 text-xs' },
          sm: { base: 'px-3 py-1.5 text-sm' },
          md: { base: 'px-4 py-2 text-sm' },
          lg: { base: 'px-6 py-3 text-base' },
          xl: { base: 'px-8 py-4 text-lg' }
        }
      }
    },
    
    card: {
      slots: {
        root: 'bg-white ring-1 ring-neutral-200 divide-y divide-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6',
        footer: 'p-4 sm:px-6'
      }
    },
    
    input: {
      slots: {
        base: 'relative',
        input: 'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 transition-colors duration-200'
      }
    },
    
    select: {
      slots: {
        base: 'relative',
        trigger: 'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200'
      }
    },
    
    textarea: {
      slots: {
        base: 'relative',
        input: 'w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 transition-colors duration-200'
      }
    },
    
    checkbox: {
      slots: {
        base: 'flex items-center',
        input: 'h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded bg-neutral-50 transition-colors duration-200'
      }
    },
    
    radio: {
      slots: {
        base: 'flex items-center',
        input: 'h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 transition-colors duration-200'
      }
    },
    
    switch: {
      slots: {
        base: 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
        thumb: 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200'
      }
    },
    
    badge: {
      slots: {
        base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
      },
      variants: {
        color: {
          primary: { base: 'bg-primary-100 text-primary-800' },
          secondary: { base: 'bg-secondary-100 text-secondary-800' },
          success: { base: 'bg-success-100 text-success-800' },
          warning: { base: 'bg-warning-100 text-warning-800' },
          error: { base: 'bg-error-100 text-error-800' },
          info: { base: 'bg-info-100 text-info-800' }
        }
      }
    },
    
    alert: {
      slots: {
        base: 'rounded-lg p-4',
        icon: 'h-5 w-5'
      },
      variants: {
        color: {
          primary: { base: 'bg-primary-50 text-primary-800 border border-primary-200' },
          secondary: { base: 'bg-secondary-50 text-secondary-800 border border-secondary-200' },
          success: { base: 'bg-success-50 text-success-800 border border-success-200' },
          warning: { base: 'bg-warning-50 text-warning-800 border border-warning-200' },
          error: { base: 'bg-error-50 text-error-800 border border-error-200' },
          info: { base: 'bg-info-50 text-info-800 border border-info-200' }
        }
      }
    },
    
    modal: {
      slots: {
        base: 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-200',
        overlay: 'fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity duration-200',
        header: 'px-6 py-4 border-b border-neutral-200',
        body: 'px-6 py-4',
        footer: 'px-6 py-4 border-t border-neutral-200'
      }
    },
    
    table: {
      slots: {
        base: 'min-w-full divide-y divide-neutral-200',
        thead: 'bg-neutral-50',
        th: 'px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider',
        tbody: 'bg-white divide-y divide-neutral-200',
        td: 'px-6 py-4 whitespace-nowrap text-sm text-neutral-900'
      }
    },
    
    tabs: {
      slots: {
        base: 'border-b border-neutral-200',
        list: 'flex space-x-8',
        tab: 'border-b-2 border-transparent py-2 px-1 text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 transition-colors duration-200',
        panel: 'py-6'
      },
      variants: {
        color: {
          primary: {
            tab: 'border-primary-500 text-primary-600'
          }
        }
      }
    },
    
    accordion: {
      slots: {
        base: 'divide-y divide-neutral-200',
        item: 'border-neutral-200',
        trigger: 'flex w-full items-center justify-between py-4 px-6 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors duration-200',
        content: 'px-6 pb-4 text-sm text-neutral-600'
      }
    },
    
    pagination: {
      slots: {
        base: 'flex items-center justify-between',
        wrapper: 'flex items-center space-x-2',
        button: 'px-3 py-2 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 hover:text-neutral-700 transition-colors duration-200'
      }
    },
    
    tooltip: {
      slots: {
        base: 'px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg shadow-lg'
      }
    },
    
    popover: {
      slots: {
        base: 'bg-white rounded-lg shadow-lg ring-1 ring-neutral-200',
        trigger: 'inline-flex items-center justify-center'
      }
    },
    
    dropdown: {
      slots: {
        base: 'bg-white rounded-lg shadow-lg ring-1 ring-neutral-200',
        item: 'block w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors duration-200'
      }
    }
  },
  
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

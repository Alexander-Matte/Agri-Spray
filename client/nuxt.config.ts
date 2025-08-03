// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080/api',
      appName: 'Agri-Spray',
      appVersion: '1.0.0'
    }
  },

  // App config
  app: {
    head: {
      title: 'Agri-Spray - Agricultural Spraying Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Professional agricultural spraying management system for pilots, loaders, and managers.' 
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  // Nitro configuration for Docker
  nitro: {
    preset: 'node-server'
  },

  // Vite configuration
  vite: {
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false
  },

  // Source maps for development
  sourcemap: process.env.NODE_ENV === 'development'

})
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Agri-Spray color palette
        agri: {
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
        // Secondary blue colors
        agriBlue: {
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
        // Success colors (green variants)
        agriSuccess: {
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
        // Warning colors (orange variants)
        agriWarning: {
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
        // Error colors (red variants)
        agriError: {
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
        // Neutral colors (gray scale)
        agriNeutral: {
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
      },
      // Custom gradients
      backgroundImage: {
        'agri-gradient': 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
        'agri-gradient-reverse': 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
        'agri-gradient-dark': 'linear-gradient(135deg, #14532d 0%, #1e3a8a 100%)',
      },
      // Custom shadows
      boxShadow: {
        'agri': '0 4px 6px -1px rgba(22, 163, 74, 0.1), 0 2px 4px -1px rgba(22, 163, 74, 0.06)',
        'agri-lg': '0 10px 15px -3px rgba(22, 163, 74, 0.1), 0 4px 6px -2px rgba(22, 163, 74, 0.05)',
        'agri-xl': '0 20px 25px -5px rgba(22, 163, 74, 0.1), 0 10px 10px -5px rgba(22, 163, 74, 0.04)',
      },
      // Custom border radius
      borderRadius: {
        'agri': '0.75rem',
        'agri-lg': '1rem',
        'agri-xl': '1.5rem',
      },
      // Custom spacing
      spacing: {
        'agri-xs': '0.25rem',
        'agri-sm': '0.5rem',
        'agri-md': '1rem',
        'agri-lg': '1.5rem',
        'agri-xl': '2rem',
        'agri-2xl': '3rem',
      },
      // Custom font sizes
      fontSize: {
        'agri-xs': ['0.75rem', { lineHeight: '1rem' }],
        'agri-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'agri-base': ['1rem', { lineHeight: '1.5rem' }],
        'agri-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'agri-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'agri-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'agri-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'agri-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      // Custom animations
      animation: {
        'agri-pulse': 'agri-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'agri-bounce': 'agri-bounce 1s infinite',
        'agri-spin': 'agri-spin 1s linear infinite',
      },
      keyframes: {
        'agri-pulse': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        'agri-bounce': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'agri-spin': {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
}

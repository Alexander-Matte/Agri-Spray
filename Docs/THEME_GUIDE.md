# Agri-Spray Theme Guide

## Overview

This guide explains how to use the new Agri-Spray theme system built with Nuxt UI v3 and Tailwind CSS v4. The theme provides a comprehensive design system that maintains consistency across your agricultural spraying management application.

## Theme Architecture

### 1. CSS Variables (@theme directive)

The theme uses Tailwind CSS v4's `@theme` directive to define custom design tokens:

```css
@theme {
  /* Custom Colors */
  --color-primary-50: #f0fdf4;
  --color-primary-500: #22c55e;
  --color-primary-950: #052e16;
  
  /* Custom Spacing */
  --spacing-agri-md: 1rem;
  --spacing-agri-lg: 1.5rem;
  
  /* Custom Border Radius */
  --radius-agri: 0.75rem;
}
```

### 2. Nuxt UI Component Themes

Component themes are configured in `app.config.ts` using the Tailwind Variants API:

```typescript
ui: {
  button: {
    slots: {
      base: 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    },
    variants: {
      size: {
        xs: { base: 'px-2 py-1 text-xs' },
        lg: { base: 'px-6 py-3 text-base' }
      }
    }
  }
}
```

## Color System

### Primary Colors (Green-based)
- **Primary**: Main brand color for buttons, links, and primary actions
- **Success**: Used for success states, confirmations, and positive feedback

### Secondary Colors (Blue-based)
- **Secondary**: Complementary color for secondary actions and highlights
- **Info**: Used for informational content and neutral actions

### Semantic Colors
- **Warning**: Used for warnings, alerts, and demo mode indicators
- **Error**: Used for errors, destructive actions, and critical alerts

### Neutral Colors
- **Neutral**: Gray scale for text, borders, and backgrounds

## Usage Examples

### 1. Using Nuxt UI Components with Theme

```vue
<template>
  <!-- Primary button with theme colors -->
  <UButton color="primary" size="lg">
    Create Mission
  </UButton>
  
  <!-- Card with theme styling -->
  <UCard>
    <template #header>
      <h3>Mission Details</h3>
    </template>
    <p>Mission information goes here...</p>
  </UCard>
  
  <!-- Form inputs with theme focus states -->
  <UInput 
    placeholder="Enter mission name"
    class="w-full"
  />
</template>
```

### 2. Using Custom Utility Classes

```vue
<template>
  <!-- Custom gradient backgrounds -->
  <div class="agri-gradient min-h-screen">
    <div class="container mx-auto p-6">
      <!-- Content -->
    </div>
  </div>
  
  <!-- Custom shadows -->
  <div class="agri-shadow-lg rounded-lg p-6">
    <!-- Card content -->
  </div>
  
  <!-- Custom animations -->
  <div class="animate-agri-pulse">
    <!-- Animated content -->
  </div>
</template>
```

### 3. Dashboard-Specific Classes

```vue
<template>
  <!-- Dashboard header -->
  <div class="dashboard-header">
    <h1>Manager Dashboard</h1>
  </div>
  
  <!-- Dashboard stats -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="dashboard-stat">
      <div class="dashboard-stat-icon bg-primary-100">
        <UIcon name="i-heroicons-users" class="h-6 w-6 text-primary-600" />
      </div>
      <div class="dashboard-stat-value text-primary-600">12</div>
      <div class="dashboard-stat-label">Team Members</div>
      <div class="dashboard-stat-description">Active team members</div>
    </div>
  </div>
</template>
```

### 4. Demo Mode Styling

```vue
<template>
  <!-- Demo mode banner -->
  <div v-if="isDemo" class="demo-mode">
    <div class="demo-accent">
      <UIcon name="i-heroicons-information-circle" class="h-5 w-5" />
    </div>
    <div class="demo-text">
      <h3>Demo Mode</h3>
      <p>This is a demonstration dashboard.</p>
    </div>
  </div>
</template>
```

## Component Theme Customization

### 1. Global Component Overrides

Override component themes globally in `app.config.ts`:

```typescript
ui: {
  button: {
    slots: {
      base: 'font-bold' // Makes all buttons bold
    }
  }
}
```

### 2. Per-Component Overrides

Override themes for specific components using the `ui` prop:

```vue
<template>
  <UButton
    :ui="{
      base: 'rounded-full font-bold',
      trailingIcon: 'rotate-90 size-3'
    }"
  >
    Custom Button
  </UButton>
</template>
```

### 3. Class Prop Overrides

Override styles using the `class` prop:

```vue
<template>
  <UButton class="font-bold rounded-full">
    Custom Button
  </UButton>
</template>
```

## Responsive Design

The theme includes custom breakpoints and responsive utilities:

```css
@theme {
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
}
```

```vue
<template>
  <!-- Custom container sizes -->
  <div class="container-3xl mx-auto">
    <!-- Content for large screens -->
  </div>
  
  <!-- Responsive utilities -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
    <!-- Responsive grid -->
  </div>
</template>
```

## Form Styling

The theme provides consistent form styling:

```vue
<template>
  <form class="space-y-4">
    <div>
      <label class="agri-form-label">Email Address</label>
      <input 
        type="email" 
        class="agri-form-input"
        placeholder="Enter your email"
      />
    </div>
    
    <div class="flex items-center">
      <input 
        type="checkbox" 
        class="agri-form-checkbox"
      />
      <label class="ml-2 text-sm text-neutral-700">
        Remember me
      </label>
    </div>
  </form>
</template>
```

## Status Indicators

Use semantic color classes for status indicators:

```vue
<template>
  <div class="space-y-2">
    <div class="status-success px-3 py-2 rounded">
      Mission completed successfully
    </div>
    
    <div class="status-warning px-3 py-2 rounded">
      Low fuel warning
    </div>
    
    <div class="status-error px-3 py-2 rounded">
      Critical system error
    </div>
    
    <div class="status-info px-3 py-2 rounded">
      System maintenance scheduled
    </div>
  </div>
</template>
```

## Best Practices

### 1. Color Usage
- Use semantic colors for their intended purpose
- Primary colors for main actions and branding
- Secondary colors for supporting elements
- Neutral colors for text and backgrounds

### 2. Component Consistency
- Use Nuxt UI components when possible
- Leverage the theme system for customizations
- Maintain consistent spacing and typography

### 3. Responsive Design
- Use the provided breakpoint system
- Test on various screen sizes
- Leverage Tailwind's responsive utilities

### 4. Accessibility
- Ensure sufficient color contrast
- Use semantic HTML elements
- Provide alternative text for icons

## Migration from Old System

### 1. Replace Custom Classes
```vue
<!-- Old -->
<div class="bg-green-100 text-green-800">

<!-- New -->
<div class="bg-primary-100 text-primary-800">
```

### 2. Update Component Props
```vue
<!-- Old -->
<UButton class="bg-green-600 hover:bg-green-700">

<!-- New -->
<UButton color="primary">
```

### 3. Use Theme Utilities
```vue
<!-- Old -->
<div class="shadow-lg rounded-lg">

<!-- New -->
<div class="agri-shadow-lg rounded-lg">
```

## Troubleshooting

### 1. Theme Not Applying
- Ensure `main.css` is imported in `nuxt.config.ts`
- Check that `app.config.ts` is properly configured
- Verify Tailwind CSS v4 is installed

### 2. Component Styles Not Working
- Check component theme configuration in `app.config.ts`
- Use browser dev tools to inspect applied classes
- Verify component props are correct

### 3. Custom Classes Not Available
- Ensure classes are defined in `main.css`
- Check for typos in class names
- Verify Tailwind is processing the custom CSS

## Resources

- [Nuxt UI Documentation](https://ui.nuxt.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind Variants API](https://www.tailwind-variants.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

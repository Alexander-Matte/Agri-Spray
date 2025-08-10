# Agri-Spray Color Scheme Guide

This guide explains how to use the global color scheme that has been implemented across your Nuxt UI application.

## Overview

The color scheme has been configured to match your landing page design, using:
- **Primary**: Green (`#16a34a`) - Main brand color
- **Secondary**: Blue (`#2563eb`) - Accent color
- **Success**: Green variants - For positive states
- **Warning**: Orange variants - For caution states
- **Error**: Red variants - For error states
- **Info**: Blue variants - For informational states
- **Neutral**: Gray scale - For text, borders, and backgrounds

## What Has Been Implemented

### 1. Global CSS Variables
All colors are defined as CSS custom properties in `app/assets/css/main.css` and can be accessed using:
```css
var(--color-primary-600)
var(--color-secondary-500)
var(--color-success-600)
```

### 2. Tailwind CSS Extensions
Custom color classes are available in your Tailwind configuration:
```html
<!-- Primary colors -->
<div class="bg-agri-600 text-agri-50">Primary content</div>
<div class="bg-agriBlue-500 text-white">Secondary content</div>

<!-- Semantic colors -->
<div class="bg-agriSuccess-100 text-agriSuccess-800">Success message</div>
<div class="bg-agriWarning-100 text-agriWarning-800">Warning message</div>
<div class="bg-agriError-100 text-agriError-800">Error message</div>

<!-- Gradients -->
<div class="bg-agri-gradient">Gradient background</div>
<div class="bg-agri-gradient-reverse">Reverse gradient</div>
```

### 3. Nuxt UI Configuration
The `app.config.ts` file overrides Nuxt UI's default colors, so all components automatically use your custom scheme.

### 4. Composable for Easy Access
Use the `useAgriColors()` composable in your components:
```vue
<script setup>
const { colors, gradients, getStatusColor, getRoleColor } = useAgriColors()

// Access colors
const primaryColor = colors.primary[600]

// Get semantic colors
const statusColor = getStatusColor('completed') // Returns 'success'
const roleColor = getRoleColor('pilot') // Returns 'secondary'
</script>

<template>
  <div :class="gradients.primary">
    <UButton color="primary">Primary Button</UButton>
    <UAlert :color="statusColor">Status message</UAlert>
  </div>
</template>
```

## Usage Examples

### Buttons
```vue
<!-- Primary button (green) -->
<UButton color="primary">Save Changes</UButton>

<!-- Secondary button (blue) -->
<UButton color="secondary">Cancel</UButton>

<!-- Success button (green) -->
<UButton color="success">Complete</UButton>

<!-- Warning button (orange) -->
<UButton color="warning">Review</UButton>

<!-- Error button (red) -->
<UButton color="error">Delete</UButton>
```

### Cards and Containers
```vue
<!-- Default card with custom styling -->
<UCard>
  <template #header>
    <h3 class="text-agri-900 font-semibold">Card Title</h3>
  </template>
  <p class="text-agriNeutral-600">Card content</p>
</UCard>

<!-- Custom background -->
<div class="bg-agri-50 border border-agri-200 rounded-lg p-6">
  <h3 class="text-agri-800 font-semibold">Custom Section</h3>
</div>
```

### Forms
```vue
<!-- Input with custom focus colors -->
<UInput 
  placeholder="Enter text"
  class="focus:ring-2 focus:ring-agri-500 focus:border-agri-500"
/>

<!-- Select with custom styling -->
<USelect 
  :options="options"
  class="border-agri-200 focus:border-agri-500"
/>
```

### Tables
```vue
<!-- Table with custom colors -->
<UTable 
  :rows="data"
  class="border-agri-200"
>
  <template #header>
    <tr class="bg-agri-50">
      <th class="text-agri-800">Column 1</th>
      <th class="text-agri-800">Column 2</th>
    </tr>
  </template>
</UTable>
```

### Alerts and Notifications
```vue
<!-- Success alert -->
<UAlert color="success" title="Success!">
  Operation completed successfully.
</UAlert>

<!-- Warning alert -->
<UAlert color="warning" title="Warning">
  Please review the information before proceeding.
</UAlert>

<!-- Error alert -->
<UAlert color="error" title="Error">
  Something went wrong. Please try again.
</UAlert>
```

### Badges
```vue
<!-- Status badges -->
<UBadge :color="getStatusColor('active')">Active</UBadge>
<UBadge :color="getStatusColor('pending')">Pending</UBadge>
<UBadge :color="getStatusColor('completed')">Completed</UBadge>

<!-- Role badges -->
<UBadge :color="getRoleColor('manager')">Manager</UBadge>
<UBadge :color="getRoleColor('pilot')">Pilot</UBadge>
<UBadge :color="getRoleColor('loader')">Loader</UBadge>
```

## Custom Utility Classes

### Background Colors
```html
<div class="bg-agri-primary">Primary background</div>
<div class="bg-agri-secondary">Secondary background</div>
<div class="bg-agri-success">Success background</div>
<div class="bg-agri-warning">Warning background</div>
<div class="bg-agri-error">Error background</div>
```

### Text Colors
```html
<div class="text-agri-primary">Primary text</div>
<div class="text-agri-secondary">Secondary text</div>
```

### Border Colors
```html
<div class="border-agri-primary">Primary border</div>
<div class="border-agri-secondary">Secondary border</div>
```

### Gradients
```html
<div class="bg-agri-gradient">Primary gradient</div>
<div class="bg-agri-gradient-reverse">Reverse gradient</div>
<div class="bg-agri-gradient-dark">Dark gradient</div>
```

## Best Practices

1. **Use semantic colors**: Instead of hardcoding colors, use the semantic color system:
   ```vue
   <!-- Good -->
   <UButton :color="getStatusColor(status)">Action</UButton>
   
   <!-- Avoid -->
   <UButton color="green">Action</UButton>
   ```

2. **Consistent spacing**: Use the custom spacing utilities:
   ```html
   <div class="p-agri-md m-agri-lg">Content</div>
   ```

3. **Accessibility**: The color scheme has been designed with proper contrast ratios for accessibility.

4. **Dark mode ready**: The color system is structured to support future dark mode implementation.

## Customization

To modify the color scheme:

1. Update the CSS variables in `app/assets/css/main.css`
2. Update the Tailwind config in `tailwind.config.js`
3. Update the Nuxt UI config in `app.config.ts`
4. Update the composable in `app/composables/useAgriColors.ts`

## Troubleshooting

### Colors not applying?
- Make sure the CSS files are properly imported
- Check that Tailwind is rebuilding after config changes
- Verify that Nuxt UI is using the custom configuration

### Component colors not matching?
- Some Nuxt UI components may need explicit color props
- Use the `useAgriColors()` composable for dynamic color selection
- Check the component documentation for available color options

### Build issues?
- Clear the Nuxt cache: `rm -rf .nuxt`
- Restart the development server
- Check for syntax errors in configuration files

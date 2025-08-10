# Layout System Documentation

## Overview

The Agri-Spray application now uses a comprehensive layout system to provide consistent user experience across different user roles while maintaining clean separation of concerns.

## Layout Structure

### 1. App Layout (`layouts/app.vue`)
- **Purpose**: Root layout for the entire application
- **Usage**: Automatically applied to all pages
- **Features**: Minimal wrapper, can be extended with global elements

### 2. Default Layout (`layouts/default.vue`)
- **Purpose**: Default layout for public pages
- **Usage**: Applied to pages like login, index, etc.
- **Features**: Clean, minimal structure

### 3. Dashboard Layout (`layouts/dashboard.vue`)
- **Purpose**: Main layout for authenticated dashboard pages
- **Usage**: Applied to all role-based dashboard pages
- **Features**: 
  - Header with user info and logout
  - Role-based navigation tabs
  - Consistent styling and branding
  - Demo mode indicators

## Page Organization

### Dashboard Pages
All dashboard pages now use the `dashboard` layout and only contain role-specific content:

- **Main Dashboard** (`/dashboard`) - Role-based dashboard content
- **Manager Pages** (`/manager/*`) - User management, reports, etc.
- **Pilot Pages** (`/pilot/*`) - Missions, aircraft management, etc.
- **Loader Pages** (`/loader/*`) - Load management, chemical tracking, etc.

### Public Pages
Public pages use the `default` layout:

- **Home Page** (`/`) - Landing page with features and information
- **Login Page** (`/login`) - Authentication form

## Layout Usage

### Setting Layout for a Page
```typescript
// In your page component
definePageMeta({
  layout: 'dashboard' // or 'default'
})
```

### Layout Features

#### Dashboard Layout Features
1. **Header**: 
   - App branding and navigation
   - User information and role display
   - Demo mode indicators
   - Logout functionality

2. **Navigation Tabs**:
   - Role-specific navigation items
   - Active state highlighting
   - Responsive design

3. **Content Area**:
   - Consistent padding and spacing
   - Responsive container widths
   - Role-based content rendering

#### Demo Mode Support
- Special styling for demo users
- Visual indicators for demo mode
- Consistent demo experience across all layouts

## Benefits

1. **Consistency**: All dashboard pages have the same header, navigation, and styling
2. **Maintainability**: Common elements are centralized in layouts
3. **Role-Based Navigation**: Users see only relevant navigation items
4. **Clean Code**: Page components focus only on their specific content
5. **Scalability**: Easy to add new pages and maintain consistency

## Adding New Pages

### Dashboard Page Example
```vue
<template>
  <div>
    <!-- Your page content here -->
    <h1>New Page</h1>
    <p>This page will automatically use the dashboard layout</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>
```

### Public Page Example
```vue
<template>
  <div>
    <!-- Your public page content -->
    <h1>Public Information</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

## Customization

### Modifying Layouts
- Edit the layout files in `layouts/` directory
- Changes will automatically apply to all pages using that layout
- Use CSS classes and Tailwind utilities for styling

### Adding New Layouts
1. Create a new layout file in `layouts/` directory
2. Define the layout structure with `<slot />` for content
3. Use `definePageMeta({ layout: 'newLayout' })` in pages

## Best Practices

1. **Always specify a layout** using `definePageMeta`
2. **Keep page content focused** on the specific functionality
3. **Use consistent styling** across similar page types
4. **Leverage the navigation system** for role-based access
5. **Test with different user roles** to ensure proper navigation display

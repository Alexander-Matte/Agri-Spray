<template>
  <!-- For purging to pick up the dynamic classes -->
  <div class="hidden">
    <!-- Primary -->
    bg-primary-50 bg-primary-100 bg-primary-200 bg-primary-300 bg-primary-400 bg-primary-500 bg-primary-600 bg-primary-700 bg-primary-800 bg-primary-900 bg-primary-950
    text-primary-50 text-primary-100 text-primary-200 text-primary-300 text-primary-400 text-primary-500 text-primary-600 text-primary-700 text-primary-800 text-primary-900 text-primary-950

    <!-- Secondary -->
    bg-secondary-50 bg-secondary-100 bg-secondary-200 bg-secondary-300 bg-secondary-400 bg-secondary-500 bg-secondary-600 bg-secondary-700 bg-secondary-800 bg-secondary-900 bg-secondary-950
    text-secondary-50 text-secondary-100 text-secondary-200 text-secondary-300 text-secondary-400 text-secondary-500 text-secondary-600 text-secondary-700 text-secondary-800 text-secondary-900 text-secondary-950

    <!-- Success -->
    bg-success-50 bg-success-100 bg-success-200 bg-success-300 bg-success-400 bg-success-500 bg-success-600 bg-success-700 bg-success-800 bg-success-900 bg-success-950
    text-success-50 text-success-100 text-success-200 text-success-300 text-success-400 text-success-500 text-success-600 text-success-700 text-success-800 text-success-900 text-success-950

    <!-- Warning -->
    bg-warning-50 bg-warning-100 bg-warning-200 bg-warning-300 bg-warning-400 bg-warning-500 bg-warning-600 bg-warning-700 bg-warning-800 bg-warning-900 bg-warning-950
    text-warning-50 text-warning-100 text-warning-200 text-warning-300 text-warning-400 text-warning-500 text-warning-600 text-warning-700 text-warning-800 text-warning-900 text-warning-950

    <!-- Error -->
    bg-error-50 bg-error-100 bg-error-200 bg-error-300 bg-error-400 bg-error-500 bg-error-600 bg-error-700 bg-error-800 bg-error-900 bg-error-950
    text-error-50 text-error-100 text-error-200 text-error-300 text-error-400 text-error-500 text-error-600 text-error-700 text-error-800 text-error-900 text-error-950

    <!-- Info -->
    bg-info-50 bg-info-100 bg-info-200 bg-info-300 bg-info-400 bg-info-500 bg-info-600 bg-info-700 bg-info-800 bg-info-900 bg-info-950
    text-info-50 text-info-100 text-info-200 text-info-300 text-info-400 text-info-500 text-info-600 text-info-700 text-info-800 text-info-900 text-info-950

    <!-- Neutral -->
    bg-neutral-50 bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900 bg-neutral-950
    text-neutral-50 text-neutral-100 text-neutral-200 text-neutral-300 text-neutral-400 text-neutral-500 text-neutral-600 text-neutral-700 text-neutral-800 text-neutral-900 text-neutral-950
  </div>



  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white border-b border-neutral-200">
      <div class="container mx-auto px-6 py-8">
        <div class="flex items-center space-x-4">
          <UIcon name="i-heroicons-palette" class="h-12 w-12 text-primary-600" />
          <div>
            <h1 class="text-4xl font-bold text-neutral-900">Agri-Spray Styleguide</h1>
            <p class="text-lg text-neutral-600 mt-2">
              Complete design system and component library for the agricultural spraying management platform
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div class="container mx-auto px-6">
        <nav class="flex space-x-8 overflow-x-auto">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="py-4 px-2 border-b-2 border-transparent text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 transition-colors duration-200 whitespace-nowrap"
            :class="{ 'border-primary-500 text-primary-600': activeSection === section.id }"
          >
            {{ section.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-8 space-y-16">
      
      <!-- Color System -->
      <section id="colors" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Color System</h2>
          <p class="text-lg text-neutral-600">
            Our color palette is designed for agricultural applications with clear semantic meaning and excellent accessibility.
          </p>
        </div>

        <!-- Primary Colors -->
        <div class="mb-12">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Primary Colors (Green-based)</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-4">
            <div v-for="shade in colorShades" :key="`primary-${shade}`" class="text-center">
              <div 
                class="w-full h-20 rounded-lg mb-2 shadow-sm"
                :class="`bg-primary-${shade}`"
              ></div>
              <p class="text-xs font-mono text-neutral-600">primary-{{ shade }}</p>
              <p class="text-xs font-mono text-neutral-500">{{ getColorHex(`primary-${shade}`) }}</p>
            </div>
          </div>
        </div>

        <!-- Secondary Colors -->
        <div class="mb-12">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Secondary Colors (Blue-based)</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-4">
            <div v-for="shade in colorShades" :key="`secondary-${shade}`" class="text-center">
              <div 
                class="w-full h-20 rounded-lg mb-2 shadow-sm"
                :class="`bg-secondary-${shade}`"
              ></div>
              <p class="text-xs font-mono text-neutral-600">secondary-{{ shade }}</p>
              <p class="text-xs font-mono text-neutral-500">{{ getColorHex(`secondary-${shade}`) }}</p>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="mb-12">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Semantic Colors</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-success-50 border border-success-200 rounded-lg p-6">
              <h4 class="font-semibold text-success-800 mb-2">Success</h4>
              <p class="text-sm text-success-700 mb-4">Used for positive feedback and confirmations</p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-success-500 rounded"></div>
                  <span class="text-xs text-success-700">success-500</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-success-100 rounded"></div>
                  <span class="text-xs text-success-700">success-100</span>
                </div>
              </div>
            </div>

            <div class="bg-warning-50 border border-warning-200 rounded-lg p-6">
              <h4 class="font-semibold text-warning-800 mb-2">Warning</h4>
              <p class="text-sm text-warning-700 mb-4">Used for alerts and demo mode indicators</p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-warning-500 rounded"></div>
                  <span class="text-xs text-warning-700">warning-500</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-warning-100 rounded"></div>
                  <span class="text-xs text-warning-700">warning-100</span>
                </div>
              </div>
            </div>

            <div class="bg-error-50 border border-error-200 rounded-lg p-6">
              <h4 class="font-semibold text-error-800 mb-2">Error</h4>
              <p class="text-sm text-error-700 mb-4">Used for errors and destructive actions</p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-error-500 rounded"></div>
                  <span class="text-xs text-error-700">error-500</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-error-100 rounded"></div>
                  <span class="text-xs text-error-700">error-100</span>
                </div>
              </div>
            </div>

            <div class="bg-info-50 border border-info-200 rounded-lg p-6">
              <h4 class="font-semibold text-info-800 mb-2">Info</h4>
              <p class="text-sm text-info-700 mb-4">Used for informational content</p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-info-500 rounded"></div>
                  <span class="text-xs text-info-700">info-500</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 bg-info-100 rounded"></div>
                  <span class="text-xs text-info-700">info-100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gradients -->
        <div class="mb-12">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Custom Gradients</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="agri-gradient rounded-lg p-8 text-center">
              <h4 class="font-semibold text-neutral-800 mb-2">Agri Gradient</h4>
              <p class="text-sm text-neutral-700">Primary green to blue transition</p>
            </div>
            <div class="agri-gradient-reverse rounded-lg p-8 text-center">
              <h4 class="font-semibold text-neutral-800 mb-2">Reverse Gradient</h4>
              <p class="text-sm text-neutral-700">Blue to green transition</p>
            </div>
            <div class="agri-gradient-dark rounded-lg p-8 text-center">
              <h4 class="font-semibold text-white mb-2">Dark Gradient</h4>
              <p class="text-sm text-neutral-200">Deep green to blue</p>
            </div>
            <div class="agri-gradient-warm rounded-lg p-8 text-center">
              <h4 class="font-semibold text-neutral-800 mb-2">Warm Gradient</h4>
              <p class="text-sm text-neutral-700">Orange to yellow tones</p>
            </div>
            <div class="agri-gradient-cool rounded-lg p-8 text-center">
              <h4 class="font-semibold text-neutral-800 mb-2">Cool Gradient</h4>
              <p class="text-sm text-neutral-700">Blue to cyan tones</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section id="typography" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Typography</h2>
          <p class="text-lg text-neutral-600">
            Consistent typography scale for optimal readability across all devices.
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold text-neutral-900 mb-2">Heading 1 (4xl)</h1>
            <p class="text-sm text-neutral-500">Used for page titles and main headings</p>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-neutral-900 mb-2">Heading 2 (3xl)</h2>
            <p class="text-sm text-neutral-500">Used for section headings</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-neutral-800 mb-2">Heading 3 (2xl)</h3>
            <p class="text-sm text-neutral-500">Used for subsection headings</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold text-neutral-800 mb-2">Heading 4 (xl)</h4>
            <p class="text-sm text-neutral-500">Used for card titles</p>
          </div>
          <div>
            <p class="text-lg text-neutral-700 mb-2">Body Large (lg)</p>
            <p class="text-sm text-neutral-500">Used for lead paragraphs</p>
          </div>
          <div>
            <p class="text-base text-neutral-700 mb-2">Body (base)</p>
            <p class="text-sm text-neutral-500">Default body text size</p>
          </div>
          <div>
            <p class="text-sm text-neutral-600 mb-2">Body Small (sm)</p>
            <p class="text-sm text-neutral-500">Used for secondary information</p>
          </div>
          <div>
            <p class="text-xs text-neutral-500 mb-2">Caption (xs)</p>
            <p class="text-sm text-neutral-500">Used for metadata and small text</p>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section id="buttons" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Buttons</h2>
          <p class="text-lg text-neutral-600">
            Primary interaction elements with consistent styling and behavior.
          </p>
        </div>

        <!-- Button Colors -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Button Colors</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Primary</h4>
              <div class="space-y-2">
                <UButton color="primary" size="sm">Small</UButton>
                <UButton color="primary" size="md">Medium</UButton>
                <UButton color="primary" size="lg">Large</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Secondary</h4>
              <div class="space-y-2">
                <UButton color="secondary" size="sm">Small</UButton>
                <UButton color="secondary" size="md">Medium</UButton>
                <UButton color="secondary" size="lg">Large</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Success</h4>
              <div class="space-y-2">
                <UButton color="success" size="sm">Small</UButton>
                <UButton color="success" size="md">Medium</UButton>
                <UButton color="success" size="lg">Large</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Warning</h4>
              <div class="space-y-2">
                <UButton color="warning" size="sm">Small</UButton>
                <UButton color="warning" size="md">Medium</UButton>
                <UButton color="warning" size="lg">Large</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Error</h4>
              <div class="space-y-2">
                <UButton color="error" size="sm">Small</UButton>
                <UButton color="error" size="md">Medium</UButton>
                <UButton color="error" size="lg">Large</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Neutral</h4>
              <div class="space-y-2">
                <UButton color="neutral" size="sm">Small</UButton>
                <UButton color="neutral" size="md">Medium</UButton>
                <UButton color="neutral" size="lg">Large</UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Button Variants -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Button Variants</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Solid</h4>
              <div class="space-y-2">
                <UButton color="primary" variant="solid">Solid Button</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Outline</h4>
              <div class="space-y-2">
                <UButton color="primary" variant="outline">Outline Button</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Ghost</h4>
              <div class="space-y-2">
                <UButton color="primary" variant="ghost">Ghost Button</UButton>
              </div>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Link</h4>
              <div class="space-y-2">
                <UButton color="primary" variant="link">Link Button</UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Button States -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-neutral-800 mb-6">Button States</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Default</h4>
              <UButton color="primary">Default Button</UButton>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Hover</h4>
              <UButton color="primary" class="hover:scale-105 transition-transform">Hover Button</UButton>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Loading</h4>
              <UButton color="primary" loading>Loading Button</UButton>
            </div>
            <div class="space-y-4">
              <h4 class="font-medium text-neutral-700">Disabled</h4>
              <UButton color="primary" disabled>Disabled Button</UButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section id="cards" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Cards</h2>
          <p class="text-lg text-neutral-600">
            Content containers with consistent spacing and styling.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-neutral-900">Basic Card</h3>
            </template>
            <p class="text-neutral-600">This is a basic card with header and body content.</p>
          </UCard>

          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-neutral-900">Card with Footer</h3>
            </template>
            <p class="text-neutral-600">Card content goes here with additional information.</p>
            <template #footer>
              <div class="flex justify-end space-x-2">
                <UButton color="neutral" variant="outline" size="sm">Cancel</UButton>
                <UButton color="primary" size="sm">Save</UButton>
              </div>
            </template>
          </UCard>

          <UCard class="demo-mode">
            <template #header>
              <h3 class="text-lg font-semibold text-warning-800">Demo Card</h3>
            </template>
            <p class="text-warning-700">This card demonstrates demo mode styling with warning colors.</p>
          </UCard>
        </div>
      </section>

      <!-- Forms -->
      <section id="forms" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Form Elements</h2>
          <p class="text-lg text-neutral-600">
            Consistent form styling with focus states and validation.
          </p>
        </div>

        <div class="max-w-2xl space-y-6">
          <div>
            <label class="agri-form-label">Email Address</label>
            <UInput 
              type="email" 
              placeholder="Enter your email address"
              class="w-full"
            />
          </div>

          <div>
            <label class="agri-form-label">Select Role</label>
            <USelect
              placeholder="Choose your role"
              :options="[
                { label: 'Manager', value: 'manager' },
                { label: 'Pilot', value: 'pilot' },
                { label: 'Loader', value: 'loader' }
              ]"
              class="w-full"
            />
          </div>

          <div>
            <label class="agri-form-label">Mission Description</label>
            <UTextarea
              placeholder="Describe the mission details..."
              rows="4"
              class="w-full"
            />
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <UCheckbox id="remember" />
              <label for="remember" class="text-sm text-neutral-700">Remember my preferences</label>
            </div>
            
            <div class="flex items-center space-x-4">
              <URadio id="option1" name="options" value="option1" />
              <label for="option1" class="text-sm text-neutral-700">Option 1</label>
            </div>
            
            <div class="flex items-center space-x-4">
              <URadio id="option2" name="options" value="option2" />
              <label for="option2" class="text-sm text-neutral-700">Option 2</label>
            </div>
          </div>

          <div>
            <label class="agri-form-label">Notifications</label>
            <div class="flex items-center space-x-4">
              <USwitch />
              <span class="text-sm text-neutral-700">Enable email notifications</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Alerts -->
      <section id="alerts" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Alerts & Notifications</h2>
          <p class="text-lg text-neutral-600">
            Status messages and notifications for user feedback.
          </p>
        </div>

        <div class="space-y-4">
          <UAlert color="primary" icon="i-heroicons-information-circle">
            This is a primary alert with an information icon.
          </UAlert>
          
          <UAlert color="success" icon="i-heroicons-check-circle">
            Mission completed successfully! All systems are operational.
          </UAlert>
          
          <UAlert color="warning" icon="i-heroicons-exclamation-triangle">
            Warning: Low fuel level detected. Please refuel before next mission.
          </UAlert>
          
          <UAlert color="error" icon="i-heroicons-x-circle">
            Error: Navigation system failure. Please contact maintenance.
          </UAlert>
          
          <UAlert color="info" icon="i-heroicons-light-bulb">
            Tip: Use the weather overlay for optimal spraying conditions.
          </UAlert>
        </div>
      </section>

      <!-- Badges -->
      <section id="badges" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Badges & Tags</h2>
          <p class="text-lg text-neutral-600">
            Small status indicators and labels for categorization.
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Color Variants</h3>
            <div class="flex flex-wrap gap-2">
              <UBadge color="primary">Primary</UBadge>
              <UBadge color="secondary">Secondary</UBadge>
              <UBadge color="success">Success</UBadge>
              <UBadge color="warning">Warning</UBadge>
              <UBadge color="error">Error</UBadge>
              <UBadge color="info">Info</UBadge>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Status Indicators</h3>
            <div class="flex flex-wrap gap-2">
              <div class="status-success px-3 py-1 rounded-full text-sm font-medium">
                Active Mission
              </div>
              <div class="status-warning px-3 py-1 rounded-full text-sm font-medium">
                Maintenance Due
              </div>
              <div class="status-error px-3 py-1 rounded-full text-sm font-medium">
                System Offline
              </div>
              <div class="status-info px-3 py-1 rounded-full text-sm font-medium">
                Update Available
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tables -->
      <section id="tables" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Tables</h2>
          <p class="text-lg text-neutral-600">
            Data presentation with consistent styling and responsive behavior.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-neutral-200">
            <thead class="bg-neutral-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Mission
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Pilot
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-neutral-200">
              <tr v-for="row in tableData" :key="row.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {{ row.mission }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {{ row.pilot }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800': row.status === 'Active',
                          'bg-blue-100 text-blue-800': row.status === 'Completed',
                          'bg-yellow-100 text-yellow-800': row.status === 'Scheduled'
                        }">
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {{ row.progress }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Navigation -->
      <section id="navigation" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Navigation</h2>
          <p class="text-lg text-neutral-600">
            Navigation components and link styling.
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Navigation Links</h3>
            <nav class="flex space-x-8">
              <a href="#" class="agri-nav-link">Dashboard</a>
              <a href="#" class="agri-nav-link agri-nav-link-active">Missions</a>
              <a href="#" class="agri-nav-link">Aircraft</a>
              <a href="#" class="agri-nav-link">Reports</a>
            </nav>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Tabs</h3>
            <UTabs :items="tabItems" />
          </div>
        </div>
      </section>

      <!-- Dashboard Components -->
      <section id="dashboard" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Dashboard Components</h2>
          <p class="text-lg text-neutral-600">
            Pre-built components for dashboard layouts and statistics.
          </p>
        </div>

        <div class="space-y-6">
          <div class="dashboard-header">
            <h3 class="text-xl font-semibold text-neutral-900">Dashboard Header</h3>
            <p class="text-neutral-600 mt-2">This demonstrates the dashboard header styling with consistent shadows and borders.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="dashboard-stat">
              <div class="dashboard-stat-icon bg-primary-100">
                <UIcon name="i-heroicons-users" class="h-6 w-6 text-primary-600" />
              </div>
              <div class="dashboard-stat-value text-primary-600">12</div>
              <div class="dashboard-stat-label">Team Members</div>
              <div class="dashboard-stat-description">Active team members</div>
            </div>

            <div class="dashboard-stat">
              <div class="dashboard-stat-icon bg-secondary-100">
                <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6 text-secondary-600" />
              </div>
              <div class="dashboard-stat-value text-secondary-600">8</div>
              <div class="dashboard-stat-label">Active Missions</div>
              <div class="dashboard-stat-description">Currently running</div>
            </div>

            <div class="dashboard-stat">
              <div class="dashboard-stat-icon bg-success-100">
                <UIcon name="i-heroicons-truck" class="h-6 w-6 text-success-600" />
              </div>
              <div class="dashboard-stat-value text-success-600">6</div>
              <div class="dashboard-stat-label">Aircraft</div>
              <div class="dashboard-stat-description">Available aircraft</div>
            </div>

            <div class="dashboard-stat">
              <div class="dashboard-stat-icon bg-warning-100">
                <UIcon name="i-heroicons-clock" class="h-6 w-6 text-warning-600" />
              </div>
              <div class="dashboard-stat-value text-warning-600">3</div>
              <div class="dashboard-stat-label">Pending</div>
              <div class="dashboard-stat-description">Awaiting approval</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Utilities -->
      <section id="utilities" class="scroll-mt-20">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Utility Classes</h2>
          <p class="text-lg text-neutral-600">
            Custom utility classes for common styling patterns.
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Shadows</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="agri-shadow rounded-lg p-6 bg-white">
                <h4 class="font-medium text-neutral-800 mb-2">Agri Shadow</h4>
                <p class="text-sm text-neutral-600">Standard shadow with green tint</p>
              </div>
              <div class="agri-shadow-lg rounded-lg p-6 bg-white">
                <h4 class="font-medium text-neutral-800 mb-2">Agri Shadow Large</h4>
                <p class="text-sm text-neutral-600">Enhanced shadow for cards</p>
              </div>
              <div class="agri-shadow-xl rounded-lg p-6 bg-white">
                <h4 class="font-medium text-neutral-800 mb-2">Agri Shadow XL</h4>
                <p class="text-sm text-neutral-600">Prominent shadow for modals</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Animations</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="animate-agri-pulse bg-primary-100 rounded-lg p-6 text-center">
                <h4 class="font-medium text-primary-800 mb-2">Pulse Animation</h4>
                <p class="text-sm text-primary-700">Continuous pulse effect</p>
              </div>
              <div class="animate-agri-bounce bg-secondary-100 rounded-lg p-6 text-center">
                <h4 class="font-medium text-secondary-800 mb-2">Bounce Animation</h4>
                <p class="text-sm text-secondary-700">Bouncing motion effect</p>
              </div>
              <div class="animate-agri-spin bg-success-100 rounded-lg p-6 text-center">
                <h4 class="font-medium text-success-800 mb-2">Spin Animation</h4>
                <p class="text-sm text-success-700">Continuous rotation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page metadata
useHead({
  title: 'Styleguide - Agri-Spray',
  meta: [
    { name: 'description', content: 'Complete design system and component library for Agri-Spray' }
  ]
})

// Navigation sections
const sections = [
  { id: 'colors', name: 'Colors' },
  { id: 'typography', name: 'Typography' },
  { id: 'buttons', name: 'Buttons' },
  { id: 'cards', name: 'Cards' },
  { id: 'forms', name: 'Forms' },
  { id: 'alerts', name: 'Alerts' },
  { id: 'badges', name: 'Badges' },
  { id: 'tables', name: 'Tables' },
  { id: 'navigation', name: 'Navigation' },
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'utilities', name: 'Utilities' }
]

// Color shades for display
const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

// Table data for demonstration
const tableData = [
  { id: 1, mission: 'Field A Spraying', pilot: 'John Smith', status: 'Active', progress: '75%' },
  { id: 2, mission: 'Field B Fertilizer', pilot: 'Sarah Johnson', status: 'Completed', progress: '100%' },
  { id: 3, mission: 'Field C Herbicide', pilot: 'Mike Wilson', status: 'Scheduled', progress: '0%' }
]



// Tab items for demonstration
const tabItems = [
  { label: 'Overview', content: 'Overview content goes here' },
  { label: 'Details', content: 'Detailed information content' },
  { label: 'Settings', content: 'Configuration options' }
]

// Active section tracking
const activeSection = ref('colors')

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = sectionId
  }
}

// Update active section on scroll
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id
        if (sections.find(s => s.id === sectionId)) {
          activeSection.value = sectionId
        }
      }
    })
  }, { threshold: 0.5 })

  sections.forEach(section => {
    const element = document.getElementById(section.id)
    if (element) observer.observe(element)
  })

  return () => observer.disconnect()
})

// Helper function to get color hex values (placeholder)
const getColorHex = (colorClass: string) => {
  // Extract actual hex values from CSS custom properties
  const cssVarName = `--color-${colorClass}`
  const computedStyle = getComputedStyle(document.documentElement)
  const hexValue = computedStyle.getPropertyValue(cssVarName).trim()
  
  // If the CSS variable exists and has a value, return it
  if (hexValue && hexValue !== '') {
    return hexValue
  }
  
}
</script>

<style scoped>
/* Custom scrollbar for navigation */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

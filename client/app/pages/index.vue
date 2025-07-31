<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-green-600" />
              <span class="text-xl font-bold text-gray-900">Agri-Spray</span>
            </div>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#about" class="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#contact" class="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
            <UButton
              to="/login"
              color="primary"
              variant="solid"
              icon="i-heroicons-arrow-right-on-rectangle"
            >
              Login
            </UButton>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <UButton
              to="/login"
              color="primary"
              variant="solid"
              icon="i-heroicons-arrow-right-on-rectangle"
              size="sm"
            >
              Login
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Professional</span>
                <span class="block text-green-600 xl:inline"> Agricultural Spraying</span>
                <span class="block xl:inline">Management</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Streamline your agricultural spraying operations with our comprehensive management system. 
                Designed for pilots, loaders, and managers to coordinate missions, manage loads, and track performance.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <UButton
                    to="/login"
                    size="lg"
                    color="primary"
                    icon="i-heroicons-rocket-launch"
                  >
                    Get Started
                  </UButton>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <UButton
                    to="#features"
                    size="lg"
                    variant="outline"
                    color="neutral"
                  >
                    Learn More
                  </UButton>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for efficient spraying operations
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            From mission planning to load management, our platform provides all the tools you need.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <UIcon name="i-heroicons-calendar-days" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Mission Management</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Plan and track spraying missions with detailed scheduling, field mapping, and progress monitoring.
              </p>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <UIcon name="i-heroicons-truck" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Load Management</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Efficiently manage chemical and water loads with precise measurements and safety protocols.
              </p>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Aircraft Fleet</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Track aircraft specifications, maintenance schedules, and operational capacity.
              </p>
            </div>

            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <UIcon name="i-heroicons-beaker" class="h-6 w-6" />
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Chemical Database</p>
              <p class="mt-2 ml-16 text-base text-gray-500">
                Comprehensive chemical inventory with application rates and safety information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div id="about" class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">About</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built for the agricultural industry
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Agri-Spray was developed by industry professionals who understand the unique challenges of agricultural spraying operations.
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Our Mission</h3>
              <p class="text-gray-600">
                To provide agricultural spraying operations with the most efficient, safe, and user-friendly management platform available. 
                We believe in leveraging technology to improve productivity while maintaining the highest safety standards.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Why Choose Agri-Spray?</h3>
              <ul class="text-gray-600 space-y-2">
                <li>• Industry-specific features designed for spraying operations</li>
                <li>• Real-time collaboration between pilots, loaders, and managers</li>
                <li>• Comprehensive safety and compliance tracking</li>
                <li>• Mobile-friendly interface for field operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Role-Based Access -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">User Roles</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Tailored dashboards for every role
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <!-- Manager -->
            <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <UIcon name="i-heroicons-users" class="h-8 w-8 text-green-600" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Manager</dt>
                      <dd class="text-lg font-medium text-gray-900">Full System Access</dd>
                    </dl>
                  </div>
                </div>
                <div class="mt-4">
                  <ul class="text-sm text-gray-500 space-y-2">
                    <li>• Manage all users and permissions</li>
                    <li>• Oversee all missions and operations</li>
                    <li>• Generate reports and analytics</li>
                    <li>• Manage aircraft and chemical inventory</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Pilot -->
            <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <UIcon name="i-heroicons-user" class="h-8 w-8 text-blue-600" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Pilot</dt>
                      <dd class="text-lg font-medium text-gray-900">Mission Focus</dd>
                    </dl>
                  </div>
                </div>
                <div class="mt-4">
                  <ul class="text-sm text-gray-500 space-y-2">
                    <li>• View assigned missions</li>
                    <li>• Update mission progress</li>
                    <li>• Manage loads and equipment</li>
                    <li>• Track flight hours and performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Loader -->
            <div class="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <UIcon name="i-heroicons-truck" class="h-8 w-8 text-orange-600" />
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Loader</dt>
                      <dd class="text-lg font-medium text-gray-900">Load Management</dd>
                    </dl>
                  </div>
                </div>
                <div class="mt-4">
                  <ul class="text-sm text-gray-500 space-y-2">
                    <li>• Prepare and track loads</li>
                    <li>• Manage chemical inventory</li>
                    <li>• Update load status</li>
                    <li>• Safety protocol compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div id="contact" class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Contact</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Get in touch with us
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Ready to streamline your agricultural spraying operations? Contact us to learn more.
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div class="space-y-3">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-envelope" class="h-5 w-5 text-green-600 mr-3" />
                  <span class="text-gray-600">info@agri-spray.com</span>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-phone" class="h-5 w-5 text-green-600 mr-3" />
                  <span class="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-map-pin" class="h-5 w-5 text-green-600 mr-3" />
                  <span class="text-gray-600">Agricultural District, CA 90210</span>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Support</h3>
              <p class="text-gray-600 mb-4">
                Need help getting started or have questions about our platform? Our support team is here to help.
              </p>
              <UButton
                color="primary"
                variant="outline"
                icon="i-heroicons-chat-bubble-left-right"
              >
                Contact Support
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-paper-airplane" class="h-8 w-8 text-green-400" />
              <span class="text-xl font-bold text-white">Agri-Spray</span>
            </div>
            <p class="text-gray-300 text-base">
              Professional agricultural spraying management system designed for efficiency, safety, and productivity.
            </p>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
                <ul class="mt-4 space-y-4">
                  <li><a href="#features" class="text-base text-gray-300 hover:text-white">Mission Management</a></li>
                  <li><a href="#features" class="text-base text-gray-300 hover:text-white">Load Tracking</a></li>
                  <li><a href="#features" class="text-base text-gray-300 hover:text-white">Fleet Management</a></li>
                  <li><a href="#features" class="text-base text-gray-300 hover:text-white">Chemical Database</a></li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul class="mt-4 space-y-4">
                  <li><a href="#" class="text-base text-gray-300 hover:text-white">Documentation</a></li>
                  <li><a href="#" class="text-base text-gray-300 hover:text-white">Training</a></li>
                  <li><a href="#contact" class="text-base text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-700 pt-8">
          <p class="text-base text-gray-400 xl:text-center">
            &copy; 2024 Agri-Spray. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template> 
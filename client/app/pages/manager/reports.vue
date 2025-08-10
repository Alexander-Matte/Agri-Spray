<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p class="text-gray-600 mt-1">
            View operational reports, performance metrics, and business insights
          </p>
        </div>
        <div class="flex space-x-3">
          <UButton
            color="primary"
            variant="solid"
            icon="i-heroicons-document-arrow-down"
            @click="exportReport"
          >
            Export Report
          </UButton>
          <UButton
            color="secondary"
            variant="solid"
            icon="i-heroicons-calendar"
            @click="scheduleReport"
          >
            Schedule Report
          </UButton>
        </div>
      </div>
    </div>

    <!-- Report Filters -->
    <UCard>
      <div class="flex flex-wrap gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            v-model="dateRange"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select
            v-model="reportType"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="operations">Operations Summary</option>
            <option value="financial">Financial Report</option>
            <option value="safety">Safety Report</option>
            <option value="maintenance">Maintenance Report</option>
          </select>
        </div>
        
        <UButton
          color="primary"
          variant="solid"
          @click="generateReport"
        >
          Generate Report
        </UButton>
      </div>
    </UCard>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
            <UIcon name="i-heroicons-paper-airplane" class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Total Missions</h3>
          <p class="text-3xl font-bold text-blue-600">47</p>
          <p class="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-100">
            <UIcon name="i-heroicons-currency-dollar" class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Revenue</h3>
          <p class="text-3xl font-bold text-green-600">$124K</p>
          <p class="text-sm text-gray-500 mt-1">+8% from last month</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
            <UIcon name="i-heroicons-clock" class="h-6 w-6 text-purple-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Flight Hours</h3>
          <p class="text-3xl font-bold text-purple-600">342h</p>
          <p class="text-sm text-gray-500 mt-1">+15% from last month</p>
        </div>
      </UCard>

      <UCard class="text-center">
        <div class="p-4">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100">
            <UIcon name="i-heroicons-beaker" class="h-6 w-6 text-orange-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Chemicals Used</h3>
          <p class="text-3xl font-bold text-orange-600">2.4k L</p>
          <p class="text-sm text-gray-500 mt-1">+5% from last month</p>
        </div>
      </UCard>
    </div>

    <!-- Detailed Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Mission Performance Chart -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Mission Performance</h3>
        </template>
        <div class="p-4">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Completion Rate</span>
              <span class="text-sm font-medium text-gray-900">94%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: 94%"></div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">On-Time Delivery</span>
              <span class="text-sm font-medium text-gray-900">87%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 87%"></div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Safety Score</span>
              <span class="text-sm font-medium text-gray-900">98%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-600 h-2 rounded-full" style="width: 98%"></div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Top Performing Pilots -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium text-gray-900">Top Performing Pilots</h3>
        </template>
        <div class="p-4">
          <div class="space-y-3">
            <div v-for="pilot in topPilots" :key="pilot.id" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-user" class="h-4 w-4 text-gray-600" />
                </div>
                <span class="text-sm font-medium text-gray-900">{{ pilot.name }}</span>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ pilot.missions }} missions</div>
                <div class="text-xs text-gray-500">{{ pilot.hours }}h flown</div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
      </template>
      <div class="space-y-4">
        <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getActivityColor(activity.type)">
              <UIcon :name="getActivityIcon(activity.type)" class="h-4 w-4 text-white" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
            <p class="text-sm text-gray-500">{{ activity.description }}</p>
          </div>
          <div class="flex-shrink-0">
            <span class="text-sm text-gray-500">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Set the layout for this page
definePageMeta({
  layout: 'dashboard'
})

// Report filters
const dateRange = ref('30')
const reportType = ref('operations')

// Sample data
const topPilots = ref([
  { id: 1, name: 'Sarah Johnson', missions: 12, hours: 45 },
  { id: 2, name: 'Mike Smith', missions: 10, hours: 38 },
  { id: 3, name: 'John Davis', missions: 8, hours: 32 }
])

const recentActivities = ref([
  {
    type: 'mission',
    title: 'Mission SP-047 Completed',
    description: 'North Field spraying completed successfully',
    time: '2 hours ago'
  },
  {
    type: 'maintenance',
    title: 'Aircraft Maintenance Scheduled',
    description: 'N-12345 scheduled for routine maintenance',
    time: '4 hours ago'
  },
  {
    type: 'safety',
    title: 'Safety Inspection Passed',
    description: 'Monthly safety inspection completed',
    time: '1 day ago'
  },
  {
    type: 'financial',
    title: 'Invoice Generated',
    description: 'Invoice #INV-2024-001 generated for customer',
    time: '2 days ago'
  }
])

// Methods
const generateReport = () => {
  console.log('Generating report:', { dateRange: dateRange.value, reportType: reportType.value })
  // TODO: Implement report generation
}

const exportReport = () => {
  console.log('Exporting report')
  // TODO: Implement report export
}

const scheduleReport = () => {
  console.log('Scheduling report')
  // TODO: Implement report scheduling
}

const getActivityColor = (type: string) => {
  const colors = {
    mission: 'bg-green-500',
    maintenance: 'bg-blue-500',
    safety: 'bg-purple-500',
    financial: 'bg-orange-500'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500'
}

const getActivityIcon = (type: string) => {
  const icons = {
    mission: 'i-heroicons-paper-airplane',
    maintenance: 'i-heroicons-wrench-screwdriver',
    safety: 'i-heroicons-shield-check',
    financial: 'i-heroicons-currency-dollar'
  }
  return icons[type as keyof typeof icons] || 'i-heroicons-information-circle'
}
</script>

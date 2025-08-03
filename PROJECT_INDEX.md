# Agri-Spray Project Index

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Core Entities & Data Model](#core-entities--data-model)
5. [API Documentation](#api-documentation)
6. [Frontend Implementation](#frontend-implementation)
7. [Security & Authentication](#security--authentication)
8. [Development Setup](#development-setup)
9. [Database Schema](#database-schema)
10. [Current Implementation Status](#current-implementation-status)
11. [Development Roadmap](#development-roadmap)
12. [Deployment & DevOps](#deployment--devops)
13. [Contributing Guidelines](#contributing-guidelines)

---

## 🎯 Project Overview

**Agri-Spray** is a comprehensive agricultural spraying management system designed for pilots, loaders, and operations managers to coordinate missions, manage loads, and track performance in agricultural spraying operations.

### Key Features
- **Mission Management**: Plan, schedule, and track spraying missions
- **Load Management**: Prepare and track chemical loads for aircraft
- **Aircraft & Pilot Management**: Manage fleet and personnel
- **Chemical Database**: Track chemicals, safety data, and application rates
- **Customer Management**: Manage farm clients and their requirements
- **Real-time Dashboard**: Role-based dashboards for different user types
- **Secure Authentication**: JWT-based authentication with role-based access

---

## 🏗️ Architecture & Technology Stack

### Backend Stack
- **Framework**: Symfony 7.3 with API Platform 4.1
- **Database**: PostgreSQL 16
- **Authentication**: JWT with Lexik JWT Authentication Bundle
- **ORM**: Doctrine ORM 3.5
- **Web Server**: FrankenPHP (Caddy-based)
- **Containerization**: Docker with Docker Compose
- **PHP Version**: 8.4.10+

### Frontend Stack
- **Framework**: Nuxt 4.0.1 with Vue 3.5.18
- **Language**: TypeScript 5.8.3
- **State Management**: Pinia 3.0.3 with persisted state
- **UI Framework**: Nuxt UI 3.3.0
- **HTTP Client**: Built-in Nuxt composables
- **Authentication**: JWT with secure cookie storage
- **Development Tools**: ESLint 9.32.0, Vue TSC 3.0.4

### Development Tools
- **Package Manager**: Composer (PHP), npm (Node.js)
- **Code Quality**: ESLint, TypeScript
- **Version Control**: Git
- **Containerization**: Docker & Docker Compose

---

## 📁 Project Structure

```
Agri-Spray/
├── 📁 api/                          # Symfony backend application
│   ├── 📁 bin/
│   │   └── console                  # Symfony console
│   ├── 📁 config/                   # Symfony configuration
│   │   ├── 📁 api_platform/         # API Platform config
│   │   ├── 📁 bundles.php           # Bundle configuration
│   │   ├── 📁 jwt/                  # JWT configuration
│   │   ├── 📁 packages/             # Package configurations
│   │   ├── 📁 routes/               # Routing configuration
│   │   └── services.yaml            # Service definitions
│   ├── 📁 docs/                     # Documentation
│   ├── 📁 frankenphp/               # Web server configuration
│   │   ├── Caddyfile                # Caddy configuration
│   │   └── 📁 conf.d/               # PHP configuration
│   ├── 📁 migrations/               # Database migrations
│   ├── 📁 public/                   # Web root
│   ├── 📁 src/                      # Application source code
│   │   ├── 📁 ApiResource/          # API Platform resources
│   │   ├── 📁 Command/              # Console commands
│   │   │   ├── CreateDemoUsersCommand.php
│   │   │   └── CreateUserCommand.php
│   │   ├── 📁 Controller/           # HTTP controllers
│   │   │   └── DashboardController.php
│   │   ├── 📁 DataTransformer/      # Data transformers
│   │   │   └── UnitDisplayTransformer.php
│   │   ├── 📁 Dto/                  # Data transfer objects
│   │   │   ├── DashboardStatsDto.php
│   │   │   └── MissionSummaryDto.php
│   │   ├── 📁 Entity/               # Database entities
│   │   │   ├── Aircraft.php         # Aircraft management
│   │   │   ├── Base.php             # Operational bases
│   │   │   ├── Chemical.php         # Chemical database
│   │   │   ├── Customer.php         # Customer management
│   │   │   ├── Load.php             # Load management
│   │   │   ├── Loader.php           # Loader personnel
│   │   │   ├── Mission.php          # Mission management
│   │   │   ├── Pilot.php            # Pilot personnel
│   │   │   ├── RefreshToken.php     # JWT refresh tokens
│   │   │   └── User.php             # User authentication
│   │   ├── 📁 Repository/           # Data access layer
│   │   │   ├── AircraftRepository.php
│   │   │   ├── BaseRepository.php
│   │   │   ├── ChemicalRepository.php
│   │   │   ├── CustomerRepository.php
│   │   │   ├── LoaderRepository.php
│   │   │   ├── LoadRepository.php
│   │   │   ├── MissionRepository.php
│   │   │   ├── PilotRepository.php
│   │   │   └── UserRepository.php
│   │   ├── 📁 Security/             # Authentication & authorization
│   │   │   └── Roles.php            # User role definitions
│   │   ├── 📁 Service/              # Business logic services
│   │   │   └── UnitConversionService.php
│   │   ├── 📁 State/                # API Platform state providers
│   │   │   ├── DashboardStatsProvider.php
│   │   │   ├── MissionSummaryProvider.php
│   │   │   └── UserProcessor.php
│   │   └── Kernel.php               # Application kernel
│   ├── 📁 templates/                # Twig templates
│   ├── 📁 var/                      # Cache and logs
│   ├── 📁 vendor/                   # Composer dependencies
│   ├── composer.json                # PHP dependencies
│   ├── composer.lock                # Locked PHP dependencies
│   ├── Dockerfile                   # Backend container
│   ├── compose.yaml                 # Development services
│   ├── compose.prod.yaml            # Production services
│   └── README.md                    # Backend documentation
├── 📁 client/                       # Nuxt frontend application
│   ├── 📁 app/                      # Nuxt application
│   │   ├── 📁 assets/               # Static assets
│   │   │   └── 📁 css/
│   │   │       └── main.css
│   │   ├── 📁 components/           # Vue components
│   │   │   ├── LoaderDashboard.vue  # Loader dashboard component
│   │   │   ├── ManagerDashboard.vue # Manager dashboard component
│   │   │   └── PilotDashboard.vue   # Pilot dashboard component
│   │   ├── 📁 composables/          # Vue composables
│   │   │   ├── useApi.ts            # API client composable
│   │   │   ├── useApiError.ts       # Error handling
│   │   │   └── useMissions.ts       # Mission operations
│   │   ├── 📁 layouts/              # Page layouts
│   │   ├── 📁 middleware/           # Route middleware
│   │   ├── 📁 pages/                # Vue pages/routes
│   │   │   ├── 📁 loader/           # Loader-specific pages
│   │   │   │   └── index.vue        # Loader dashboard page
│   │   │   ├── 📁 manager/          # Manager-specific pages
│   │   │   │   └── index.vue        # Manager dashboard page
│   │   │   ├── 📁 pilot/            # Pilot-specific pages
│   │   │   │   └── index.vue        # Pilot dashboard page
│   │   │   ├── dashboard.vue        # Main dashboard
│   │   │   ├── index.vue            # Landing page
│   │   │   └── login.vue            # Login page
│   │   ├── 📁 plugins/              # Nuxt plugins
│   │   │   └── pinia.client.ts      # Pinia client plugin
│   │   ├── 📁 utils/                # Utility functions
│   │   ├── app.vue                  # Root component
│   │   └── error.vue                # Error page
│   ├── 📁 stores/                   # Pinia state stores
│   │   └── auth.ts                  # Authentication store
│   ├── 📁 scripts/                  # Development scripts
│   │   └── dev.sh                   # Development script
│   ├── 📁 public/                   # Static files
│   ├── Dockerfile                   # Frontend container
│   ├── compose.yaml                 # Development services
│   ├── compose.prod.yaml            # Production services
│   ├── eslint.config.mjs            # ESLint configuration
│   ├── nuxt.config.ts               # Nuxt configuration
│   ├── package.json                 # Node.js dependencies
│   ├── package-lock.json            # Locked Node.js dependencies
│   ├── tsconfig.json                # TypeScript configuration
│   └── README.md                    # Frontend documentation
├── 📁 node_modules/                 # Root Node.js dependencies
├── .gitignore                       # Git ignore rules
├── LICENSE                          # Project license
├── package.json                     # Root package.json
├── package-lock.json                # Root locked dependencies
├── PROJECT_INDEX.md                 # This comprehensive index
├── README.md                        # Project overview
└── TODO                             # Development tasks
```

---

## 🗄️ Core Entities & Data Model

### Primary Entities

#### Mission (Central Entity)
- **Purpose**: Represents spraying missions
- **Key Fields**: 
  - `title`, `type`, `fieldSizes`, `location`, `status`
  - `scheduledDate`, `estimatedDuration`, `notes`
- **Types**: herbicide, fungicide, insecticide, fertilizer, seed, other
- **Statuses**: planned, in_progress, completed, cancelled
- **Relationships**: loads (1:N), pilot (N:1), aircraft (N:N), customer (N:1), base (N:1)

#### Load
- **Purpose**: Individual spray loads for missions
- **Key Fields**: 
  - `chemicalMix`, `volume`, `applicationRate`, `status`
  - `preparedAt`, `loadedAt`, `completedAt`
- **Statuses**: prepared, loaded, applied, completed
- **Relationships**: mission (N:1), chemical (N:1), loader (N:1)

#### Aircraft
- **Purpose**: Aircraft used for spraying operations
- **Key Fields**: 
  - `registration`, `type`, `capacity`, `status`
  - `manufacturer`, `model`, `year`
- **Statuses**: active, maintenance, retired
- **Relationships**: missions (N:N), base (N:1)

#### Pilot
- **Purpose**: Pilots who fly spraying missions
- **Key Fields**: 
  - `name`, `license`, `experience`, `availability`
  - `contactInfo`, `certifications`
- **Relationships**: missions (1:N), base (N:1)

#### Loader
- **Purpose**: Personnel who prepare spray loads
- **Key Fields**: 
  - `name`, `certifications`, `availability`
  - `contactInfo`, `experience`
- **Relationships**: loads (1:N), base (N:1)

#### Chemical
- **Purpose**: Chemicals used in spraying operations
- **Key Fields**: 
  - `name`, `type`, `concentration`, `safetyData`
  - `applicationRates`, `restrictions`
- **Relationships**: loads (1:N)

#### Customer
- **Purpose**: Farm owners/clients requesting spraying services
- **Key Fields**: 
  - `name`, `contactInfo`, `farmLocations`
  - `preferences`, `billingInfo`
- **Relationships**: missions (1:N)

#### Base
- **Purpose**: Operational bases for aircraft and personnel
- **Key Fields**: 
  - `name`, `location`, `facilities`
  - `contactInfo`, `operatingHours`
- **Relationships**: aircraft (1:N), pilots (1:N), loaders (1:N), missions (1:N)

#### User
- **Purpose**: System users with authentication
- **Key Fields**: 
  - `email`, `roles`, `profileInformation`
  - `lastLogin`, `isActive`
- **Relationships**: pilot (1:1), loader (1:1), customer (1:1)

### Entity Relationships
```
Mission (1) ←→ (N) Load
Mission (N) ←→ (1) Pilot
Mission (N) ←→ (M) Aircraft
Mission (N) ←→ (1) Customer
Mission (N) ←→ (1) Base
Load (N) ←→ (1) Chemical
Load (N) ←→ (1) Loader
Aircraft (N) ←→ (1) Base
Pilot (N) ←→ (1) Base
Loader (N) ←→ (1) Base
User (1) ←→ (1) Pilot/Loader/Customer
```

---

## 🔌 API Documentation

### Core Resource Endpoints
- `GET/POST/PUT/DELETE /api/missions` - Mission management
- `GET/POST/PUT/DELETE /api/loads` - Load management
- `GET/POST/PUT/DELETE /api/aircraft` - Aircraft management
- `GET/POST/PUT/DELETE /api/pilots` - Pilot management
- `GET/POST/PUT/DELETE /api/loaders` - Loader management
- `GET/POST/PUT/DELETE /api/chemicals` - Chemical management
- `GET/POST/PUT/DELETE /api/customers` - Customer management
- `GET/POST/PUT/DELETE /api/bases` - Base management
- `GET/POST/PUT/DELETE /api/users` - User management

### Authentication Endpoints
- `POST /api/login` - JWT authentication (sets secure cookies)
- `POST /api/token/refresh` - JWT refresh token (sets secure cookies)
- `POST /api/logout` - Logout (clears secure cookies)
- `GET /api/me` - Get current user information

### Custom Endpoints
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/missions/summary` - Mission summaries

### API Documentation
- **Interactive Docs**: http://localhost:8080/api
- **OpenAPI Spec**: http://localhost:8080/api/docs.json

---

## 🎨 Frontend Implementation

### Page Structure
- **Landing Page** (`/`) - Marketing page with feature highlights
- **Login Page** (`/login`) - Authentication form
- **Dashboard** (`/dashboard`) - Role-based dashboard
- **Role-specific Pages**:
  - `/manager/*` - Manager-specific functionality
  - `/pilot/*` - Pilot-specific functionality
  - `/loader/*` - Loader-specific functionality

### Key Components
- **Authentication Flow**: JWT with secure cookie storage
- **State Management**: Pinia with persisted state
- **API Integration**: Custom composables for API operations
- **Error Handling**: Comprehensive error handling with retry logic
- **Responsive Design**: Mobile-friendly UI with Nuxt UI

### Composables
- `useApi.ts` - Core API client with authentication
- `useApiError.ts` - Error handling and display
- `useMissions.ts` - Mission-specific operations

### State Stores
- `auth.ts` - Authentication state and user management

### Dashboard Components
- `LoaderDashboard.vue` - Loader-specific dashboard interface
- `ManagerDashboard.vue` - Manager-specific dashboard interface
- `PilotDashboard.vue` - Pilot-specific dashboard interface

---

## 🔐 Security & Authentication

### User Roles & Permissions
- **ROLE_USER**: Basic user access
- **ROLE_LOADER**: Load preparation and management
- **ROLE_PILOT**: Mission execution and flight management
- **ROLE_MANAGER**: Full system access and oversight
- **ROLE_DEMO_MANAGER**: Demo manager with restricted access
- **ROLE_DEMO_PILOT**: Demo pilot with restricted access
- **ROLE_DEMO_LOADER**: Demo loader with restricted access

### Authentication Flow
1. **Frontend Login**: User submits credentials to `/api/auth` (Nuxt proxy)
2. **Backend Authentication**: Nuxt forwards to `/api/login` (Symfony JWT endpoint)
3. **Secure Cookies**: Backend sets JWT tokens as HTTP-only secure cookies
4. **Token Response**: Backend returns user data (tokens in cookies)
5. **API Calls**: Frontend automatically sends cookies with requests
6. **Token Refresh**: Automatic refresh via secure cookies
7. **Session Persistence**: Pinia persisted state maintains user data
8. **Security**: HTTP-only cookies prevent XSS, SameSite prevents CSRF

### Security Features
- JWT-based authentication
- HTTP-only secure cookies
- Role-based access control
- CORS configuration
- Input validation and sanitization

---

## 🚀 Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- PHP 8.4+ (for local development)

### Quick Start
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd Agri-Spray
   ```

2. **Create Docker Network**
   ```bash
   docker network create agri-spray-network
   ```

3. **Start Backend**
   ```bash
   cd api
   docker-compose up -d
   ```

4. **Start Frontend**
   ```bash
   cd ../client
   docker-compose up -d
   ```

5. **Access Applications**
   - Frontend: http://localhost:3000
   - API: http://localhost:8080
   - API Documentation: http://localhost:8080/api
   - Database Admin: http://localhost:8081

### Environment Configuration
- **API**: Uses `.env` file for configuration
- **Client**: Uses `nuxt.config.ts` for runtime configuration
- **Database**: PostgreSQL with persistent volumes
- **JWT**: Configurable secrets via environment variables

### Development Commands
```bash
# Backend (Symfony)
cd api
docker-compose exec php bin/console cache:clear
docker-compose exec php bin/console doctrine:migrations:migrate
docker-compose exec php bin/console doctrine:fixtures:load

# Frontend (Nuxt)
cd client
npm run dev
npm run build
npm run preview
```

---

## 🗄️ Database Schema

### Migrations
- `Version20250724123959.php` - Initial schema
- `Version20250724124507.php` - User entity
- `Version20250724125610.php` - Mission relationships
- `Version20250724135404.php` - Load entity
- `Version20250724135644.php` - Chemical entity
- `Version20250724141825.php` - Loader entity
- `Version20250724153756.php` - Aircraft entity
- `Version20250802114112.php` - Refresh token table

### Key Relationships
- Mission → Load (One-to-Many)
- Mission → Pilot (Many-to-One)
- Mission → Aircraft (Many-to-Many)
- Mission → Customer (Many-to-One)
- Mission → Base (Many-to-One)
- Load → Chemical (Many-to-One)
- Load → Loader (Many-to-One)
- Aircraft → Base (Many-to-One)
- Pilot → Base (Many-to-One)
- Loader → Base (Many-to-One)

---

## 📊 Current Implementation Status

### ✅ Completed Features

#### Backend (API)
- [x] **Entity Definitions**: All core entities implemented
- [x] **Database Migrations**: Complete schema with relationships
- [x] **API Platform Integration**: Full CRUD operations exposed
- [x] **JWT Authentication**: Secure authentication with refresh tokens
- [x] **User Roles**: Role-based access control implemented
- [x] **Custom Controllers**: Dashboard and mission summary endpoints
- [x] **Data Transformers**: Unit conversion and display transformers
- [x] **DTOs**: Dashboard stats and mission summary DTOs
- [x] **Repositories**: Custom repository methods for data access
- [x] **Services**: Unit conversion service
- [x] **State Providers**: API Platform state providers for custom data
- [x] **Console Commands**: User creation and demo data commands

#### Frontend
- [x] **Authentication Flow**: Complete JWT integration with secure cookies
- [x] **Landing Page**: Professional marketing page
- [x] **Login Page**: Authentication form with validation
- [x] **Dashboard**: Role-based dashboard implementation
- [x] **Dashboard Components**: Role-specific dashboard components
- [x] **State Management**: Pinia with persisted state
- [x] **API Integration**: Comprehensive composables for API operations
- [x] **Error Handling**: Robust error handling with retry logic
- [x] **Responsive Design**: Mobile-friendly UI with Nuxt UI
- [x] **TypeScript**: Full TypeScript implementation
- [x] **Role-specific Pages**: Basic page structure for each role

#### DevOps
- [x] **Docker Configuration**: Complete containerization
- [x] **Development Environment**: Docker Compose setup
- [x] **Production Configuration**: Production-ready Docker files
- [x] **Database**: PostgreSQL with persistent storage
- [x] **Web Server**: FrankenPHP configuration

### 🔄 In Progress
- [ ] **Role-specific Page Content**: Detailed functionality for manager, pilot, and loader pages
- [ ] **Mission Management UI**: Create, edit, and manage missions
- [ ] **Load Management**: Load preparation and tracking interface
- [ ] **Chemical Database**: Chemical management interface
- [ ] **Aircraft Management**: Aircraft CRUD operations
- [ ] **Customer Management**: Customer management interface

### 📋 Planned Features
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Mobile Application**: React Native or PWA
- [ ] **Reporting**: PDF generation and export
- [ ] **Analytics**: Performance tracking and reporting
- [ ] **Weather Integration**: Weather API integration
- [ ] **GPS Tracking**: Aircraft location tracking
- [ ] **Inventory Management**: Chemical inventory tracking
- [ ] **Financial Tracking**: Billing and invoicing

---

## 🗺️ Development Roadmap

### Phase 1: Core Functionality (Current)
- [x] Basic entity management
- [x] Authentication and authorization
- [x] Role-based dashboards
- [ ] Complete CRUD operations for all entities
- [ ] Mission scheduling and management
- [ ] Load preparation workflow

### Phase 2: Advanced Features
- [ ] Real-time mission tracking
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Weather integration
- [ ] GPS tracking

### Phase 3: Business Features
- [ ] Financial tracking and invoicing
- [ ] Customer portal
- [ ] Advanced analytics
- [ ] Integration with external systems

### Phase 4: Enterprise Features
- [ ] Multi-tenancy
- [ ] Advanced security features
- [ ] API rate limiting
- [ ] Comprehensive monitoring

---

## 🚀 Deployment & DevOps

### Production Configuration
- **Environment**: Production Docker Compose files
- **Database**: PostgreSQL with persistent volumes
- **Web Server**: FrankenPHP with Caddy
- **Security**: HTTPS with Let's Encrypt
- **Monitoring**: Application and database monitoring

### Deployment Options
1. **Docker Deployment**: Using Docker Compose
2. **Cloud Deployment**: AWS, DigitalOcean, or Azure
3. **Self-hosted**: On-premises deployment

### Scaling Considerations
- **Horizontal Scaling**: Stateless API design
- **Database**: Connection pooling and optimization
- **Caching**: Redis for session and data caching
- **CDN**: Static asset delivery
- **Load Balancing**: High availability setup

### Monitoring & Logging
- **Application Logs**: Symfony Monolog integration
- **Database Monitoring**: PostgreSQL monitoring
- **Performance Monitoring**: Application performance tracking
- **Error Tracking**: Error monitoring and alerting

---

## 🤝 Contributing Guidelines

### Development Standards
- **Backend**: Follow Symfony coding standards
- **Frontend**: Use Vue 3 composition API
- **Testing**: Write unit and integration tests
- **Documentation**: Update documentation for new features

### Code Organization
- **Entities**: Keep focused and single-purpose
- **Services**: Implement business logic in services
- **DTOs**: Use for complex data transformations
- **Validation**: Implement proper validation and error handling
- **API Design**: Follow RESTful principles

### Git Workflow
- **Branching**: Feature branches for new development
- **Commits**: Meaningful commit messages
- **Pull Requests**: Code review process
- **Testing**: Automated testing in CI/CD

### Code Quality
- **PHP**: PHPStan for static analysis
- **TypeScript**: ESLint and TypeScript strict mode
- **Testing**: PHPUnit for backend, Vitest for frontend
- **Documentation**: API documentation with OpenAPI

---

## 📞 Support & Resources

### Documentation
- **API Documentation**: http://localhost:8080/api
- **Symfony Documentation**: https://symfony.com/doc
- **Nuxt Documentation**: https://nuxt.com/docs
- **Vue Documentation**: https://vuejs.org/guide

### Development Tools
- **Database Admin**: http://localhost:8081 (pgAdmin)
- **API Testing**: Postman or Insomnia
- **Code Quality**: PHPStan, ESLint, TypeScript

### Community
- **Symfony Community**: https://symfony.com/community
- **Vue Community**: https://vuejs.org/community
- **Nuxt Community**: https://nuxt.com/community

---

*Last Updated: January 2025*
*Version: 1.0.0* 
# Agri-Spray Frontend

This is the Nuxt 4 frontend for the Agri-Spray agricultural spraying management system.

## Quick Start

### Development

1. **Start the backend first** (from the `api` directory):
   ```bash
   cd ../api
   docker-compose up -d
   ```

2. **Start the frontend** (from the `client` directory):
   ```bash
   # Using Docker (recommended)
   docker-compose up
   
   # Or using npm directly
   npm install
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - API Documentation: http://localhost:8080/api/docs

### Production

```bash
# Build and run production version
docker-compose -f docker-compose.prod.yml up -d
```

## Features

- **Landing Page**: Public information about the application
- **Role-Based Login**: Different dashboards for Managers, Pilots, and Loaders
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Nuxt UI and Tailwind CSS

## User Roles

### Manager
- Full system access
- User management
- Mission oversight
- Reports and analytics

### Pilot
- View assigned missions
- Update mission progress
- Manage loads and equipment
- Track flight hours

### Loader
- Prepare and track loads
- Manage chemical inventory
- Update load status
- Safety protocol compliance

## Development

### Project Structure
```
client/
├── app/
│   ├── pages/          # Route pages
│   ├── components/     # Vue components
│   ├── layouts/        # Page layouts
│   ├── stores/         # Pinia stores
│   └── assets/         # Static assets
├── docker-compose.yml  # Development Docker setup
├── docker-compose.prod.yml  # Production Docker setup
└── Dockerfile          # Multi-stage Docker build
```

### Environment Variables
- `API_BASE_URL`: Backend API URL (default: http://localhost:8080/api)
- `NUX_HOST`: Server host (default: 0.0.0.0)
- `NUX_PORT`: Server port (default: 3000)

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `docker-compose up`: Start with Docker (development)
- `docker-compose -f docker-compose.prod.yml up`: Start with Docker (production)

## Docker Commands

### Development
```bash
# Start development environment
docker-compose up

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down
```

### Production
```bash
# Build and start production
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production
docker-compose -f docker-compose.prod.yml down
```

## API Integration

The frontend communicates with the Symfony API Platform backend:

- **Authentication**: JWT-based authentication
- **API Endpoints**: RESTful API with OpenAPI documentation
- **Real-time Updates**: WebSocket support for live updates
- **File Uploads**: Support for mission photos and documents

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Write tests for new features
4. Update documentation as needed

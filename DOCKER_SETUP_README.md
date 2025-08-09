# Agri-Spray Docker Setup

This repository contains a complete Docker Compose setup for the Agri-Spray application, providing both development and production environments with proper security architecture.

## 🚀 Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker Compose V2+
- Git

### Development Setup
```bash
# Clone and navigate to project
git clone <repository-url>
cd Agri-Spray

# Setup environment
cp ENVIRONMENT_TEMPLATE.env .env
# Edit .env with your configurations

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Setup
```bash
# Setup production environment
cp ENVIRONMENT_TEMPLATE.env .env
# Configure production values in .env

# Start production services
docker-compose -f docker-compose.prod.yaml up -d
```

## 🏗️ Architecture

### Services Overview
- **Nginx**: Reverse proxy and load balancer
- **Client**: Nuxt.js frontend application  
- **API**: Symfony backend with FrankenPHP
- **Database**: PostgreSQL database
- **PgAdmin**: Database admin interface (dev only)

### Network Architecture
```
Internet → Nginx → Client/API
                ↓
            Backend Network
                ↓
            Database + Admin
```

## 🔒 Security Features

### Network Segmentation
- **Frontend Network**: Public-facing services (nginx, client, api)
- **Backend Network**: Internal services (api, database, admin tools)
- **Isolation**: Client cannot directly access database

### Security Controls
- Rate limiting on API endpoints
- JWT authentication for API access
- SSL/TLS termination at nginx (production)
- Security headers (HSTS, CSP, XSS protection)
- No direct database port exposure

## 📁 Project Structure

```
Agri-Spray/
├── api/                          # Symfony backend
├── client/                       # Nuxt.js frontend
├── nginx/                        # Nginx configurations
│   ├── nginx.conf               # Development config
│   └── nginx.prod.conf          # Production config
├── docker-compose.yaml          # Development setup
├── docker-compose.prod.yaml     # Production setup
├── ENVIRONMENT_TEMPLATE.env     # Environment template
└── docs/                        # Documentation
    ├── DEPLOYMENT_GUIDE.md
    ├── SECURITY_ARCHITECTURE.md
    ├── MIGRATION_VERIFICATION.md
    └── ENVIRONMENT_SETUP.md
```

## 🌐 Service Access

### Development
| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost | Main application |
| API | http://localhost/api | Backend API |
| PgAdmin | http://localhost:8081 | Database admin |

### Production  
| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | https://your-domain.com | Main application |
| API | https://your-domain.com/api | Backend API |
| Database | Internal only | Secure access |

## ⚙️ Configuration

### Environment Variables
Key variables to configure in `.env`:

```bash
# Application
APP_ENV=dev|prod
APP_SECRET=your-secret-key

# Database
POSTGRES_PASSWORD=secure-password
DATABASE_URL=postgresql://user:pass@database:5432/db

# Server
SERVER_NAME=your-domain.com
CLIENT_API_BASE_URL=https://your-domain.com/api

# Security
CADDY_MERCURE_JWT_SECRET=secure-jwt-secret
```

### SSL Configuration (Production)
Place SSL certificates in `nginx/ssl/`:
- `cert.pem` - SSL certificate
- `private.key` - Private key

## 🛠️ Development Workflow

### Starting Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api client

# Execute commands in containers
docker-compose exec api bash
docker-compose exec client sh
```

### API Development
```bash
# Run Symfony commands
docker-compose exec api php bin/console cache:clear
docker-compose exec api php bin/console doctrine:migrations:migrate

# Install dependencies
docker-compose exec api composer install
```

### Client Development
```bash
# Install dependencies
docker-compose exec client npm install

# Run development commands
docker-compose exec client npm run dev
```

### Database Management
```bash
# Access database directly
docker-compose exec database psql -U app agri_spray

# Create backup
docker-compose exec database pg_dump -U app agri_spray > backup.sql

# Access PgAdmin
# Open http://localhost:8081 in browser
```

## 🚀 Production Deployment

### Initial Deployment
1. Configure production environment variables
2. Set up SSL certificates
3. Configure domain DNS
4. Deploy: `docker-compose -f docker-compose.prod.yaml up -d`

### Updates
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yaml build --no-cache
docker-compose -f docker-compose.prod.yaml up -d

# Run migrations
docker-compose -f docker-compose.prod.yaml exec api php bin/console doctrine:migrations:migrate --no-interaction
```

### Monitoring
```bash
# Check service status
docker-compose -f docker-compose.prod.yaml ps

# View logs
docker-compose -f docker-compose.prod.yaml logs --tail=100 -f

# Check resource usage
docker stats
```

## 🔧 Troubleshooting

### Common Issues

**Port Conflicts**
```bash
# Check port usage
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Stop conflicting services
sudo systemctl stop apache2 nginx
```

**Network Issues**
```bash
# Clean up networks
docker network prune

# Recreate networks
docker-compose down
docker-compose up -d
```

**Database Connection Issues**
```bash
# Check database health
docker-compose exec database pg_isready -U app

# View database logs
docker-compose logs database
```

### Debug Commands
```bash
# Test nginx configuration
docker-compose exec nginx nginx -t

# Check API health
curl -I http://localhost/api/health

# Test database connectivity
docker-compose exec api pg_isready -h database -U app
```

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [Security Architecture](SECURITY_ARCHITECTURE.md) - Security design and controls
- [Environment Setup](ENVIRONMENT_SETUP.md) - Environment configuration guide
- [Migration Verification](MIGRATION_VERIFICATION.md) - Migration from old setup

## 🤝 Contributing

1. Follow Docker best practices
2. Update documentation when adding features
3. Test both development and production setups
4. Ensure security requirements are met

## 📄 License

[Add your license information here]

---

For support and questions, please refer to the documentation files or create an issue in the repository.

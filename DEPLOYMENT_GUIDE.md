# Deployment Guide

This guide explains how to deploy the Agri-Spray application using the new unified Docker Compose setup.

## Quick Start

### 1. Environment Setup
```bash
# Copy the environment template
cp ENVIRONMENT_TEMPLATE.env .env

# Edit the .env file with your configuration
nano .env
```

### 2. Development Deployment
```bash
# Start all services in development mode
docker-compose up -d

# View logs
docker-compose logs -f

# Check service health
docker-compose ps
```

### 3. Production Deployment
```bash
# Start all services in production mode
docker-compose -f docker-compose.prod.yaml up -d

# View logs
docker-compose -f docker-compose.prod.yaml logs -f

# Check service health
docker-compose -f docker-compose.prod.yaml ps
```

## Service Access

### Development
- **Frontend**: http://localhost (through nginx)
- **API**: http://localhost/api (through nginx)
- **PgAdmin**: http://localhost:8081 (direct access)
- **Database**: Only accessible from API service

### Production
- **Frontend**: https://your-domain.com (through nginx with SSL)
- **API**: https://your-domain.com/api (through nginx with SSL)
- **Database**: Only accessible from API service
- **PgAdmin**: Not available (security measure)

## Migration from Old Setup

The new setup replaces the individual compose files in `api/` and `client/` directories. 

### Safe to Delete (After Testing)
```bash
# These files are now replaced by root-level compose files:
rm api/compose.yaml
rm api/compose.prod.yaml
rm api/compose.override.yaml
rm client/compose.yaml
rm client/compose.prod.yaml
```

### What Changed
1. **Unified configuration**: Single compose file manages all services
2. **Network security**: Proper network segmentation
3. **Nginx reverse proxy**: Single entry point for all requests
4. **Environment management**: Centralized environment variables
5. **Production optimizations**: Health checks, resource limits, monitoring

## Network Architecture

```
Internet
    ↓
[Nginx Reverse Proxy]
    ↓
┌─────────────────────────────────────┐
│        agri-spray-network           │
│  ┌────────┐    ┌────────┐          │
│  │ Client │    │  API   │          │
│  └────────┘    └───┬────┘          │
└─────────────────────┼───────────────┘
                      ↓
┌─────────────────────────────────────┐
│        backend-network              │
│  ┌────────┐    ┌──────────┐        │
│  │Database│    │ PgAdmin  │        │
│  └────────┘    │ (dev)    │        │
│                └──────────┘        │
└─────────────────────────────────────┘
```

## Key Benefits

1. **Security**: Client cannot directly access database
2. **Simplicity**: Single command deployment
3. **Scalability**: Easy to add more services
4. **Monitoring**: Built-in health checks
5. **Production Ready**: SSL, backups, resource limits

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 443, 8081 are available
2. **Network issues**: Run `docker network prune` if networks exist
3. **Volume permissions**: Ensure Docker has access to project directory

### Useful Commands

```bash
# Restart specific service
docker-compose restart api

# View service logs
docker-compose logs api

# Execute commands in running container
docker-compose exec api bash

# Rebuild specific service
docker-compose build --no-cache api

# Clean up everything
docker-compose down -v
docker system prune -a
```

### Health Checks

```bash
# Check nginx
curl -I http://localhost

# Check API health
curl http://localhost/api/health

# Check client
curl http://localhost

# Check database (from API container)
docker-compose exec api pg_isready -h database -U app
```

## Production Checklist

- [ ] Update all passwords and secrets in `.env`
- [ ] Configure SSL certificates in `nginx/ssl/`
- [ ] Set proper domain names in environment variables
- [ ] Configure firewall rules on host
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Test disaster recovery procedures
- [ ] Review security configurations
- [ ] Set up log rotation
- [ ] Configure container resource limits

## Maintenance

### Backup Database
```bash
# Manual backup
docker-compose exec database pg_dump -U app agri_spray > backup.sql

# Automated backups are included in production setup
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart services
docker-compose build --no-cache
docker-compose up -d

# Run database migrations
docker-compose exec api php bin/console doctrine:migrations:migrate --no-interaction
```

### Monitor Resources
```bash
# Check resource usage
docker stats

# Check logs
docker-compose logs --tail=100 -f
```

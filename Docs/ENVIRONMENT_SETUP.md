# Environment Setup Guide

This document provides instructions for setting up the environment variables for the Agri-Spray application.

## Quick Start

1. Copy the environment template:
```bash
cp ENVIRONMENT_TEMPLATE.env .env
```

2. Edit the `.env` file with your specific configuration values.

3. For development:
```bash
docker-compose up -d
```

4. For production:
```bash
docker-compose -f docker-compose.prod.yaml up -d
```

## Environment Variables

### General Configuration
- `APP_ENV`: Application environment (dev/prod)
- `APP_SECRET`: Secret key for Symfony (generate a secure random string for production)

### Server Configuration
- `SERVER_NAME`: Server names for Caddy (comma-separated)
  - Development: `localhost, api`
  - Production: `your-domain.com, api.your-domain.com`
- `HTTP_PORT`: HTTP port (default: 80)
- `HTTPS_PORT`: HTTPS port (default: 443)

### Database Configuration
- `POSTGRES_VERSION`: PostgreSQL version (default: 16)
- `POSTGRES_DB`: Database name (default: agri_spray)
- `POSTGRES_USER`: Database user (default: app)
- `POSTGRES_PASSWORD`: Database password (CHANGE IN PRODUCTION!)
- `DATABASE_URL`: Full database connection URL

### Mercure Configuration (Real-time features)
- `CADDY_MERCURE_JWT_SECRET`: JWT secret for Mercure hub
- `CADDY_MERCURE_URL`: Internal Mercure URL
- `MERCURE_PUBLIC_URL`: Public Mercure URL

### Client Configuration
- `CLIENT_API_BASE_URL`: API base URL for client communication

### Development Tools
- `PGADMIN_EMAIL`: PgAdmin login email
- `PGADMIN_PASSWORD`: PgAdmin login password
- `PGADMIN_PORT`: PgAdmin port (default: 8081)
- `XDEBUG_MODE`: Xdebug mode for PHP debugging

## Security Considerations

1. **Change default passwords** in production
2. **Generate secure secrets** for JWT tokens
3. **Use HTTPS** in production with proper SSL certificates
4. **Restrict database access** to backend services only
5. **Enable proper firewall rules** on your server

## Network Architecture

The application uses a secure network architecture:

- **Frontend Network (`agri-spray-network`)**: nginx, api, client
- **Backend Network (`backend-network`)**: api, database, pgadmin (dev), backup (prod)

The client cannot directly access the database or pgadmin services for security reasons.

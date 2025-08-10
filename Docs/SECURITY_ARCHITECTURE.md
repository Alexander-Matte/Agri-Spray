# Security Architecture

This document outlines the security architecture of the Agri-Spray application, ensuring proper isolation and access controls.

## Network Segmentation

### Frontend Network (`agri-spray-network`)
- **Purpose**: Handles public-facing traffic and inter-service communication
- **Services**: nginx, api, client
- **Access**: Internet-facing, handles user requests

### Backend Network (`backend-network`)
- **Purpose**: Handles internal database operations and administrative tasks
- **Services**: api, database, pgadmin (dev only), backup (prod only)
- **Access**: Internal only, no direct internet access to database

## Security Analysis

### ✅ Client Security
- **Client cannot access database directly**: Client is only on `agri-spray-network`, database is on `backend-network`
- **Client cannot access pgadmin directly**: PgAdmin is only on `backend-network`
- **All client-database communication**: Must go through API service which bridges both networks

### ✅ Database Security
- **No external ports exposed**: Database service has no port mappings to host
- **Network isolation**: Database only accessible from services on `backend-network`
- **API gateway pattern**: All database access goes through authenticated API endpoints

### ✅ API Security
- **Dual network access**: API bridges both networks but doesn't expose database ports
- **JWT authentication**: All API endpoints protected by JWT tokens
- **Rate limiting**: Nginx provides rate limiting for API endpoints
- **CORS protection**: Configured in Symfony for cross-origin requests

### ✅ PgAdmin Security
- **Development only**: PgAdmin is excluded from production compose
- **Limited access**: Only accessible via dedicated port (8081) in development
- **Not exposed through nginx**: PgAdmin doesn't go through the reverse proxy

## Access Patterns

### Allowed Paths
```
User → Nginx → Client (Frontend)
User → Nginx → API → Database
API → Database (Internal communication)
PgAdmin → Database (Development only, direct port access)
```

### Blocked Paths
```
❌ Client → Database (Direct access blocked by network segmentation)
❌ Client → PgAdmin (Direct access blocked by network segmentation)
❌ Internet → Database (No exposed ports)
❌ Internet → PgAdmin (Production: Not deployed, Development: Port access only)
```

## Production vs Development Differences

### Development
- PgAdmin service is available on port 8081
- Less restrictive rate limiting
- Debug headers enabled
- Source code mounting for hot reload

### Production
- PgAdmin service is completely removed
- Strict rate limiting and security headers
- SSL/TLS termination at nginx
- Automated backup service
- Health monitoring
- Resource limits on containers

## Security Recommendations

1. **Change Default Passwords**: Update all default passwords in production
2. **Use Strong Secrets**: Generate cryptographically secure JWT secrets
3. **Enable SSL**: Configure proper SSL certificates for production
4. **Monitor Access**: Review nginx access logs regularly
5. **Database Backups**: Automated backups are configured for production
6. **Firewall Rules**: Configure host firewall to only allow necessary ports
7. **Container Updates**: Regularly update container images for security patches

## Compliance Notes

- **Database isolation**: Ensures client cannot bypass API security
- **Audit trail**: Nginx logs all API requests
- **Access control**: JWT-based authentication on all API endpoints
- **Data encryption**: SSL/TLS in production, secure database connections

# Docker Setup Guide

This guide explains how to build and run the Pre-wedding Photography Portfolio application using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

## Project Structure

```
.
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── requirements.txt
│   └── server.py
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml
```

## Quick Start

### Using Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Backend only
   docker-compose logs -f backend
   
   # Frontend only
   docker-compose logs -f frontend
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

4. **Rebuild and restart:**
   ```bash
   docker-compose up -d --build
   ```

### Building Individual Services

#### Backend

```bash
# Build the image
cd backend
docker build -t prewedding-backend .

# Run the container
docker run -d \
  --name prewedding-backend \
  -p 8000:8000 \
  --env-file .env \
  prewedding-backend

# View logs
docker logs -f prewedding-backend
```

#### Frontend

```bash
# Build the image
cd frontend
docker build -t prewedding-frontend .

# Run the container
docker run -d \
  --name prewedding-frontend \
  -p 80:80 \
  prewedding-frontend

# View logs
docker logs -f prewedding-frontend
```

## Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
MONGO_URL=mongodb://your-mongo-url
DB_NAME=your-database-name
CORS_ORIGINS=http://localhost,http://localhost:80
```

### Frontend (.env)

Create a `.env` file in the `frontend/` directory if needed:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Accessing the Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:8000/api
- **Backend Health Check:** http://localhost:8000/api/
- **Frontend Health Check:** http://localhost/health

## Docker Commands Cheat Sheet

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop <container-name>

# Start a container
docker start <container-name>

# Remove a container
docker rm <container-name>

# Remove all stopped containers
docker container prune
```

### Image Management

```bash
# List images
docker images

# Remove an image
docker rmi <image-name>

# Remove unused images
docker image prune
```

### Logs and Debugging

```bash
# View container logs
docker logs <container-name>

# Follow logs in real-time
docker logs -f <container-name>

# Execute command in running container
docker exec -it <container-name> /bin/sh

# Inspect container
docker inspect <container-name>
```

## Production Deployment

### Backend

The backend Dockerfile includes:
- ✅ Multi-stage build optimization
- ✅ Non-root user for security
- ✅ Health checks
- ✅ Minimal base image (Python 3.11-slim)

### Frontend

The frontend Dockerfile includes:
- ✅ Multi-stage build (Node.js builder + Nginx runtime)
- ✅ Optimized nginx configuration
- ✅ Gzip compression
- ✅ Security headers
- ✅ Static asset caching
- ✅ SPA routing support

## Troubleshooting

### Backend won't start

1. Check MongoDB connection:
   ```bash
   docker logs prewedding-backend
   ```

2. Verify environment variables:
   ```bash
   docker exec prewedding-backend env
   ```

### Frontend shows blank page

1. Check nginx logs:
   ```bash
   docker logs prewedding-frontend
   ```

2. Verify build output:
   ```bash
   docker exec prewedding-frontend ls -la /usr/share/nginx/html
   ```

### Port already in use

```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

## Performance Optimization

### Reduce Image Size

```bash
# View image sizes
docker images

# Use dive to analyze layers
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive:latest <image-name>
```

### Build Cache

Docker uses layer caching. To maximize cache hits:
- Dependencies are copied and installed before application code
- Use `.dockerignore` to exclude unnecessary files

## Security Best Practices

✅ Non-root user in backend container  
✅ Minimal base images (alpine, slim)  
✅ Security headers in nginx  
✅ No secrets in Dockerfile  
✅ Health checks enabled  
✅ Resource limits (can be added in docker-compose.yml)

## Next Steps

- Set up CI/CD pipeline for automated builds
- Configure reverse proxy (Traefik, Nginx)
- Add SSL/TLS certificates
- Implement monitoring (Prometheus, Grafana)
- Set up log aggregation (ELK stack)

## Support

For issues or questions, please check the main README.md or create an issue in the repository.

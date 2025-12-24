# Environment Variables Guide

This document explains all environment variables needed for the Pre-wedding Photography Portfolio application.

---

## 🔧 Backend Environment Variables

### Location
Create a `.env` file in the `/backend` directory.

### Required Variables

| Variable | Description | Example | Notes |
|----------|-------------|---------|-------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017` | **Required**. Can be local or cloud (MongoDB Atlas) |
| `DB_NAME` | Database name | `prewedding_portfolio` | **Required**. Name of the database to use |
| `CORS_ORIGINS` | Allowed CORS origins | `*` or `http://localhost:3000,https://yourdomain.com` | **Required**. Use `*` for dev, specific domains for production |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | `8000` | `8000` |
| `HOST` | Server host | `0.0.0.0` | `0.0.0.0` |
| `ENV` | Environment name | `development` | `production` |

### Backend `.env` Example

```env
# Required
MONGO_URL=mongodb://localhost:27017
DB_NAME=prewedding_portfolio
CORS_ORIGINS=*

# Optional
# PORT=8000
# HOST=0.0.0.0
# ENV=production
```

### For Docker

When using Docker, you can pass environment variables in three ways:

#### 1. Using `.env` file (Recommended)
```bash
docker run -d \
  --name prewedding-backend \
  -p 8000:8000 \
  --env-file backend/.env \
  prewedding-backend
```

#### 2. Using `-e` flags
```bash
docker run -d \
  --name prewedding-backend \
  -p 8000:8000 \
  -e MONGO_URL=mongodb://localhost:27017 \
  -e DB_NAME=prewedding_portfolio \
  -e CORS_ORIGINS=* \
  prewedding-backend
```

#### 3. Using docker-compose.yml
Already configured in `docker-compose.yml`:
```yaml
environment:
  - MONGO_URL=${MONGO_URL}
  - DB_NAME=${DB_NAME}
  - CORS_ORIGINS=${CORS_ORIGINS:-*}
env_file:
  - ./backend/.env
```

---

## 🎨 Frontend Environment Variables

### Location
Create a `.env` file in the `/frontend` directory.

### Required Variables

| Variable | Description | Example | Notes |
|----------|-------------|---------|-------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `http://localhost:8000` | **Required**. Must NOT have trailing slash |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `WDS_SOCKET_PORT` | WebSocket port for hot reload | `auto` | `443` (only needed for HTTPS dev) |
| `ENABLE_HEALTH_CHECK` | Enable health checks | `true` | `false` |
| `GENERATE_SOURCEMAP` | Generate source maps | `true` | `false` (for production) |
| `INLINE_RUNTIME_CHUNK` | Inline runtime chunk | `true` | `false` |

### Frontend `.env` Example

#### Development
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

#### Production
```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
GENERATE_SOURCEMAP=false
```

### For Docker

**Important**: For the frontend, environment variables must be set at **build time** (not runtime) because Create React App embeds them during the build process.

#### Option 1: Build with `.env` file
```bash
cd frontend
docker build -t prewedding-frontend .
```
The `.env` file will be automatically read during build.

#### Option 2: Build with build args
```bash
docker build \
  --build-arg REACT_APP_BACKEND_URL=https://api.yourdomain.com \
  -t prewedding-frontend \
  ./frontend
```

To use build args, update the frontend Dockerfile:
```dockerfile
# Add after FROM node:18-alpine AS builder
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
```

#### Option 3: Using docker-compose
Update `docker-compose.yml`:
```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      - REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL:-http://localhost:8000}
```

---

## 🚀 Quick Setup Guide

### Development (Local)

1. **Backend Setup:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your values
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start Services:**
   ```bash
   # Backend
   cd backend
   uvicorn server:app --reload
   
   # Frontend (in another terminal)
   cd frontend
   yarn start
   ```

### Production (Docker)

1. **Create environment files:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with production values
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with production values
   ```

2. **Update values:**
   ```env
   # backend/.env
   MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
   DB_NAME=prewedding_production
   CORS_ORIGINS=https://yourdomain.com
   
   # frontend/.env
   REACT_APP_BACKEND_URL=https://api.yourdomain.com
   GENERATE_SOURCEMAP=false
   ```

3. **Build and run:**
   ```bash
   docker-compose up -d --build
   ```

---

## 🔒 Security Best Practices

### ✅ DO:
- Use `.env` files for local development
- Add `.env` to `.gitignore` (already done)
- Use environment-specific values (dev vs production)
- Use strong MongoDB credentials in production
- Restrict CORS origins in production
- Use HTTPS URLs in production

### ❌ DON'T:
- Commit `.env` files to git
- Use `CORS_ORIGINS=*` in production
- Hardcode sensitive values in code
- Share `.env` files publicly
- Use development credentials in production

---

## 📝 Environment Variable Checklist

### Before Running Locally:
- [ ] Created `backend/.env` with MongoDB URL
- [ ] Created `frontend/.env` with backend URL
- [ ] MongoDB is running and accessible
- [ ] Backend URL in frontend matches backend port

### Before Docker Build:
- [ ] Backend `.env` exists with correct values
- [ ] Frontend `.env` exists with correct values
- [ ] CORS_ORIGINS includes frontend domain
- [ ] MongoDB URL is accessible from Docker container

### Before Production Deployment:
- [ ] Changed MongoDB URL to production database
- [ ] Updated CORS_ORIGINS to production domain(s)
- [ ] Updated REACT_APP_BACKEND_URL to production API
- [ ] Disabled source maps (`GENERATE_SOURCEMAP=false`)
- [ ] Using HTTPS for all URLs
- [ ] Tested all environment variables

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `KeyError: 'MONGO_URL'`
- **Solution**: Ensure `MONGO_URL` is set in `backend/.env`

**Problem**: CORS errors in browser
- **Solution**: Add frontend URL to `CORS_ORIGINS`
  ```env
  CORS_ORIGINS=http://localhost:3000,http://localhost
  ```

**Problem**: Can't connect to MongoDB
- **Solution**: Check MongoDB is running and URL is correct
  ```bash
  # Test connection
  mongosh "mongodb://localhost:27017"
  ```

### Frontend Issues

**Problem**: API calls fail with 404
- **Solution**: Check `REACT_APP_BACKEND_URL` is correct
  ```env
  REACT_APP_BACKEND_URL=http://localhost:8000
  ```
  Note: No `/api` suffix needed

**Problem**: Environment variables are `undefined`
- **Solution**: 
  1. Ensure variable starts with `REACT_APP_`
  2. Restart development server after changing `.env`
  3. For Docker, rebuild the image

**Problem**: Changes to `.env` not reflected
- **Solution**: 
  - Local: Restart `yarn start`
  - Docker: Rebuild image with `docker-compose up -d --build`

---

## 📚 Additional Resources

- [FastAPI Environment Variables](https://fastapi.tiangolo.com/advanced/settings/)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [MongoDB Connection Strings](https://www.mongodb.com/docs/manual/reference/connection-string/)

---

## 💡 Tips

1. **Use different databases for dev/prod**: 
   - Dev: `prewedding_dev`
   - Prod: `prewedding_production`

2. **Frontend API URL should match your setup**:
   - Local dev: `http://localhost:8000`
   - Docker: `http://backend:8000` (if using docker network)
   - Production: `https://api.yourdomain.com`

3. **For MongoDB Atlas** (cloud):
   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Test environment variables**:
   ```bash
   # Backend
   docker exec prewedding-backend env | grep MONGO
   
   # Frontend (check build output)
   docker exec prewedding-frontend cat /usr/share/nginx/html/static/js/main.*.js | grep REACT_APP
   ```

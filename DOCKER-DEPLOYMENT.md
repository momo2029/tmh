# Docker Deployment Guide for TokenMaxHub

## 🚀 Quick Start (Local Testing)

### Option 1: Simple Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Access your site
open http://localhost:3000
```

### Option 2: Full Stack with Nginx
```bash
# Use the full stack configuration
docker-compose -f docker-compose.yml up -d --build

# Access via nginx proxy
open http://localhost
```

## 🌐 Production Deployment

### Method 1: Direct Docker Run
```bash
# Pull or build image
docker build -t tokenmaxhub:latest .

# Run container
docker run -d \
  --name tokenmaxhub \
  -p 3000:3000 \
  --restart unless-stopped \
  tokenmaxhub:latest
```

### Method 2: Docker Compose (Recommended)
```bash
# Copy all files to production server
scp -r ./* user@your-server:/path/to/tokenmaxhub/

# SSH into server and run
cd /path/to/tokenmaxhub
docker-compose -f docker-compose.prod.yml up -d --build
```

### Method 3: Kubernetes (Advanced)
Create `deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tokenmaxhub
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tokenmaxhub
  template:
    metadata:
      labels:
        app: tokenmaxhub
    spec:
      containers:
      - name: tokenmaxhub
        image: tokenmaxhub:latest
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: tokenmaxhub-service
spec:
  selector:
    app: tokenmaxhub
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

## 🔧 Configuration Options

### Environment Variables
```bash
# Customize deployment with environment variables
docker run -e NODE_ENV=production -e PORT=8080 tokenmaxhub:latest
```

### Volume Mounts
```bash
# Persist logs
docker run -v ./logs:/usr/src/app/logs tokenmaxhub:latest

# Custom nginx config
docker run -v ./custom-nginx.conf:/etc/nginx/nginx.conf tokenmaxhub:latest
```

## 📊 Monitoring & Management

### Health Checks
The application includes automatic health monitoring:
- **Interval**: 30 seconds
- **Timeout**: 3 seconds  
- **Retries**: 3 attempts
- **Start Period**: 5 seconds

### View Logs
```bash
# Docker Compose
docker-compose logs -f

# Single container
docker logs -f tokenmaxhub

# Real-time monitoring
docker stats tokenmaxhub
```

### Update Deployment
```bash
# Rebuild and restart
docker-compose down && docker-compose up -d --build

# Or pull latest changes
git pull origin main
docker-compose down && docker-compose up -d --build
```

## 🔒 Security Best Practices

### HTTPS Setup
```bash
# Generate self-signed certificate (for testing)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem

# Then uncomment SSL sections in nginx.conf
```

### Production Security
- ✅ Uses official Node.js Alpine base image (minimal size)
- ✅ Non-root user execution
- ✅ Health checks for automatic recovery
- ✅ Reverse proxy with security headers
- ✅ Gzip compression enabled
- ✅ Rate limiting configured

## 🐳 Docker Commands Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start services in background |
| `docker-compose down` | Stop and remove services |
| `docker-compose logs -f` | View real-time logs |
| `docker ps` | List running containers |
| `docker images` | List available images |
| `docker system prune` | Clean unused resources |

## 🌐 Domain Configuration

After deployment, configure DNS to point to your server:

```dns
; A Record
tokenmaxhub.com.    IN  A   YOUR_SERVER_IP

; www subdomain (optional)
www.tokenmaxhub.com.  IN  CNAME   tokenmaxhub.com.
```

## 📈 Performance Tuning

### Memory Limits
```bash
# Limit container memory usage
docker run --memory="512m" --memory-swap="1g" tokenmaxhub:latest
```

### CPU Limits
```bash
# Limit CPU usage
docker run --cpus="1.0" tokenmaxhub:latest
```

## 🆘 Troubleshooting

**Common Issues:**

1. **Port already in use**
   ```bash
   # Find and stop conflicting process
   sudo lsof -i :3000
   sudo kill -9 PID
   ```

2. **Permission denied on volumes**
   ```bash
   # Fix directory permissions
   chmod 755 logs ssl
   ```

3. **Nginx not starting**
   ```bash
   # Check nginx config
   docker exec tokenmaxhub-nginx nginx -t
   ```

4. **Container exits immediately**
   ```bash
   # Check application logs
   docker logs tokenmaxhub
   ```

## 🎯 Expected Outcome

Your Docker deployment will provide:
- ✅ Isolated, portable environment
- ✅ Automatic health monitoring
- ✅ Easy scaling and updates
- ✅ Professional reverse proxy setup
- ✅ Production-ready security
- ✅ Global accessibility via domain

**URL**: https://tokenmaxhub.com (after DNS propagation)
**Status**: ✅ Production Ready with Docker

---

🚀 **Docker deployment complete!** Your TokenMaxHub is now containerized and ready for any infrastructure.
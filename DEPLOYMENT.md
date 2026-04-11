# TokenMaxHub Deployment Guide

## Quick Deploy to Fly.io

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   ~/.fly/bin/fly auth login
   ```

3. **Deploy the application**
   ```bash
   ./deploy.sh
   ```

4. **Set up custom domain (optional)**
   ```bash
   ~/.fly/bin/fly domains add tokenmaxhub.com
   ~/.fly/bin/fly certs enable
   ```

## Manual Deployment

### Option 1: Using Fly.io
```bash
# Create app
~/.fly/bin/fly apps create tokenmaxhub

# Deploy
~/.fly/bin/fly deploy
```

### Option 2: Using Docker
```bash
# Build and run locally
docker build -t tokenmaxhub .
docker run -p 3000:3000 tokenmaxhub

# Or deploy to any cloud provider
docker push your-registry/tokenmaxhub:latest
```

### Option 3: Static Hosting
```bash
# Serve with nginx
nginx -c nginx.conf

# Or use any static hosting service
# - Netlify
# - Vercel  
# - GitHub Pages
# - AWS S3 + CloudFront
```

## Configuration

The site is configured in `fly.toml` for automatic deployment on Fly.io. Key settings:

- **Region**: SJC (Silicon Valley)
- **Port**: 8080 (Fly.io default)
- **Auto SSL**: Enabled
- **Health Checks**: Configured

## Environment Variables

No environment variables needed for this static site. All configuration is baked into the HTML.

## Custom Domain Setup

1. Point DNS to Fly.io:
   ```
   A Record: @ -> 76.76.21.21
   CNAME: www -> tokenmaxhub.fly.dev
   ```

2. Enable SSL:
   ```bash
   ~/.fly/bin/fly certs enable
   ```

## Monitoring

After deployment, monitor your site at:
- https://tokenmaxhub.fly.dev (default Fly.io URL)
- https://tokenmaxhub.com (custom domain)

## Troubleshooting

**Common Issues:**

1. **Domain not resolving**
   - Wait up to 48 hours for DNS propagation
   - Check DNS settings with `dig tokenmaxhub.com`

2. **SSL certificate issues**
   - Ensure domain is properly configured
   - Run `fly certs list` to check status

3. **Server errors**
   - Check logs: `fly logs`
   - Restart app: `fly restart`

## Performance

- **Static files**: Served directly from CDN
- **Global edge locations**: Automatic by Fly.io
- **Caching**: Browser and CDN caching enabled
- **Compression**: Gzip compression enabled

## Security

- HTTPS enforced automatically
- No sensitive data exposed
- Content Security Policy included
- No external dependencies that could be compromised

## Cost

- Free tier available on Fly.io
- Pay only for resources used
- No hidden costs or surprises
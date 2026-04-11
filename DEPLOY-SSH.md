# Direct SSH Deployment Guide

## Prerequisites

Your server should have:
- ✅ Web server (Nginx/Apache) configured for tokenmaxhub.com
- ✅ Domain DNS pointing to server IP
- ✅ SSH access enabled
- ✅ Node.js installed (or we'll install it)

## Quick Deploy

1. **Update server details** in `deploy-to-server.sh`:
   ```bash
   # Edit the file and change these values:
   SERVER_USER="your-server-username"
   SERVER_PATH="/var/www/tokenmaxhub"
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy-to-server.sh
   ```

## Manual Deployment (if script doesn't work)

### Step 1: Connect to your server
```bash
ssh your-username@tokenmaxhub.com
```

### Step 2: Create project directory
```bash
sudo mkdir -p /var/www/tokenmaxhub
cd /var/www/tokenmaxhub
```

### Step 3: Install Node.js (if needed)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

### Step 4: Upload files from your local machine
```bash
# From your local computer:
scp -r * your-username@tokenmaxhub.com:/var/www/tokenmaxhub/
```

### Step 5: Install dependencies and start server
```bash
cd /var/www/tokenmaxhub
npm install
npm start
```

### Step 6: Set up as system service (optional but recommended)

Create `/etc/systemd/system/tokenmaxhub.service`:
```ini
[Unit]
Description=TokenMaxHub Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/tokenmaxhub
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable the service:
```bash
sudo systemctl enable tokenmaxhub
sudo systemctl start tokenmaxhub
```

## Configure Reverse Proxy

If using Nginx, add this to `/etc/nginx/sites-available/tokenmaxhub`:
```nginx
server {
    listen 80;
    server_name tokenmaxhub.com www.tokenmaxhub.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then:
```bash
sudo ln -s /etc/nginx/sites-available/tokenmaxhub /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## Verify Deployment

```bash
# Check if server is running
curl http://localhost:3000

# View logs
pm2 logs tokenmaxhub  # If using PM2
journalctl -u tokenmaxhub  # If using systemd

# Test your domain
curl https://tokenmaxhub.com
```

## Troubleshooting

**Common Issues:**

1. **Port 3000 not accessible**
   - Check firewall: `sudo ufw allow 3000`
   - Check if process is running: `ps aux | grep node`

2. **Domain not resolving**
   - Wait up to 48 hours for DNS propagation
   - Check DNS: `dig tokenmaxhub.com`

3. **Permission denied**
   - Ensure proper permissions: `chown -R www-data:www-data /var/www/tokenmaxhub`

4. **Node.js not found**
   - Reinstall Node.js using the installation command above

## Update Process

To update your site later:
1. Make changes locally
2. Run the deployment script again
3. Or manually upload files via scp

Your site will be live at: **https://tokenmaxhub.com**
#!/bin/bash

# Configuration - Update these values with your server details
SERVER_HOST="tokenmaxhub.com"
SERVER_USER="your-username"  # Change this to your actual username
SERVER_PATH="/var/www/tokenmaxhub"  # Change this to your web directory path

echo "🚀 Deploying TokenMaxHub to your server..."
echo "📡 Server: $SERVER_HOST"

# Check if we have SSH access
if ! ssh -o ConnectTimeout=5 "$SERVER_USER@$SERVER_HOST" exit 2>/dev/null; then
    echo "❌ Cannot connect to server. Please check:"
    echo "   1. Server IP/domain: $SERVER_HOST"
    echo "   2. Username: $SERVER_USER"
    echo "   3. SSH key permissions"
    exit 1
fi

echo "✅ Connected to server successfully!"

# Create server directory structure
ssh "$SERVER_USER@$SERVER_HOST" "
    mkdir -p $SERVER_PATH
    cd $SERVER_PATH
    rm -rf *
"

# Upload files using rsync (most efficient)
echo "📤 Uploading files..."
rsync -avz --delete \
    --exclude='.git*' \
    --exclude='node_modules' \
    ./ \
    "$SERVER_USER@$SERVER_HOST:$SERVER_PATH"

if [ $? -eq 0 ]; then
    echo "✅ Files uploaded successfully!"
else
    echo "❌ Error uploading files"
    exit 1
fi

# Configure web server on server side
ssh "$SERVER_USER@$SERVER_HOST" "
    cd $SERVER_PATH

    # Install Node.js server if not present
    if ! command -v node &> /dev/null; then
        echo 'Installing Node.js...'
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi

    # Install PM2 for process management (optional but recommended)
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi

    # Start the server
    pm2 start server.js --name tokenmaxhub || pm2 start server.js --name tokenmaxhub

    # Save PM2 config to auto-start on reboot
    pm2 save

    # Setup nginx reverse proxy (if nginx is installed)
    if command -v nginx &> /dev/null; then
        echo 'Setting up nginx reverse proxy...'
        cat > /tmp/nginx.conf << 'EOF'
server {
    listen 80;
    server_name tokenmaxhub.com www.tokenmaxhub.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
        sudo mv /tmp/nginx.conf /etc/nginx/sites-available/tokenmaxhub
        sudo ln -sf /etc/nginx/sites-available/tokenmaxhub /etc/nginx/sites-enabled/
        sudo nginx -t && sudo systemctl reload nginx
    fi
"

echo ""
echo "🎉 Deployment completed successfully!"
echo "🌐 Your site should be available at: https://tokenmaxhub.com"
echo ""
echo "🔧 Next steps:"
echo "   1. Test your site: https://tokenmaxhub.com"
echo "   2. Check server logs: pm2 logs tokenmaxhub"
echo "   3. Restart server: pm2 restart tokenmaxhub"
echo ""
echo "💡 To update in the future, run this script again."
#!/bin/bash

echo "🚀 Deploying TokenMaxHub to Fly.io..."

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI not found. Installing..."
    curl -L https://fly.io/install.sh | sh
fi

# Login to Fly (will prompt for token)
echo "🔑 Please login to Fly.io"
~/.fly/bin/fly auth login

# Create app if it doesn't exist
if ! ~/.fly/bin/fly status --app tokenmaxhub 2>/dev/null; then
    echo "📦 Creating new app on Fly.io..."
    ~/.fly/bin/fly apps create tokenmaxhub
fi

# Deploy the application
echo "🚢 Deploying..."
~/.fly/bin/fly deploy

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site should be available at: https://tokenmaxhub.fly.dev"
echo ""
echo "💡 To set a custom domain:"
echo "   ~/.fly/bin/fly domains add tokenmaxhub.com"
echo "   ~/.fly/bin/fly certs enable"
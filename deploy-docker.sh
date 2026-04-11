#!/bin/bash

echo "🐳 Deploying TokenMaxHub with Docker"
echo "===================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "✅ Docker installed. Please restart your terminal and run this script again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create necessary directories
mkdir -p ssl logs

# Option 1: Simple single-container deployment
echo "Choose deployment option:"
echo "1) Simple (just the app)"
echo "2) Full stack (app + nginx reverse proxy)"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo "🚀 Starting simple deployment..."
        docker-compose up -d --build
        ;;
    2)
        echo "🚀 Starting full stack deployment..."
        docker-compose -f docker-compose.yml up -d --build
        ;;
    *)
        echo "Invalid choice. Using simple deployment."
        docker-compose up -d --build
        ;;
esac

echo ""
echo "✅ Deployment started!"
echo ""
echo "🌐 Access your site at:"
echo "   http://localhost:3000 (direct)"
echo "   http://localhost (via nginx)"
echo ""
echo "🔧 Management commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop: docker-compose down"
echo "   Restart: docker-compose restart"
echo "   Update: docker-compose pull && docker-compose up -d"
echo ""
echo "💡 To deploy to production server, copy these files to your server and run:"
echo "   docker-compose up -d"
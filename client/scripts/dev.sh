#!/bin/bash

# Agri-Spray Client Development Script

echo "🚁 Starting Agri-Spray Client Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if the agri-spray-network exists, create if not
if ! docker network ls | grep -q "agri-spray-network"; then
    echo "🌐 Creating agri-spray-network..."
    docker network create agri-spray-network
fi

# Clean up any existing containers but keep the network
echo "🧹 Cleaning up existing containers..."
docker-compose down --remove-orphans

# Check if API is running
echo "🔍 Checking if API backend is running..."
if ! curl -s http://localhost:8080/api > /dev/null 2>&1; then
    echo "⚠️  API backend is not running on http://localhost:8080"
    echo "   Please start the API first:"
    echo "   cd ../api && docker-compose up -d"
    echo ""
    echo "   Or start both together:"
    echo "   cd .. && docker-compose -f api/compose.yaml -f client/docker-compose.yml up -d"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ API backend is running"
fi

# Build and start the client with no cache
echo "🔨 Building client container with no cache..."
docker-compose build --no-cache

echo "🚀 Starting client development server..."
docker-compose up

echo "✅ Client is running at http://localhost:3000"
echo "📱 API is expected at http://localhost:8080/api" 
#!/bin/bash

# JSpotlight Pre-Flight Checklist
# Run this script to verify everything is set up correctly

echo "🔍 JSpotlight Pre-Flight Checklist"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track status
ERRORS=0
WARNINGS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
    else
        echo -e "${RED}❌${NC} $1 - MISSING"
        ERRORS=$((ERRORS + 1))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/"
    else
        echo -e "${RED}❌${NC} $1/ - MISSING"
        ERRORS=$((ERRORS + 1))
    fi
}

# Function to check command exists
check_command() {
    if command -v $1 &> /dev/null; then
        VERSION=$($1 --version 2>&1 | head -n 1)
        echo -e "${GREEN}✅${NC} $1 ($VERSION)"
    else
        echo -e "${YELLOW}⚠️${NC}  $1 - NOT INSTALLED"
        WARNINGS=$((WARNINGS + 1))
    fi
}

echo "📦 Checking Prerequisites..."
echo "----------------------------"
check_command java
check_command mvn
check_command node
check_command npm
check_command python3
check_command docker
check_command docker-compose
echo ""

echo "🗂️  Checking Backend Files..."
echo "----------------------------"
check_file "pom.xml"
check_file "Dockerfile"
check_file "src/main/java/com/project/JSpotlight/JSpotlightApplication.java"
check_file "src/main/java/com/project/JSpotlight/Photo.java"
check_file "src/main/java/com/project/JSpotlight/PhotoRepository.java"
check_file "src/main/java/com/project/JSpotlight/ResponseController.java"
check_file "src/main/java/com/project/JSpotlight/ImageTaggingService.java"
check_file "src/main/java/com/project/JSpotlight/AuthController.java"
check_file "src/main/java/com/project/JSpotlight/JWTFilter.java"
check_file "src/main/java/com/project/JSpotlight/SecurityConfig.java"
check_file "src/main/java/com/project/JSpotlight/WebConfig.java"
check_file "src/main/resources/application.properties"
echo ""

echo "⚛️  Checking Frontend Files..."
echo "----------------------------"
check_dir "frontend"
check_file "frontend/package.json"
check_file "frontend/Dockerfile"
check_file "frontend/public/index.html"
check_file "frontend/src/index.js"
check_file "frontend/src/App.js"
check_file "frontend/src/Login.js"
check_file "frontend/src/PhotoUpload.js"
check_file "frontend/src/PhotoGallery.js"
echo ""

echo "🤖 Checking AI Service Files..."
echo "----------------------------"
check_dir "ai-service"
check_file "ai-service/app.py"
check_file "ai-service/requirements.txt"
check_file "ai-service/Dockerfile"
check_file "ai-service/imagenet_classes.txt"
echo ""

echo "🐳 Checking Docker Files..."
echo "----------------------------"
check_file "docker-compose.yml"
check_file "docker-compose.prod.yml"
check_file ".dockerignore"
echo ""

echo "📚 Checking Documentation..."
echo "----------------------------"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "DEVELOPMENT.md"
check_file "IMPLEMENTATION_SUMMARY.md"
check_file ".env.example"
echo ""

echo "🔧 Checking Configuration..."
echo "----------------------------"

# Check if JWT secret is configured
if grep -q "jwt.secret=" src/main/resources/application.properties; then
    echo -e "${GREEN}✅${NC} JWT secret configured"
else
    echo -e "${RED}❌${NC} JWT secret not configured"
    ERRORS=$((ERRORS + 1))
fi

# Check if AI service URL is configured
if grep -q "ai.service.url=" src/main/resources/application.properties; then
    echo -e "${GREEN}✅${NC} AI service URL configured"
else
    echo -e "${RED}❌${NC} AI service URL not configured"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# Check port availability
echo "🔌 Checking Port Availability..."
echo "----------------------------"
for PORT in 3000 5000 8080; do
    if ! lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅${NC} Port $PORT is available"
    else
        echo -e "${YELLOW}⚠️${NC}  Port $PORT is in use (you'll need to stop the process)"
        WARNINGS=$((WARNINGS + 1))
    fi
done
echo ""

# Summary
echo "=================================="
echo "📊 Pre-Flight Check Summary"
echo "=================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! You're ready to go!${NC}"
    echo ""
    echo "🚀 To start the application:"
    echo "   Option 1: ./start.sh"
    echo "   Option 2: docker-compose up --build"
    echo ""
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    echo "You can proceed, but review the warnings above."
    echo ""
else
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
    echo ""
    echo "Please fix the errors before proceeding."
    exit 1
fi

exit 0

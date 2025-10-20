#!/bin/bash

# JSpotlight Startup Script
# This script starts all services in the correct order

set -e

echo "🚀 Starting JSpotlight Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${RED}❌ Port $1 is already in use${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $1 is available${NC}"
        return 0
    fi
}

# Check prerequisites
echo "📋 Checking prerequisites..."
command -v java >/dev/null 2>&1 || { echo -e "${RED}❌ Java is not installed${NC}" >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo -e "${RED}❌ Python3 is not installed${NC}" >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ Node.js is not installed${NC}" >&2; exit 1; }
echo -e "${GREEN}✅ All prerequisites installed${NC}"
echo ""

# Check ports
echo "🔍 Checking ports..."
check_port 5000 || exit 1
check_port 8080 || exit 1
check_port 3000 || exit 1
echo ""

# Create uploads directory
mkdir -p uploads
echo -e "${GREEN}✅ Created uploads directory${NC}"
echo ""

# Start AI Service
echo -e "${BLUE}🤖 Starting AI Service...${NC}"
cd ai-service
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || true
pip install -q -r requirements.txt
python3 app.py &
AI_PID=$!
cd ..
echo -e "${GREEN}✅ AI Service started (PID: $AI_PID)${NC}"
sleep 5
echo ""

# Build and start Backend
echo -e "${BLUE}☕ Building and starting Backend...${NC}"
mvn clean package -DskipTests -q
java -jar target/JSpotlight-*.jar &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
sleep 10
echo ""

# Start Frontend
echo -e "${BLUE}⚛️  Starting Frontend...${NC}"
cd frontend
npm install --silent 2>/dev/null
BROWSER=none npm start &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 JSpotlight is running!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Frontend:    http://localhost:3000"
echo "🔧 Backend:     http://localhost:8080"
echo "🤖 AI Service:  http://localhost:5000"
echo "💾 H2 Console:  http://localhost:8080/h2-console"
echo ""
echo "🔐 Login credentials:"
echo "   Username: user"
echo "   Password: pass"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Save PIDs to file for cleanup
echo "$AI_PID" > .pids
echo "$BACKEND_PID" >> .pids
echo "$FRONTEND_PID" >> .pids

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping services...'; kill $AI_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null; rm -f .pids; echo '✅ All services stopped'; exit 0" INT TERM

# Keep script running
wait

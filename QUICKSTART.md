# 🚀 Quick Start Guide

## Fastest Way to Get Started

### Using Docker (Easiest - 1 Command!)

```bash
docker-compose up --build
```

Then open http://localhost:3000 in your browser!

**Login with:**
- Username: `user`
- Password: `pass`

---

## Running Locally (3 Steps)

### Step 1: Start AI Service (Terminal 1)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

### Step 2: Start Backend (Terminal 2)
```bash
mvn clean package -DskipTests
java -jar target/JSpotlight-*.jar
```

### Step 3: Start Frontend (Terminal 3)
```bash
cd frontend
npm install
npm start
```

Your browser will automatically open to http://localhost:3000

---

## Using the Startup Script (Automated)

```bash
./start.sh
```

This will start all three services automatically!

---

## What's Running?

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React UI |
| Backend | http://localhost:8080 | Spring Boot API |
| AI Service | http://localhost:5000 | Image Recognition |
| H2 Console | http://localhost:8080/h2-console | Database UI |

---

## First Time Using the App?

1. **Login** with `user` / `pass`
2. **Upload** a photo using the upload form
3. **Watch** as AI automatically tags your image!
4. **View** your photo gallery with AI-generated tags
5. **Delete** photos you don't want

---

## Troubleshooting

### Port Already in Use?

Check what's using the ports:
```bash
lsof -i :3000  # Frontend
lsof -i :8080  # Backend
lsof -i :5000  # AI Service
```

Kill the process:
```bash
kill -9 <PID>
```

### AI Service Not Working?

Make sure PyTorch is installed:
```bash
pip install torch torchvision
```

### Frontend Not Connecting to Backend?

Check that CORS is enabled and the proxy is set correctly in `frontend/package.json`

---

## Next Steps

- Read [README.md](README.md) for full documentation
- Read [DEVELOPMENT.md](DEVELOPMENT.md) for development guide
- Upload your photos and try the AI tagging!

---

**Enjoy using JSpotlight! 📸✨**

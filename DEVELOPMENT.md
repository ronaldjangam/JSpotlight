# JSpotlight Development Guide

## 🛠️ Development Setup

### Local Development

#### 1. AI Service Development

```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The AI service will hot-reload on file changes if you use:
```bash
FLASK_ENV=development python app.py
```

#### 2. Backend Development

```bash
# Run with Maven (hot-reload with spring-boot-devtools)
mvn spring-boot:run

# Or build and run JAR
mvn clean package -DskipTests
java -jar target/JSpotlight-*.jar
```

Access H2 Console at: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

#### 3. Frontend Development

```bash
cd frontend
npm install
npm start
```

The React app will hot-reload on file changes at http://localhost:3000

### Docker Development

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build
```

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=JSpotlightApplicationTests

# Skip tests during build
mvn clean package -DskipTests
```

### API Testing with cURL

```bash
# Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Get token from response, then:
TOKEN="your-jwt-token-here"

# Get all photos
curl -X GET http://localhost:8080/photos \
  -H "Authorization: Bearer $TOKEN"

# Upload photo
curl -X POST http://localhost:8080/photos/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/image.jpg"

# Delete photo
curl -X DELETE http://localhost:8080/photos/1 \
  -H "Authorization: Bearer $TOKEN"
```

### Testing AI Service

```bash
# Health check
curl http://localhost:5000/health

# Predict tags
curl -X POST http://localhost:5000/predict \
  --data-binary "@/path/to/image.jpg" \
  -H "Content-Type: application/octet-stream"
```

## 📊 Monitoring

### Backend Monitoring

Spring Boot Actuator endpoints (if enabled):
- Health: http://localhost:8080/actuator/health
- Metrics: http://localhost:8080/actuator/metrics

### AI Service Monitoring

- Health: http://localhost:5000/health
- Check logs for model loading and prediction times

## 🐛 Debugging

### Backend Debugging

1. Enable debug logging in `application.properties`:
```properties
logging.level.com.project.JSpotlight=DEBUG
logging.level.org.springframework.web=DEBUG
```

2. Run with debug port:
```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
  -jar target/JSpotlight-*.jar
```

3. Attach your IDE debugger to port 5005

### Frontend Debugging

- Use React DevTools browser extension
- Check browser console for errors
- Enable verbose logging:
```javascript
localStorage.setItem('debug', '*');
```

### Docker Debugging

```bash
# Check container logs
docker-compose logs backend
docker-compose logs ai-service
docker-compose logs frontend

# Execute commands in container
docker-compose exec backend bash
docker-compose exec ai-service sh

# Check container resource usage
docker stats
```

## 🔄 Hot Reload Setup

### Backend (Spring Boot DevTools)

Already configured in `pom.xml`. Just run:
```bash
mvn spring-boot:run
```

### Frontend (React)

Hot reload is enabled by default with `npm start`

### AI Service (Flask)

```bash
export FLASK_ENV=development
flask run --reload
```

## 📦 Building for Production

### Backend

```bash
mvn clean package -DskipTests
# JAR will be in target/JSpotlight-*.jar
```

### Frontend

```bash
cd frontend
npm run build
# Optimized build will be in build/
```

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Use environment-specific compose file
docker-compose -f docker-compose.prod.yml up -d
```

## 🔐 Security Considerations

### For Production:

1. **Change JWT Secret**
   ```properties
   jwt.secret=your-very-long-and-random-secret-key-here
   ```

2. **Use Real Database**
   Replace H2 with PostgreSQL or MySQL:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/jspotlight
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

3. **Enable HTTPS**
   ```properties
   server.ssl.enabled=true
   server.ssl.key-store=classpath:keystore.p12
   server.ssl.key-store-password=your-password
   ```

4. **Implement User Registration**
   Replace hardcoded credentials with database-backed users

5. **Add Rate Limiting**
   Prevent abuse of API endpoints

## 🚀 Deployment

### Deploy to Cloud

#### Heroku
```bash
# Backend
heroku create jspotlight-backend
git push heroku main

# Frontend
cd frontend
heroku create jspotlight-frontend
heroku buildpacks:set mars/create-react-app
git push heroku main
```

#### AWS/Azure/GCP
Use the Dockerfile and docker-compose.yml as base for container orchestration

### Environment Variables

Set these in production:
```bash
JWT_SECRET=your-secret
AI_SERVICE_URL=http://ai-service:5000/predict
SPRING_DATASOURCE_URL=jdbc:postgresql://...
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...
```

## 📝 Code Style

### Java
- Follow Google Java Style Guide
- Use meaningful variable names
- Add Javadoc comments for public methods

### JavaScript/React
- Use ESLint with Airbnb config
- Prefer functional components with hooks
- Use PropTypes or TypeScript for type safety

### Python
- Follow PEP 8
- Use type hints
- Add docstrings to functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [PyTorch Documentation](https://pytorch.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com)

---

Happy coding! 🎉

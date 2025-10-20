# 📸 JSpotlight - AI-Powered Photo Gallery

<div align="center">

![JSpotlight Banner](https://img.shields.io/badge/JSpotlight-AI%20Photo%20Gallery-667eea?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![PyTorch](https://img.shields.io/badge/PyTorch-2.5.0-ee4c2c?style=for-the-badge&logo=pytorch)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ed?style=for-the-badge&logo=docker)

**A modern, full-stack photo management application with AI-powered image tagging using deep learning**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [API Documentation](#api-documentation) • [Architecture](#architecture)

</div>

---

## 🌟 Features

### Core Functionality
- 📤 **Photo Upload & Management** - Upload, view, and organize your photos
- 🤖 **AI-Powered Tagging** - Automatic image recognition using ResNet18 deep learning model
- 🏷️ **Smart Categorization** - Photos automatically grouped by content (Pets, Nature, People, etc.)
- 🔍 **Tag-Based Search** - Find photos by AI-generated tags
- 🗑️ **Photo Deletion** - Remove unwanted photos with confirmation
- 📊 **Gallery View** - Modern grid layout with responsive design
- 💾 **Persistent Storage** - Photos stored on disk with metadata in database

### AI Capabilities
- **Deep Learning Model**: ResNet18 pre-trained on ImageNet (1000 classes)
- **Multi-Label Tagging**: Each image receives top 3 predicted labels
- **Recognition Categories**: Animals, objects, nature, vehicles, food, and more
- **Real-Time Processing**: Images analyzed during upload
- **Accuracy**: State-of-the-art computer vision performance

### User Interface
- 🎨 **Modern Design** - Clean, professional interface inspired by Clarity Photos
- 📱 **Responsive Layout** - Works on desktop and mobile devices
- 🎭 **Smart Groups** - Visual category buttons with color coding
- 🏷️ **Tag Cloud** - All unique AI tags displayed as clickable chips
- ✨ **Smooth Animations** - Hover effects, transitions, and loading states
- 🔔 **Real-Time Feedback** - Upload progress and success/error messages

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **HTTP Client**: Axios 1.6.0
- **Styling**: Custom CSS3 with modern features
  - CSS Grid & Flexbox
  - Gradients & Shadows
  - Transitions & Animations
  - Responsive Design
- **Build Tool**: React Scripts 5.0.1
- **Development**: Webpack Dev Server with Hot Reload

### Backend
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 17
- **Security**: Spring Security with JWT Authentication (optional)
- **Database**: H2 In-Memory Database
- **ORM**: Spring Data JPA / Hibernate 6.5.3
- **Build Tool**: Maven 3.9
- **Server**: Embedded Tomcat 10.1.30

#### Spring Boot Dependencies
```xml
- Spring Web (REST APIs)
- Spring Data JPA (Database Access)
- Spring Security (Authentication)
- H2 Database (In-Memory Storage)
- JJWT 0.11.5 (JWT Token Generation)
- Lombok (Boilerplate Reduction)
```

### AI Service
- **Framework**: Flask 3.0.0
- **Deep Learning**: PyTorch 2.5.0
- **Computer Vision**: torchvision 0.20.0
- **Model**: ResNet18 with ImageNet1K_V1 weights
- **Image Processing**: Pillow 10.1.0
- **Numerical Computing**: NumPy < 2.0

#### AI Model Details
- **Architecture**: ResNet18 (Residual Neural Network)
- **Training Dataset**: ImageNet (1.2M images, 1000 classes)
- **Input Size**: 224x224 pixels
- **Preprocessing**: 
  - Resize to 256px
  - Center crop to 224px
  - Normalize with ImageNet mean/std
- **Output**: Top 3 predicted class labels

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Container Orchestration**: Multi-container setup with networking
- **Reverse Proxy**: React Dev Server Proxy
- **File Storage**: Local filesystem with volume mounting

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- 4GB+ RAM recommended
- Modern web browser

### Quick Start

1. **Clone the Repository**
```bash
git clone https://github.com/ronaldjangam/JSpotlight.git
cd JSpotlight
```

2. **Start the Application**
```bash
docker-compose up -d
```

3. **Access the Application**
```
Frontend: http://localhost:3000
Backend API: http://localhost:8080
AI Service: http://localhost:5000
```

4. **Upload Photos**
- Click the "Choose an image" button
- Select a photo from your device
- Click "Upload & Analyze"
- Watch as AI automatically tags your photo!

### Development Setup

#### Backend (Spring Boot)
```bash
cd /workspaces/JSpotlight
./mvnw spring-boot:run
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```

#### AI Service (Flask)
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

---

## 📡 API Documentation

### Authentication
Currently configured for **no authentication** (all endpoints open).

To enable JWT authentication:
1. Uncomment JWT filter in `SecurityConfig.java`
2. Change `.permitAll()` to `.authenticated()`
3. Credentials: `user` / `pass`

### Endpoints

#### **Photo Management**

##### Upload Photo
```http
POST /photos/upload
Content-Type: multipart/form-data

Parameters:
  - file: image file (JPEG, PNG, etc.)

Response: 200 OK
{
  "id": 1,
  "fileName": "cat.jpg",
  "filePath": "uploads/uuid_cat.jpg",
  "creationDate": "2025-10-20T10:30:00Z",
  "tags": ["Egyptian cat", "tiger cat", "tabby"]
}
```

##### Get All Photos
```http
GET /photos

Response: 200 OK
[
  {
    "id": 1,
    "fileName": "cat.jpg",
    "filePath": "uploads/uuid_cat.jpg",
    "creationDate": "2025-10-20T10:30:00Z",
    "tags": ["Egyptian cat", "tiger cat", "tabby"]
  }
]
```

##### Delete Photo
```http
DELETE /photos/{id}

Response: 200 OK
```

#### **AI Service**

##### Predict Image Tags
```http
POST http://localhost:5000/predict
Content-Type: application/octet-stream
Body: <image bytes>

Response: 200 OK
{
  "tags": ["Egyptian cat", "tiger cat", "tabby"]
}
```

##### Health Check
```http
GET http://localhost:5000/health

Response: 200 OK
{
  "status": "healthy",
  "model": "resnet18"
}
```

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    http://localhost:3000                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   React Frontend                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Photo Gallery with Smart Groups                   │   │
│  │  • Upload Interface                                  │   │
│  │  • Tag Display & Filtering                          │   │
│  │  • Responsive UI Components                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                    │
│                    Axios HTTP                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Spring Boot Backend                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers                                         │   │
│  │  • AuthController (JWT)                             │   │
│  │  • ResponseController (Photos CRUD)                 │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Services                                            │   │
│  │  • ImageTaggingService (AI Integration)             │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Security                                            │   │
│  │  • SecurityConfig (CORS, Auth)                      │   │
│  │  • JWTFilter (Token Validation)                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Data Layer                                          │   │
│  │  • Photo Entity (JPA)                               │   │
│  │  • PhotoRepository (Spring Data)                    │   │
│  │  • H2 Database                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                         │                                    │
│                    RestTemplate                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI Service (Flask)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • ResNet18 Model Loading                           │   │
│  │  • Image Preprocessing Pipeline                     │   │
│  │  • PyTorch Inference Engine                         │   │
│  │  • Top-K Prediction (k=3)                           │   │
│  │  • ImageNet Class Mapping                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User uploads image
       ↓
Frontend sends multipart/form-data
       ↓
Backend receives file → saves to disk
       ↓
Backend sends image bytes to AI service
       ↓
AI service processes with ResNet18
       ↓
AI returns top 3 predictions
       ↓
Backend saves photo metadata + tags to database
       ↓
Backend returns photo object to frontend
       ↓
Frontend updates gallery and smart groups
```

### Docker Architecture

```yaml
jspotlight-network (bridge)
├── frontend (port 3000)
│   └── React Dev Server
│       └── Proxy to backend:8080
├── backend (port 8080)
│   └── Spring Boot App
│       └── Calls ai-service:5000
└── ai-service (port 5000)
    └── Flask + PyTorch
        └── ResNet18 Model
```

---

## 📂 Project Structure

```
JSpotlight/
├── src/main/java/com/project/JSpotlight/
│   ├── JSpotlightApplication.java      # Main Spring Boot app
│   ├── AuthController.java             # JWT authentication
│   ├── ResponseController.java         # Photo CRUD endpoints
│   ├── ImageTaggingService.java        # AI service integration
│   ├── SecurityConfig.java             # Security configuration
│   ├── JWTFilter.java                  # JWT token filter
│   ├── WebConfig.java                  # CORS & static resources
│   ├── Photo.java                      # JPA entity
│   └── PhotoRepository.java            # Data access layer
│
├── src/main/resources/
│   └── application.properties          # Spring configuration
│
├── frontend/
│   ├── public/
│   │   └── index.html                  # HTML template
│   ├── src/
│   │   ├── App.js                      # Main React component
│   │   ├── App.css                     # App-wide styles
│   │   ├── PhotoGallery.js             # Gallery component
│   │   ├── PhotoGallery.css            # Gallery styles
│   │   ├── PhotoUpload.js              # Upload component
│   │   ├── PhotoUpload.css             # Upload styles
│   │   ├── Login.js                    # Login component (optional)
│   │   ├── api.js                      # Axios configuration
│   │   └── index.js                    # React entry point
│   ├── package.json                    # NPM dependencies
│   └── Dockerfile                      # Frontend container
│
├── ai-service/
│   ├── app.py                          # Flask AI service
│   ├── requirements.txt                # Python dependencies
│   ├── imagenet_classes.txt            # 1000 class labels
│   └── Dockerfile                      # AI service container
│
├── uploads/                            # Photo storage directory
├── docker-compose.yml                  # Multi-container orchestration
├── Dockerfile                          # Backend container
├── pom.xml                            # Maven configuration
└── README.md                          # This file
```

---

## 🎨 UI Components

### Sidebar Navigation
- **Library** - Main photo collection
- **Favorites** - Starred photos (coming soon)
- **All Tags** - Browse by tags
- **Trash** - Deleted items (coming soon)

### Smart Groups
- **All** 📷 - All photos
- **Pets** 🐾 - Cats, dogs, animals
- **Nature** 🌲 - Landscapes, outdoors
- **People** 👥 - Portraits (coming soon)
- **Documents** 📄 - Papers, text (coming soon)
- **Events** 🎉 - Occasions (coming soon)

### Photo Gallery Features
- Grid layout with square thumbnails
- Hover overlay with photo info
- Quick delete button
- Filename and top 2 tags displayed
- Smooth animations and transitions

---

## 🧪 Testing

### Test the AI Model
```bash
# Test with a cat image
curl -X POST http://localhost:5000/predict \
  --data-binary @cat.jpg \
  -H "Content-Type: application/octet-stream"
```

### Test Photo Upload
```bash
# Upload via API
curl -X POST http://localhost:8080/photos/upload \
  -F "file=@photo.jpg"
```

### Health Checks
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:8080/photos

# AI Service
curl http://localhost:5000/health
```

---

## 🔧 Configuration

### Backend Configuration
File: `src/main/resources/application.properties`

```properties
# Server
server.port=8080
spring.profiles.active=prod

# Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# AI Service
ai.service.url=http://ai-service:5000/predict

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=3600000
```

### Docker Configuration
File: `docker-compose.yml`

```yaml
services:
  backend:
    ports: ["8080:8080"]
    environment:
      - AI_SERVICE_URL=http://ai-service:5000/predict
  
  ai-service:
    ports: ["5000:5000"]
  
  frontend:
    ports: ["3000:3000"]
    environment:
      - REACT_APP_API_URL=http://localhost:8080
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🐛 Troubleshooting

### Common Issues

**Frontend can't connect to backend**
```bash
# Check if backend is running
docker logs jspotlight-backend

# Restart all services
docker-compose restart
```

**AI service not tagging images**
```bash
# Check AI service health
curl http://localhost:5000/health

# View AI service logs
docker logs jspotlight-ai
```

**Photos not displaying**
```bash
# Check uploads directory permissions
ls -la uploads/

# Verify photo was saved
docker exec jspotlight-backend ls -la /app/uploads
```

---

## 🎯 Roadmap

### Planned Features
- [ ] User authentication and multi-user support
- [ ] Favorites and albums
- [ ] Advanced search and filtering
- [ ] Batch upload
- [ ] Photo editing capabilities
- [ ] Share photos via links
- [ ] Mobile app (React Native)
- [ ] Cloud storage integration
- [ ] Custom AI model training
- [ ] Face recognition
- [ ] Duplicate detection
- [ ] Trash and recovery

---

## 📚 Additional Resources

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [PyTorch Tutorials](https://pytorch.org/tutorials/)
- [ResNet Paper](https://arxiv.org/abs/1512.03385)

### Related Projects
- [ImageNet Dataset](https://www.image-net.org/)
- [torchvision models](https://pytorch.org/vision/stable/models.html)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)

---

## 👨‍💻 Author

**Ronald Jangam**
- GitHub: [@ronaldjangam](https://github.com/ronaldjangam)

---

## 🙏 Acknowledgments

- **ResNet18** - Deep Residual Learning for Image Recognition (He et al., 2015)
- **ImageNet** - Large Scale Visual Recognition Challenge
- **Spring Framework** - Application development framework
- **React Team** - UI library
- **PyTorch Team** - Deep learning framework

---

<div align="center">

**Made with ❤️ using Spring Boot, React, and PyTorch**

If you found this project helpful, please consider giving it a ⭐!

</div>

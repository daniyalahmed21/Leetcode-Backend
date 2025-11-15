# LeetCode Backend 

A comprehensive microservices architecture for a LeetCode-like coding platform. This workspace contains multiple services that work together to provide code submission, evaluation, real-time updates, and problem management.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Services](#running-the-services)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Development Workflow](#development-workflow)
- [Monitoring & Debugging](#monitoring--debugging)
- [Contributing](#contributing)


## 🎯 Overview

This backend workspace implements a decoupled microservices architecture designed to handle:

- **Problem Management**: CRUD operations for coding problems
- **Code Submissions**: Accepting and storing user code submissions
- **Code Evaluation**: Running and evaluating code in isolated Docker containers
- **Real-Time Communication**: WebSocket connections for live updates on submission status
- **Asynchronous Processing**: Job queue management using BullMQ and Redis

### Key Design Principles

- **Microservices**: Each service is independently deployable and scalable
- **Asynchronous Processing**: Long-running operations are handled via message queues
- **Scalability**: Redis and Docker enable horizontal scaling
- **Type Safety**: TypeScript ensures type safety and better code quality
- **Real-Time Updates**: WebSocket support for instant user feedback


## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Application                      │
└──────────┬───────────────────────────────────────────────────┘
           │
    ┌──────┴──────────────────────────────────────────────┐
    │                                                       │
    ▼                                                       ▼
┌──────────────────┐                          ┌──────────────────┐
│  Socket Service  │◄─────────────────────────│ Problem Service  │
│   (WebSocket)    │                          │  (REST API)      │
└──────────────────┘                          └────────┬─────────┘
    │                                                    │
    │                                                    ▼
    │                                          ┌──────────────────┐
    │                                          │  Submission Svc  │
    │                                          │  (Fastify API)   │
    │                                          └────────┬─────────┘
    │                                                   │
    │                ┌──────────────────────────────────┘
    │                │
    ▼                ▼
┌──────────────────────────────────────────┐
│         Redis Queue (BullMQ)             │
│  - Submission Jobs                       │
│  - Evaluation Jobs                       │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│      Evaluator Service (TypeScript)      │
│  - Runs code in Docker containers       │
│  - Supports Python, Java, C++            │
│  - Publishes results via WebSocket       │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│      External Services & Storage         │
│  - MongoDB (Problem & Submission Data)   │
│  - Docker (Code Execution)               │
└──────────────────────────────────────────┘
```


## 🚀 Services

### 1. **LeetCode Problem Service**
**Location**: `LeetCode Problem Service/`
**Language**: JavaScript (Node.js)
**Framework**: Express

Manages the creation, retrieval, updating, and deletion of coding problems.

**Key Features**:
- RESTful API for problem management
- Problem formatting (Markdown to HTML conversion)
- HTML sanitization for security
- Centralized logging with Winston

**Dependencies**: Express, mongoose, body-parser, marked, sanitize-html, winston


### 2. **LeetCode Submission Service**
**Location**: `Leetcode-Submission-Service/`
**Language**: JavaScript (Node.js, ES Modules)
**Framework**: Fastify

Handles code submission intake and manages the submission lifecycle.

**Key Features**:
- High-performance Fastify API
- Plugin-based architecture
- Layered architecture (Controller → Service → Repository)
- Asynchronous job queuing
- MongoDB persistence
- Redis integration

**Dependencies**: Fastify, mongoose, ioredis, bullmq, axios

**Architecture**:
```
API Request
    ↓
Controller (Request validation)
    ↓
Service (Business logic)
    ↓
Repository (Database operations)
    ↓
MongoDB
```


### 3. **LeetCode Evaluator Service**
**Location**: `Leetcode-Evaluator-service/`
**Language**: TypeScript
**Framework**: Express

Processes and evaluates code submissions in isolated Docker containers.

**Key Features**:
- Docker containerization for code execution
- Support for multiple programming languages (Python, Java, C++)
- BullMQ job queue processing
- Bull Board UI for queue monitoring
- Comprehensive logging and error handling
- ESLint + Prettier code quality enforcement

**Dependencies**: Express, bullmq, dockerode, ioredis, TypeScript, @bull-board/*

**Supported Languages**:
- Python
- Java
- C++


### 4. **LeetCode Socket Service**
**Location**: `Leetcode-Socket-Service/`
**Language**: JavaScript (Node.js)
**Framework**: Express + Socket.io

Provides real-time WebSocket communication for live submission updates.

**Key Features**:
- Real-time bidirectional communication
- Socket.io for WebSocket management
- Redis integration for scaling across multiple instances
- Live status updates on code evaluation

**Dependencies**: Express, socket.io, ioredis


## 📋 Prerequisites

Before setting up the workspace, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** (for code execution in evaluator service)
- **MongoDB** (local or cloud instance)
- **Redis** (local or cloud instance)
- **Git**

### Optional Tools

- **Postman** or **Insomnia** (for API testing)
- **MongoDB Compass** (GUI for MongoDB)
- **Redis Commander** or **Redis Insight** (GUI for Redis)


## 💾 Installation

### 1. Clone All Repositories

```bash
# Navigate to your workspace directory
cd /path/to/workspace

# Clone each service
git clone https://github.com/daniyalahmed21/Leetcode-Socket-Service.git
git clone https://github.com/daniyalahmed21/Leetcode-Evaluator-service.git
git clone https://github.com/daniyalahmed21/Leetcode-Submission-Service.git
git clone https://github.com/daniyalahmed21/LeetCode-Problem-Service.git
```

### 2. Install Dependencies for Each Service

```bash
# Problem Service
cd "LeetCode Problem Service"
npm install
cd ..

# Submission Service
cd Leetcode-Submission-Service
npm install
cd ..

# Evaluator Service
cd Leetcode-Evaluator-service
npm install
cd ..

# Socket Service
cd Leetcode-Socket-Service
npm install
cd ..
```

### 3. Setup Docker

Ensure Docker is running:

```bash
# Check Docker status
docker --version
```

Pull required images for code execution:

```bash
docker pull python:3.9-slim
docker pull openjdk:11-slim
docker pull gcc:latest
```


## 🔐 Environment Variables

Create a `.env` file in the root directory of each service with the following variables:

### LeetCode Problem Service (`.env`)

```env
PORT=3001
HOST=0.0.0.0
MONGO_URI=mongodb://localhost:27017/leetcode_problems
LOG_LEVEL=info
```

### LeetCode Submission Service (`.env`)

```env
PORT=3002
HOST=0.0.0.0
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
MONGO_URI=mongodb://localhost:27017/leetcode_submissions
```

### LeetCode Evaluator Service (`.env`)

```env
PORT=3003
HOST=0.0.0.0
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
DOCKER_HOST=unix:///var/run/docker.sock
```

### LeetCode Socket Service (`.env`)

```env
PORT=3004
HOST=0.0.0.0
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```


## 🚀 Running the Services

### Option 1: Run All Services in Separate Terminals

#### Terminal 1: Start Redis

```bash
redis-server
# or if using Docker
docker run -d -p 6379:6379 redis:latest
```

#### Terminal 2: Start MongoDB

```bash
mongod
# or if using Docker
docker run -d -p 27017:27017 mongo:latest
```

#### Terminal 3: Problem Service

```bash
cd "LeetCode Problem Service"
npm run dev
# Server running on http://localhost:3001
```

#### Terminal 4: Submission Service

```bash
cd Leetcode-Submission-Service
npm run dev
# Server running on http://localhost:3002
```

#### Terminal 5: Evaluator Service

```bash
cd Leetcode-Evaluator-service
npm run dev
# Server running on http://localhost:3003
# Bull Board UI available at http://localhost:3003/admin/queues
```

#### Terminal 6: Socket Service

```bash
cd Leetcode-Socket-Service
npm run dev
# WebSocket server running on http://localhost:3004
```

### Option 2: Use Docker Compose (Recommended for Production)

Create a `docker-compose.yml` file in the workspace root:

```yaml
version: '3.8'

services:
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: leetcode
    volumes:
      - mongodb_data:/data/db

  problem-service:
    build:
      context: ./LeetCode\ Problem\ Service
    ports:
      - "3001:3001"
    environment:
      MONGO_URI: mongodb://mongodb:27017/leetcode_problems
    depends_on:
      - mongodb

  submission-service:
    build:
      context: ./Leetcode-Submission-Service
    ports:
      - "3002:3002"
    environment:
      REDIS_HOST: redis
      MONGO_URI: mongodb://mongodb:27017/leetcode_submissions
    depends_on:
      - redis
      - mongodb

  evaluator-service:
    build:
      context: ./Leetcode-Evaluator-service
    ports:
      - "3003:3003"
    environment:
      REDIS_HOST: redis
    depends_on:
      - redis
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  socket-service:
    build:
      context: ./Leetcode-Socket-Service
    ports:
      - "3004:3004"
    environment:
      REDIS_HOST: redis
    depends_on:
      - redis

volumes:
  redis_data:
  mongodb_data:
```

Then run:

```bash
docker-compose up -d
```


## 📚 API Documentation

### Problem Service Endpoints

#### Get All Problems

```http
GET /api/v1/problems
```

#### Get Problem by ID

```http
GET /api/v1/problems/:id
```

#### Create New Problem

```http
POST /api/v1/problems
Content-Type: application/json

{
  "title": "Two Sum",
  "description": "Find two numbers that add up to target",
  "difficulty": "easy",
  "examples": [...],
  "constraints": [...]
}
```

#### Update Problem

```http
PUT /api/v1/problems/:id
Content-Type: application/json

{
  "title": "Two Sum",
  "description": "Updated description",
  "difficulty": "medium"
}
```

#### Delete Problem

```http
DELETE /api/v1/problems/:id
```

### Submission Service Endpoints

#### Submit Code

```http
POST /api/v1/submit-job
Content-Type: application/json

{
  "payload": {
    "userId": "user123",
    "problemId": "problem456",
    "code": "def solution(arr): return sum(arr)",
    "language": "python"
  }
}
```

**Response** (200 OK):

```json
{
  "message": "Job successfully submitted to queue",
  "jobId": "job-uuid-1234",
  "queueName": "SubmissionQueue"
}
```

### Socket Service

#### Connect to WebSocket

```javascript
const socket = io('http://localhost:3004');

// Listen for submission status updates
socket.on('submission-status', (data) => {
  console.log('Status:', data.status);
  console.log('Output:', data.output);
});

// Listen for evaluation complete
socket.on('evaluation-complete', (data) => {
  console.log('Result:', data);
});
```


## 📁 Project Structure

```
Leetcode-Backend-Workspace/
│
├── LeetCode Problem Service/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Mongoose schemas
│   │   ├── repositories/     # Data access layer
│   │   ├── services/         # Business logic
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── errors/           # Error classes
│   │   └── validators/       # Input validation
│   ├── package.json
│   └── README.md
│
├── Leetcode-Submission-Service/
│   ├── src/
│   │   ├── config/           # Server configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── plugins/           # Fastify plugins
│   │   ├── repositories/      # Data access layer
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── queues/            # BullMQ queue definitions
│   │   ├── workers/           # Job processors
│   │   └── app.js             # Fastify app setup
│   ├── package.json
│   └── README.md
│
├── Leetcode-Evaluator-service/
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── containers/        # Docker execution helpers
│   │   │   ├── dockerHelper.ts
│   │   │   ├── runPythonDocker.ts
│   │   │   ├── runJavaDocker.ts
│   │   │   └── runCppDocker.ts
│   │   ├── controllers/        # Request handlers
│   │   ├── jobs/               # Job definitions
│   │   ├── workers/            # Job processors
│   │   ├── queues/             # BullMQ queue definitions
│   │   ├── producer/           # Job producers
│   │   ├── routes/             # API routes
│   │   ├── BullBoard ui/       # Monitoring dashboard
│   │   └── index.ts            # Entry point
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── package.json
│   └── README.md
│
├── Leetcode-Socket-Service/
│   ├── src/
│   │   └── index.js            # WebSocket server
│   ├── package.json
│   └── README.md
│
└── Leetcode-Backend-README.md  # This file
```


## 🛠️ Technology Stack

### Core Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| Node.js | Runtime environment | v18+ |
| Express | Web framework | ^5.1.0 |
| Fastify | High-performance web framework | ^5.5.0 |
| TypeScript | Type-safe JavaScript | ^5.8.3 |
| Socket.io | Real-time communication | ^4.8.1 |

### Data & Caching

| Technology | Purpose | Version |
|-----------|---------|---------|
| MongoDB | NoSQL database | Latest |
| Mongoose | MongoDB ODM | ^8.16.4 |
| Redis | In-memory cache & message broker | Latest |
| ioredis | Redis client | ^5.7.0 |

### Job Queue & Messaging

| Technology | Purpose | Version |
|-----------|---------|---------|
| BullMQ | Job queue library | ^5.56.9 |
| @bull-board/* | Queue monitoring UI | ^6.12.0 |

### Development & Tooling

| Technology | Purpose | Version |
|-----------|---------|---------|
| nodemon | File change monitor | ^3.1.10 |
| TypeScript Compiler | TypeScript transpilation | ^5.8.3 |
| ESLint | Code linting | ^9.32.0 |
| Prettier | Code formatting | ^3.6.2 |
| Docker | Container runtime | Latest |
| Dockerode | Docker API client | ^4.0.7 |

### Utilities

| Technology | Purpose |
|-----------|---------|
| dotenv | Environment variable management |
| marked | Markdown to HTML conversion |
| sanitize-html | HTML sanitization |
| winston | Logging library |
| turndown | HTML to Markdown conversion |
| axios | HTTP client |
| zod | TypeScript validation |


## 💻 Development Workflow

### 1. Problem Service Development

```bash
cd "LeetCode Problem Service"
npm run dev
```

Changes to files in `src/` will automatically trigger restarts via nodemon.

### 2. Submission Service Development

```bash
cd Leetcode-Submission-Service
npm run dev
```

The service will start on port 3002 with hot-reloading enabled.

### 3. Evaluator Service Development (TypeScript)

```bash
cd Leetcode-Evaluator-service
npm run dev
```

This runs TypeScript compiler in watch mode and restarts the server with nodemon.

Available scripts:
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for TypeScript changes
- `npm run start` - Run the compiled application

### 4. Socket Service Development

```bash
cd Leetcode-Socket-Service
npm run dev
```

Changes will trigger automatic restarts.


## 🔍 Monitoring & Debugging

### 1. Bull Board UI (Queue Monitoring)

Access the Evaluator Service's Bull Board at:

```
http://localhost:3003/admin/queues
```

This UI allows you to:
- Monitor job status (pending, active, completed, failed)
- View job details and logs
- Manually retry failed jobs
- Clear queues

### 2. MongoDB Compass

Connect to MongoDB to inspect collections:

```
mongodb://localhost:27017
```

Databases to monitor:
- `leetcode_problems` - Problem definitions
- `leetcode_submissions` - Submission records

### 3. Redis Commander

Monitor Redis keys and values:

```bash
npm install -g redis-commander
redis-commander --port 8081
```

Access at: `http://localhost:8081`

### 4. Application Logs

Logs are configured in the Problem Service using Winston. Check:

- `logs/app.log` - Application logs (Problem Service)

For other services, logs output to the console by default.


## 🔄 Submission Flow

Here's the complete flow of a code submission:

```
1. Client submits code
   ↓
2. Submission Service receives POST request
   ↓
3. Submission data is validated and saved to MongoDB
   ↓
4. Job is added to BullMQ queue
   ↓
5. WebSocket emits "submission-received" event
   ↓
6. Evaluator Service picks up job from queue
   ↓
7. Code is executed in Docker container
   ↓
8. Results are processed (passed/failed)
   ↓
9. Job is marked complete in BullMQ
   ↓
10. Socket Service emits "evaluation-complete" to client
    ↓
11. Client receives real-time results
```


## 🐛 Troubleshooting

### Redis Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:6379`

**Solution**:
```bash
# Ensure Redis is running
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis:latest
```

### MongoDB Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Ensure MongoDB is running
mongod

# Or using Docker
docker run -d -p 27017:27017 mongo:latest
```

### Docker Cannot Connect

**Problem**: `Error: Cannot connect to the Docker daemon`

**Solution**:
```bash
# Ensure Docker is running
docker --version

# On Linux, start Docker daemon
sudo systemctl start docker

# On Windows/Mac, start Docker Desktop
```

### TypeScript Compilation Error

**Problem**: `Error: TypeScript compilation failed`

**Solution**:
```bash
cd Leetcode-Evaluator-service
npm run lint:fix  # Fix linting issues
npm run build     # Rebuild TypeScript
```

### Port Already in Use

**Problem**: `Error: EADDRINUSE: address already in use :::3001`

**Solution**:
```bash
# Find and kill process using the port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process

# Or use a different port in .env
PORT=3001
```

## 📝 Best Practices

### 1. Environment Variables

- Never commit `.env` files
- Use `.env.example` as a template
- Keep sensitive data out of the codebase

### 2. Error Handling

- All services should return proper HTTP status codes
- Use consistent error response format
- Log all errors for debugging

### 3. Code Quality

- Run linting before commits
- Follow the established code style
- Write meaningful commit messages

### 4. Testing

- Test API endpoints with Postman/Insomnia
- Monitor jobs in Bull Board UI
- Check logs for any warnings or errors

### 5. Security

- Validate all user inputs
- Sanitize HTML content
- Use environment variables for secrets
- Never expose sensitive information in logs


## 📄 License

All services are licensed under the ISC License. See individual `LICENSE` files in each service directory.


## 👨‍💻 Author

**Daniyal Ahmed**


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Last Updated**: November 15, 2025


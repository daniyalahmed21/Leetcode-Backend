# LeetCode Submission Microservice

## Overview

This microservice is a backend API that handles code submissions for a platform similar to LeetCode. It is designed to be a decoupled and scalable system. When a new code submission is received via the API, it is stored in a database and a processing job is added to a message queue for asynchronous handling by a separate worker process.

### Key Features

  * **RESTful API:** Provides a single, versioned endpoint for new code submissions.
  * **Layered Architecture:** Follows a clear Controller-Service-Repository pattern for separation of concerns.
  * **Asynchronous Processing:** Uses BullMQ and Redis to handle CPU-intensive code execution in the background, preventing the API from being blocked.
  * **Database Integration:** Persists submission data using Mongoose and MongoDB.
  * **Robustness:** Built with Fastify, ensuring high performance, a structured plugin system, and robust error handling.

## Architecture

The application is built on a **plugin-based architecture** where each component is a self-contained module managed by Fastify.

  * **API Gateway (Routes & Controllers):** The entry point for all requests. The controller validates the input and orchestrates the call to the service layer.
  * **Service Layer (`services/`):** Contains the core business logic. It orchestrates the creation of a database record and the addition of a job to the queue.
  * **Repository Layer (`repositories/`):** Manages all database interactions. The service layer talks to the repository, not directly to Mongoose.
  * **Plugins (`plugins/`):** A set of reusable modules for managing external resources like the MongoDB connection, Redis client, and BullMQ queues.
  * **Asynchronous Worker (`worker.js`):** A separate process that listens to the BullMQ queue and executes the code processing logic.

## Getting Started

### Prerequisites

  * **Node.js** (v18 or higher)
  * **npm**
  * **Docker** (Recommended for running MongoDB and Redis locally)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/daniyalahmed21/Leetcode-Submission-Service
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root of the project and provide the following environment variables.

```env
PORT=3000
HOST=0.0.0.0
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
MONGO_URI=mongodb://127.0.0.1:27017/my_submission_service
```

### Running the Microservice

This microservice requires two separate processes to run simultaneously: the API server and the worker.

1.  **Start the API Server:**

    ```bash
    node index.js
    ```

    The server will log `Server listening on port 3000`.



## API Documentation

### `POST /api/v1/submit-job`

Submits a new code entry for asynchronous processing.

  * **Description:** This endpoint accepts a JSON payload, validates it, saves the submission to the database, and adds a job to the `SubmissionQueue`.

  * **Request Body:** `application/json`
    The payload must contain the following properties:

    ```json
    {
      "payload": {
        "userId": "string",
        "problemId": "string",
        "code": "string",
        "language": "string"
      }
    }
    ```

  * **Successful Response:** `200 OK`

    ```json
    {
      "message": "Job successfully submitted to queue",
      "jobId": "...",
      "queueName": "SubmissionQueue"
    }
    ```


## Folder Structure

```
.
├── src/
│   ├── config/
│   │   └── serverConfig.js
│   │
│   ├── controllers/
│   │   └── submission-controller.js
│   │
│   ├── models/
│   │   └── submissionModel.js
│   │
│   ├── plugins/
│   │   ├── mongoose-db.js
│   │   ├── redis.js
│   │   ├── repository.js
│   │   ├── service.js
│   │   └── queues.js
│   │
│   ├── queues/
│   │   └── submission-queue.js
│   │
│   ├── repositories/
│   │   └── submission-repository.js
│   │
│   ├── routes/
│   │   └── api/
│   │       └── v1/
│   │           └── submission-routes.js
│   │       └── api-routes.js
│   │
│   ├── services/
│   │   └── submission-service.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── index.js
```

## Dependencies

  * **Fastify**: Web framework
  * **Mongoose**: MongoDB object modeling tool
  * **ioredis**: Redis client
  * **BullMQ**: Message queue for background jobs
  * **@fastify/env**: For environment variable management

## License

This project is licensed under the MIT License.
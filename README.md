# Video Management Application

This repository contains a video management application with the following features:
- User authentication (login/register).
- Upload and view videos.
- Backend built with Node.js and MongoDB.
- Frontend built with React.
- Containerized using Docker Compose.

---

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) account for cloud-based MongoDB.

---

## Project Structure

```
project-root/
|-- backend/
|   |-- src/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- index.js
|   |-- .env
|   |-- Dockerfile
|-- client/
|   |-- src/
|   |-- Dockerfile
|-- docker-compose.yml
```

---

## Environment Variables

### Backend (`backend/.env`):
```
PORT=5001
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```

Make sure to replace `<your_mongodb_connection_string>` and `<your_secret_key>` with actual values.

### Frontend: No environment variables required by default.

---

## Setup and Run Instructions

### Step 1: Clone the Repository
```bash
git clone <repository_url>
cd <repository_name>
```

### Step 2: Run the Application Using Docker Compose
```bash
docker-compose up --build
```
This command will:
- Build and start the `frontend` on port `3000`.
- Build and start the `backend` on port `5001`.

### Step 3: Access the Application
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5001`

---

## Docker Setup Details

### Docker Compose Configuration
`docker-compose.yml` defines two services:

1. **frontend**
   - Builds from `./client` directory.
   - Exposes port `3000`.
2. **backend**
   - Builds from `./backend` directory.
   - Exposes port `5001`.

### Backend Dockerfile
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.js"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

## Additional Docker Commands

### Stop and Remove All Containers
```bash
docker-compose down
```

### Rebuild Containers
```bash
docker-compose up --build
```

### Clear Docker Cache
```bash
docker system prune -a
```

---

## Backend API Endpoints

### Authentication
- `POST /api/auth/login`: User login.
- `POST /api/auth/register`: User registration.

### Videos
- `GET /api/video`: Get user videos.
- `POST /api/video`: Upload a video.

---

## Frontend Features
- User login and registration forms.
- Video upload functionality.
- Video gallery for logged-in users.

---

## Troubleshooting

### Port Conflicts
If ports `3000` or `5001` are in use, stop the processes using these ports:
```bash
# Replace <port> with the port number
taskkill /F /PID $(lsof -ti:<port>)  # Mac/Linux
netstat -ano | findstr :<port>      # Windows
```

### MongoDB Connection Issues
Ensure your `MONGO_URI` in `backend/.env` is correct and your IP is whitelisted in MongoDB Atlas.

---

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.

---

## License
This project is licensed under the MIT License.
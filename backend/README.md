# Productivity Social - Backend

A Spring Boot backend application for a productivity social media platform where users can track tasks, earn XP, and compete with friends on a leaderboard.

## Features

- **User Authentication**: JWT-based authentication and authorization
- **Task Management**: Create, update, complete, and delete tasks
- **XP System**: Earn XP based on task priority when completing tasks
- **Level System**: Automatic level calculation based on XP
- **Friend System**: Send/accept/reject friend requests
- **Leaderboard**: Compete with friends based on XP
- **MongoDB Integration**: NoSQL database for flexible data storage

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data MongoDB
- MongoDB
- Maven
- Lombok

## Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MongoDB 4.4+ (running on localhost:27017)

## Installation

1. Make sure MongoDB is running:
```bash
# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Update `src/main/resources/application.properties` if needed:
```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/productivity_social

# JWT Secret (change in production!)
jwt.secret=your-secret-key-change-this-in-production-make-it-longer-and-secure
```

4. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/search?query={username}` - Search users
- `GET /api/users/friends` - Get user's friends
- `DELETE /api/users/friends/{friendId}` - Remove a friend

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all user's tasks
- `GET /api/tasks/status/{status}` - Get tasks by status
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update a task
- `POST /api/tasks/{id}/complete` - Complete a task (awards XP)
- `DELETE /api/tasks/{id}` - Delete a task

### Friend Requests
- `POST /api/friend-requests` - Send a friend request
- `GET /api/friend-requests/received` - Get received friend requests
- `GET /api/friend-requests/sent` - Get sent friend requests
- `POST /api/friend-requests/{id}/accept` - Accept a friend request
- `POST /api/friend-requests/{id}/reject` - Reject a friend request

### Leaderboard
- `GET /api/leaderboard` - Get friends leaderboard

## Task Priority & XP Rewards

- **LOW**: 10 XP
- **MEDIUM**: 20 XP
- **HIGH**: 30 XP
- **URGENT**: 50 XP

## Level Calculation

Level is calculated using the formula: `Level = floor(sqrt(XP / 100)) + 1`

- Level 1: 0-99 XP
- Level 2: 100-399 XP
- Level 3: 400-899 XP
- Level 4: 900-1599 XP
- And so on...

## Database Collections

- **users**: User profiles with XP, level, and friend lists
- **tasks**: Task information with status, priority, and XP rewards
- **friend_requests**: Friend request status tracking

## Security

- JWT tokens expire after 24 hours (configurable)
- Passwords are encrypted using BCrypt
- All endpoints except `/api/auth/**` require authentication
- CORS enabled for frontend running on `http://localhost:3000`

## Development

To run in development mode with auto-reload:
```bash
mvn spring-boot:run
```

To run tests:
```bash
mvn test
```

## Production Notes

⚠️ **Before deploying to production:**

1. Change the JWT secret in `application.properties`
2. Use environment variables for sensitive configuration
3. Enable HTTPS
4. Configure MongoDB authentication
5. Set up proper logging
6. Consider rate limiting for API endpoints

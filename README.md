# Productivity Social 🚀

A full-stack social media application for productivity enthusiasts. Track your tasks, earn XP, level up, and compete with friends on a leaderboard!

## 🌐 Deployment Ready

This application is configured for easy deployment to **Render** with **MongoDB Atlas**. See [RENDER_QUICK_START.md](./RENDER_QUICK_START.md) for a 15-minute deployment guide!

## 🎯 Features

- **Task Management**: Create, complete, and track your productivity tasks
- **XP & Leveling System**: Earn experience points and level up based on task completion
- **Social Leaderboard**: Compete with friends and see who's the most productive
- **Friend System**: Connect with friends and track their progress
- **Priority-based XP**: Higher priority tasks = more XP rewards
- **Real-time Progress Tracking**: Monitor your level progress and statistics

## 🏗️ Architecture

### Backend (Java + Spring Boot)

- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB
- **Security**: JWT Authentication
- **API**: RESTful endpoints

### Frontend (React)

- **Framework**: React 18
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern design

## 📁 Project Structure

```
java project/
├── backend/          # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/productivity/
│   │       │   ├── controller/    # REST controllers
│   │       │   ├── model/         # Entity models
│   │       │   ├── repository/    # MongoDB repositories
│   │       │   ├── service/       # Business logic
│   │       │   ├── security/      # JWT & Security config
│   │       │   └── dto/           # Data transfer objects
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/         # React frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/          # Login & Register
    │   │   ├── Dashboard/     # Main dashboard
    │   │   ├── Tasks/         # Task management
    │   │   ├── Leaderboard/   # Friends leaderboard
    │   │   ├── Friends/       # Friend management
    │   │   └── User/          # User profile
    │   ├── services/
    │   │   └── api.js         # API integration
    │   └── App.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **JDK 17+** (for backend)
- **Maven 3.6+** (for backend)
- **MongoDB 4.4+** (database)
- **Node.js 16+** (for frontend)
- **npm** (for frontend)

### Installation Steps

#### 1. Start MongoDB

**Using Homebrew (macOS):**

```bash
brew services start mongodb-community
```

**Using Docker:**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2. Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend will run on: `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 📊 XP & Level System

### Task Priority & XP Rewards

- **LOW**: 10 XP 🟢
- **MEDIUM**: 20 XP 🟠
- **HIGH**: 30 XP 🔴
- **URGENT**: 50 XP 🔥

### Level Progression

The level system uses the formula: `Level = floor(sqrt(XP / 100)) + 1`

| Level | XP Required |
| ----- | ----------- |
| 1     | 0-99        |
| 2     | 100-399     |
| 3     | 400-899     |
| 4     | 900-1599    |
| 5     | 1600-2499   |
| ...   | ...         |

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Register or login to receive a JWT token
2. Token is stored in localStorage
3. Token is automatically included in API requests
4. Tokens expire after 24 hours

## 🎨 Screenshots & Features

### Dashboard

- Create and manage tasks
- Filter tasks by status
- Complete tasks to earn XP
- Real-time XP and level updates

### Leaderboard

- View friends ranked by XP
- Top 3 positions highlighted
- Display level and XP for each user

### Friends

- Search and add friends
- Manage friend requests
- View friend profiles

### Profile

- View your stats and achievements
- Track XP progress to next level
- See account details

## 🛠️ Technologies Used

### Backend

- Spring Boot 3.2.0
- Spring Security
- Spring Data MongoDB
- JWT (jjwt 0.11.5)
- Lombok
- Maven

### Frontend

- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- CSS3

### Database

- MongoDB 4.4+

## 🔌 API Endpoints

See detailed API documentation in [backend/README.md](backend/README.md)

Key endpoints:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task
- `POST /api/tasks/{id}/complete` - Complete task (earn XP)
- `GET /api/leaderboard` - Get friends leaderboard
- `GET /api/users/friends` - Get friends list

## 🔒 Security Notes

**For Production Deployment:**

1. Change JWT secret in `application.properties`
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Configure MongoDB authentication
5. Set up rate limiting
6. Implement proper logging and monitoring
7. Update CORS configuration

## 🤝 Contributing

This is a demo project. Feel free to fork and customize!

## 📝 License

This project is open source and available for educational purposes.

## 🎯 Future Enhancements

- [ ] Task editing and drag-drop reordering
- [ ] Task categories and tags
- [ ] Push notifications for reminders
- [ ] User avatar uploads
- [ ] Dark mode
- [ ] Global leaderboard (all users)
- [ ] Task statistics and analytics
- [ ] Social feed of friends' activities
- [ ] Task collaboration features
- [ ] Mobile app (React Native)
- [ ] Gamification badges and achievements
- [ ] Weekly/monthly challenges

## 💡 Tips for Users

1. Set realistic task priorities to earn consistent XP
2. Complete urgent tasks for maximum XP boost
3. Add friends to make productivity more fun
4. Check the leaderboard daily for motivation
5. Break down large tasks into smaller ones for steady progress

## 🆘 Troubleshooting

**MongoDB Connection Error:**

- Ensure MongoDB is running on port 27017
- Check MongoDB logs for errors

**Backend Not Starting:**

- Verify JDK 17+ is installed
- Check if port 8080 is available

**Frontend Not Loading:**

- Ensure backend is running first
- Clear browser cache and localStorage
- Check console for errors

**Authentication Issues:**

- Clear localStorage in browser
- Re-login to get a fresh token

---

**Happy Productivity!** 🚀✨

Start tracking your tasks, earn XP, and compete with friends today!

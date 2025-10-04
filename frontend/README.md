# Productivity Social - Frontend

A React frontend application for a productivity social media platform where users can track tasks, earn XP, and compete with friends.

## Features

- **User Authentication**: Login and registration
- **Task Management**: Create, view, filter, and complete tasks
- **XP & Level System**: Visual progress tracking
- **Leaderboard**: Compete with friends
- **Friend Management**: Search users, send/accept friend requests
- **User Profile**: View stats and progress
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- React 18
- React Router DOM 6
- Axios for API calls
- CSS3 for styling
- Modern JavaScript (ES6+)

## Prerequisites

- Node.js 16+ and npm

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Make sure the backend is running on `http://localhost:8080`

4. Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   └── Navbar.js
│   │   ├── Tasks/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── TaskItem.js
│   │   ├── Leaderboard/
│   │   │   └── Leaderboard.js
│   │   ├── Friends/
│   │   │   └── Friends.js
│   │   └── User/
│   │       └── UserProfile.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Features Overview

### Authentication

- **Login**: Authenticate with username and password
- **Register**: Create a new account with username, email, display name, and password
- JWT token stored in localStorage for persistent sessions

### Dashboard

- **Tasks Tab**: Create and manage tasks
- **Leaderboard Tab**: View friends ranked by XP
- **Friends Tab**: Manage friends and friend requests
- **Profile Tab**: View your stats and progress

### Task Management

- Create tasks with title, description, priority, and due date
- Filter tasks by status (All, To Do, In Progress, Completed)
- Complete tasks to earn XP
- Delete tasks
- Visual priority indicators with color coding

### Leaderboard

- View friends ranked by XP
- Top 3 positions highlighted with special styling
- Display level and XP for each user

### Friend System

- Search for users by username
- Send friend requests
- Accept or reject received requests
- View sent requests
- Remove friends

### User Profile

- View display name, username, and email
- See current level and total XP
- Progress bar showing XP to next level
- Friend count
- Account creation and update dates

## Task Priority Colors

- **LOW**: Green (10 XP)
- **MEDIUM**: Orange (20 XP)
- **HIGH**: Deep Orange (30 XP)
- **URGENT**: Red (50 XP)

## API Integration

All API calls are managed through `src/services/api.js`:

- Automatic JWT token injection
- Centralized error handling
- Base URL configuration

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.

## Styling

- Modern gradient design
- Card-based layout
- Hover effects and animations
- Responsive design for mobile devices
- Color scheme:
  - Primary: Purple gradient (#667eea to #764ba2)
  - Success: Green (#4CAF50)
  - Warning: Orange (#FF9800)
  - Danger: Red (#f44336)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

1. Make sure the backend is running before starting the frontend
2. Check the browser console for any API errors
3. Clear localStorage if you encounter authentication issues
4. Use React Developer Tools for debugging

## Future Enhancements

- Task editing functionality
- Task categories/tags
- Task reminders and notifications
- User avatars upload
- Dark mode
- Global leaderboard
- Task statistics and analytics
- Social feed of friends' activities
- Task comments and collaboration

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

// User APIs
export const userAPI = {
  getCurrentUser: () => api.get("/users/me"),
  getUserById: (id) => api.get(`/users/${id}`),
  searchUsers: (query) => api.get("/users/search", { params: { query } }),
  getFriends: () => api.get("/users/friends"),
  removeFriend: (friendId) => api.delete(`/users/friends/${friendId}`),
};

// Task APIs
export const taskAPI = {
  createTask: (task) => api.post("/tasks", task),
  getTasks: () => api.get("/tasks"),
  getTasksByStatus: (status) => api.get(`/tasks/status/${status}`),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  completeTask: (id) => api.post(`/tasks/${id}/complete`),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Friend Request APIs
export const friendRequestAPI = {
  sendFriendRequest: (receiverId) =>
    api.post("/friend-requests", { receiverId }),
  getReceivedRequests: () => api.get("/friend-requests/received"),
  getSentRequests: () => api.get("/friend-requests/sent"),
  acceptRequest: (id) => api.post(`/friend-requests/${id}/accept`),
  rejectRequest: (id) => api.post(`/friend-requests/${id}/reject`),
};

// Leaderboard APIs
export const leaderboardAPI = {
  getLeaderboard: () => api.get("/leaderboard"),
};

export default api;

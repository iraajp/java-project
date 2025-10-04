import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import Leaderboard from '../Leaderboard/Leaderboard';
import Friends from '../Friends/Friends';
import UserProfile from '../User/UserProfile';
import { userAPI } from '../../services/api';
import './Dashboard.css';

function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = () => {
    fetchUserData(); // Refresh user data to update XP and level
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout} 
      />
      <div className="dashboard-content container">
        <div className="dashboard-main">
          {activeTab === 'tasks' && (
            <div>
              <TaskForm onTaskCreated={handleTaskUpdate} />
              <TaskList onTaskUpdate={handleTaskUpdate} />
            </div>
          )}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'friends' && <Friends />}
          {activeTab === 'profile' && <UserProfile user={user} onUpdate={fetchUserData} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

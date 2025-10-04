import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../../services/api';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await leaderboardAPI.getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard">
      <div className="card">
        <h2>🏆 Friends Leaderboard</h2>
        <p className="leaderboard-subtitle">Compete with your friends and climb to the top!</p>
        
        {leaderboard.length === 0 ? (
          <div className="no-data">
            <p>No friends yet. Add some friends to see the leaderboard!</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div key={user.id} className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}>
                <div className="rank">{getMedalEmoji(index)}</div>
                <div className="user-info">
                  <div className="user-name">{user.displayName}</div>
                  <div className="user-username">@{user.username}</div>
                </div>
                <div className="user-stats">
                  <div className="stat">
                    <span className="stat-label">Level</span>
                    <span className="stat-value">{user.level}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">XP</span>
                    <span className="stat-value xp">{user.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;

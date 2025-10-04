import React from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  const xpForNextLevel = () => {
    const nextLevel = user.level + 1;
    return nextLevel * nextLevel * 100;
  };

  const xpProgress = () => {
    const currentLevelXp = user.level * user.level * 100;
    const nextLevelXp = xpForNextLevel();
    const progress =
      ((user.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="profile">
      <div className="card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user?.displayName}</h2>
            <p className="username">@{user?.username}</p>
            <p className="email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">{user?.level}</div>
              <div className="stat-label">Level</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{user?.xp}</div>
              <div className="stat-label">Total XP</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-value">{user?.friendIds?.length || 0}</div>
              <div className="stat-label">Friends</div>
            </div>
          </div>
        </div>

        <div className="level-progress">
          <div className="progress-header">
            <span>Level {user?.level}</span>
            <span>Level {user?.level + 1}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${xpProgress()}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {user?.xp} / {xpForNextLevel()} XP
          </div>
        </div>

        <div className="profile-details">
          <h3>📊 Account Details</h3>
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Updated:</span>
            <span className="detail-value">
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

import React from "react";

function Navbar({ user, activeTab, setActiveTab, onLogout, theme, toggleTheme }) {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>🎯 Productivity Social</h1>
          </div>
          <div className="navbar-user">
            <div className="user-stats">
              <span>👤 {user?.displayName}</span>
              <span>⭐ Level {user?.level}</span>
              <span>🏆 {user?.xp} XP</span>
            </div>
            <button onClick={toggleTheme} className="btn-theme" title="Toggle theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="navbar-tabs">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "tasks" ? "active" : ""}`}
            onClick={() => setActiveTab("tasks")}
          >
            📝 Tasks
          </button>
          <button
            className={`tab ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveTab("leaderboard")}
          >
            🏆 Leaderboard
          </button>
          <button
            className={`tab ${activeTab === "friends" ? "active" : ""}`}
            onClick={() => setActiveTab("friends")}
          >
            👥 Friends
          </button>
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;

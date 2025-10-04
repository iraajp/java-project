import React, { useState, useEffect } from "react";
import { userAPI, friendRequestAPI } from "../../services/api";
import "./Friends.css";

function Friends() {
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("friends");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [friendsRes, receivedRes, sentRes] = await Promise.all([
        userAPI.getFriends(),
        friendRequestAPI.getReceivedRequests(),
        friendRequestAPI.getSentRequests(),
      ]);
      setFriends(friendsRes.data);
      setReceivedRequests(receivedRes.data);
      setSentRequests(sentRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await userAPI.searchUsers(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      await friendRequestAPI.sendFriendRequest(userId);
      alert("Friend request sent!");
      fetchData();
      setSearchResults([]);
      setSearchQuery("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send friend request");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await friendRequestAPI.acceptRequest(requestId);
      fetchData();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await friendRequestAPI.rejectRequest(requestId);
      fetchData();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const removeFriend = async (friendId) => {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      try {
        await userAPI.removeFriend(friendId);
        fetchData();
      } catch (error) {
        console.error("Error removing friend:", error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="friends">
      <div className="card">
        <h2>👥 Friends</h2>

        <div className="search-section">
          <h3>🔍 Find Friends</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="btn-search">
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <div className="user-name">{user.displayName}</div>
                    <div className="user-username">@{user.username}</div>
                  </div>
                  <button
                    onClick={() => sendFriendRequest(user.id)}
                    className="btn-add"
                  >
                    + Add Friend
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tabs-container">
          <div className="friend-tabs">
            <button
              className={`friend-tab ${
                activeTab === "friends" ? "active" : ""
              }`}
              onClick={() => setActiveTab("friends")}
            >
              Friends ({friends.length})
            </button>
            <button
              className={`friend-tab ${
                activeTab === "received" ? "active" : ""
              }`}
              onClick={() => setActiveTab("received")}
            >
              Received ({receivedRequests.length})
            </button>
            <button
              className={`friend-tab ${activeTab === "sent" ? "active" : ""}`}
              onClick={() => setActiveTab("sent")}
            >
              Sent ({sentRequests.length})
            </button>
          </div>
        </div>

        {activeTab === "friends" && (
          <div className="friends-list">
            {friends.length === 0 ? (
              <div className="no-data">
                <p>No friends yet. Search and add some friends!</p>
              </div>
            ) : (
              friends.map((friend) => (
                <div key={friend.id} className="user-item">
                  <div className="user-info">
                    <div className="user-name">{friend.displayName}</div>
                    <div className="user-username">@{friend.username}</div>
                    <div className="user-stats-small">
                      Level {friend.level} • {friend.xp} XP
                    </div>
                  </div>
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "received" && (
          <div className="requests-list">
            {receivedRequests.length === 0 ? (
              <div className="no-data">
                <p>No pending friend requests</p>
              </div>
            ) : (
              receivedRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <div>Friend request from user ID: {request.senderId}</div>
                  </div>
                  <div className="request-actions">
                    <button
                      onClick={() => acceptRequest(request.id)}
                      className="btn-accept"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectRequest(request.id)}
                      className="btn-reject"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "sent" && (
          <div className="requests-list">
            {sentRequests.length === 0 ? (
              <div className="no-data">
                <p>No sent friend requests</p>
              </div>
            ) : (
              sentRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <div>Friend request to user ID: {request.receiverId}</div>
                    <div className="request-status">Pending</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;

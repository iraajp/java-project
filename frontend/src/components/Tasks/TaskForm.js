import React, { useState } from "react";
import { taskAPI } from "../../services/api";
import "./TaskForm.css";

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await taskAPI.createTask(formData);
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });
      onTaskCreated();
    } catch (err) {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card task-form">
      <h2>✨ Create New Task</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="What do you need to do?"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add details about your task..."
            rows="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              <option value="LOW">Low (10 XP)</option>
              <option value="MEDIUM">Medium (20 XP)</option>
              <option value="HIGH">High (30 XP)</option>
              <option value="URGENT">Urgent (50 XP)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "+ Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

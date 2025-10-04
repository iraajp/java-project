import React from "react";
import "./TaskItem.css";

function TaskItem({ task, onComplete, onDelete }) {
  const priorityColors = {
    LOW: "#4CAF50",
    MEDIUM: "#FF9800",
    HIGH: "#FF5722",
    URGENT: "#F44336",
  };

  const statusEmojis = {
    TODO: "📌",
    IN_PROGRESS: "🔄",
    COMPLETED: "✅",
    ARCHIVED: "📦",
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div
      className={`task-item card ${
        task.status === "COMPLETED" ? "completed" : ""
      }`}
    >
      <div className="task-header">
        <span className="task-status">{statusEmojis[task.status]}</span>
        <span
          className="task-priority"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="task-xp">🏆 {task.xpReward} XP</span>
        {task.dueDate && (
          <span className="task-due">📅 {formatDate(task.dueDate)}</span>
        )}
      </div>

      {task.completedAt && (
        <div className="task-completed-at">
          Completed: {formatDate(task.completedAt)}
        </div>
      )}

      <div className="task-actions">
        {task.status !== "COMPLETED" && (
          <button onClick={() => onComplete(task.id)} className="btn-complete">
            ✓ Complete
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

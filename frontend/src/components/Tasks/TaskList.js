import React, { useState, useEffect } from "react";
import { taskAPI } from "../../services/api";
import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({ onTaskUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await taskAPI.completeTask(taskId);
      fetchTasks();
      onTaskUpdate();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") return true;
    return task.status === filter;
  });

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>📋 My Tasks</h2>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
            onClick={() => setFilter("ALL")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "TODO" ? "active" : ""}`}
            onClick={() => setFilter("TODO")}
          >
            To Do
          </button>
          <button
            className={`filter-btn ${filter === "IN_PROGRESS" ? "active" : ""}`}
            onClick={() => setFilter("IN_PROGRESS")}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === "COMPLETED" ? "active" : ""}`}
            onClick={() => setFilter("COMPLETED")}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found. Create one to get started! 🚀</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;

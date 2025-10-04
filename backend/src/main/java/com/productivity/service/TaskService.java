package com.productivity.service;

import com.productivity.model.Task;
import com.productivity.model.Task.TaskStatus;
import com.productivity.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserService userService;
    
    public Task createTask(Task task) {
        task.setStatus(TaskStatus.TODO);
        task.calculateXpReward();
        return taskRepository.save(task);
    }
    
    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }
    
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public List<Task> getTasksByUserIdAndStatus(String userId, TaskStatus status) {
        return taskRepository.findByUserIdAndStatus(userId, status);
    }
    
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }
    
    public Task completeTask(String taskId, String userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to complete this task");
        }
        
        if (task.getStatus() != TaskStatus.COMPLETED) {
            task.setStatus(TaskStatus.COMPLETED);
            task.setCompletedAt(LocalDateTime.now());
            task = taskRepository.save(task);
            
            // Award XP to user
            userService.addXpToUser(userId, task.getXpReward());
        }
        
        return task;
    }
    
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
    
    public long getCompletedTaskCount(String userId) {
        return taskRepository.countByUserIdAndStatus(userId, TaskStatus.COMPLETED);
    }
}

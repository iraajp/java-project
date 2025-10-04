package com.productivity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    
    private String userId;
    
    private String title;
    
    private String description;
    
    private TaskPriority priority = TaskPriority.MEDIUM;
    
    private TaskStatus status = TaskStatus.TODO;
    
    private LocalDateTime dueDate;
    
    private LocalDateTime completedAt;
    
    private int xpReward;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public enum TaskPriority {
        LOW(10),
        MEDIUM(20),
        HIGH(30),
        URGENT(50);
        
        private final int xpValue;
        
        TaskPriority(int xpValue) {
            this.xpValue = xpValue;
        }
        
        public int getXpValue() {
            return xpValue;
        }
    }
    
    public enum TaskStatus {
        TODO,
        IN_PROGRESS,
        COMPLETED,
        ARCHIVED
    }
    
    // Calculate XP reward based on priority
    public void calculateXpReward() {
        this.xpReward = this.priority.getXpValue();
    }
}

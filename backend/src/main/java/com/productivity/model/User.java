package com.productivity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String username;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    
    private String displayName;
    
    private int xp = 0;
    
    private int level = 1;
    
    private List<String> friendIds = new ArrayList<>();
    
    private String avatarUrl;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // Calculate level based on XP
    public void calculateLevel() {
        this.level = (int) Math.floor(Math.sqrt(this.xp / 100.0)) + 1;
    }
    
    // Add XP and recalculate level
    public void addXp(int points) {
        this.xp += points;
        calculateLevel();
    }
}

package com.productivity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "friend_requests")
public class FriendRequest {
    @Id
    private String id;
    
    private String senderId;
    
    private String receiverId;
    
    private RequestStatus status = RequestStatus.PENDING;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    public enum RequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}

package com.productivity.controller;

import com.productivity.model.FriendRequest;
import com.productivity.model.User;
import com.productivity.service.FriendRequestService;
import com.productivity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/friend-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendRequestController {
    
    @Autowired
    private FriendRequestService friendRequestService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<FriendRequest> sendFriendRequest(@RequestBody Map<String, String> payload, 
                                                           Authentication authentication) {
        String username = authentication.getName();
        User sender = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String receiverId = payload.get("receiverId");
        FriendRequest request = friendRequestService.sendFriendRequest(sender.getId(), receiverId);
        return ResponseEntity.ok(request);
    }
    
    @GetMapping("/received")
    public ResponseEntity<List<FriendRequest>> getReceivedRequests(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<FriendRequest> requests = friendRequestService.getPendingReceivedRequests(user.getId());
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/sent")
    public ResponseEntity<List<FriendRequest>> getSentRequests(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<FriendRequest> requests = friendRequestService.getPendingSentRequests(user.getId());
        return ResponseEntity.ok(requests);
    }
    
    @PostMapping("/{id}/accept")
    public ResponseEntity<FriendRequest> acceptRequest(@PathVariable String id, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        FriendRequest request = friendRequestService.acceptFriendRequest(id, user.getId());
        return ResponseEntity.ok(request);
    }
    
    @PostMapping("/{id}/reject")
    public ResponseEntity<FriendRequest> rejectRequest(@PathVariable String id, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        FriendRequest request = friendRequestService.rejectFriendRequest(id, user.getId());
        return ResponseEntity.ok(request);
    }
}

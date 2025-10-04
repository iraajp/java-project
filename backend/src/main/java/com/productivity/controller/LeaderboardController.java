package com.productivity.controller;

import com.productivity.model.User;
import com.productivity.service.LeaderboardService;
import com.productivity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaderboardController {
    
    @Autowired
    private LeaderboardService leaderboardService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getLeaderboard(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<User> leaderboard = leaderboardService.getFriendsLeaderboard(user.getId());
        return ResponseEntity.ok(leaderboard);
    }
}

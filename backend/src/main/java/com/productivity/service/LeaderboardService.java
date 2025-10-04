package com.productivity.service;

import com.productivity.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {
    
    @Autowired
    private UserService userService;
    
    public List<User> getFriendsLeaderboard(String userId) {
        List<User> friends = userService.getFriends(userId);
        
        // Add the current user to the leaderboard
        User currentUser = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        friends.add(currentUser);
        
        // Sort by XP in descending order
        return friends.stream()
                .sorted(Comparator.comparingInt(User::getXp).reversed())
                .collect(Collectors.toList());
    }
}

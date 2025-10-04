package com.productivity.service;

import com.productivity.model.FriendRequest;
import com.productivity.model.FriendRequest.RequestStatus;
import com.productivity.repository.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FriendRequestService {
    
    @Autowired
    private FriendRequestRepository friendRequestRepository;
    
    @Autowired
    private UserService userService;
    
    public FriendRequest sendFriendRequest(String senderId, String receiverId) {
        // Check if request already exists
        if (friendRequestRepository.existsBySenderIdAndReceiverIdAndStatus(
                senderId, receiverId, RequestStatus.PENDING)) {
            throw new RuntimeException("Friend request already sent");
        }
        
        // Check if they are already friends
        Optional<FriendRequest> existingAccepted = 
                friendRequestRepository.findBySenderIdAndReceiverId(senderId, receiverId);
        if (existingAccepted.isPresent() && 
                existingAccepted.get().getStatus() == RequestStatus.ACCEPTED) {
            throw new RuntimeException("Already friends");
        }
        
        FriendRequest request = new FriendRequest();
        request.setSenderId(senderId);
        request.setReceiverId(receiverId);
        request.setStatus(RequestStatus.PENDING);
        return friendRequestRepository.save(request);
    }
    
    public FriendRequest acceptFriendRequest(String requestId, String userId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friend request not found"));
        
        if (!request.getReceiverId().equals(userId)) {
            throw new RuntimeException("Unauthorized to accept this request");
        }
        
        request.setStatus(RequestStatus.ACCEPTED);
        friendRequestRepository.save(request);
        
        // Add each user to the other's friend list
        userService.addFriend(request.getSenderId(), request.getReceiverId());
        userService.addFriend(request.getReceiverId(), request.getSenderId());
        
        return request;
    }
    
    public FriendRequest rejectFriendRequest(String requestId, String userId) {
        FriendRequest request = friendRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Friend request not found"));
        
        if (!request.getReceiverId().equals(userId)) {
            throw new RuntimeException("Unauthorized to reject this request");
        }
        
        request.setStatus(RequestStatus.REJECTED);
        return friendRequestRepository.save(request);
    }
    
    public List<FriendRequest> getPendingReceivedRequests(String userId) {
        return friendRequestRepository.findByReceiverIdAndStatus(userId, RequestStatus.PENDING);
    }
    
    public List<FriendRequest> getPendingSentRequests(String userId) {
        return friendRequestRepository.findBySenderIdAndStatus(userId, RequestStatus.PENDING);
    }
}

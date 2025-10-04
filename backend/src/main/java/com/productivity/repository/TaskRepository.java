package com.productivity.repository;

import com.productivity.model.Task;
import com.productivity.model.Task.TaskStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);
    List<Task> findByUserIdAndStatus(String userId, TaskStatus status);
    List<Task> findByUserIdOrderByCreatedAtDesc(String userId);
    long countByUserIdAndStatus(String userId, TaskStatus status);
}

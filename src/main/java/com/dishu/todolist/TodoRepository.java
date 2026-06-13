package com.dishu.todolist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByStatus(String status);
}

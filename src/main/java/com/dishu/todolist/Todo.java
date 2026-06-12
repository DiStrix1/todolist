package com.dishu.todolist;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Title can't be empty")
    private String title;
    private String status;
    private String createdAt;
    private String priority;


    public Todo(Long id, String title, String status, String createdAt, String priority) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.createdAt = createdAt;
        this.priority = priority;
    }

    public Todo(){}

    public String getPriority() {
        return priority;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getStatus() {
        return status;
    }

    public String getTitle() {
        return title;
    }

    public Long getId() {
        return id;
    }
}

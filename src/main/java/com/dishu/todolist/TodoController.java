package com.dishu.todolist;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class TodoController {
    @Autowired
    TodoRepository todoRepository;
    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @PostMapping("/addTasks")
    public Todo addTasks(@Valid @RequestBody Todo task){
        return todoRepository.save(task);
    }

    @GetMapping("/showTasks")
    public List<Todo> showTasks(){
        return todoRepository.findAll();
    }

    @GetMapping("/showTasks/{id}")
    public Todo showTask(@PathVariable Long id){
        return todoRepository.findById(id).orElse(null);
    }

    @GetMapping("/showTasks/status/{status}")
    public List<Todo> showTasksStatus(@PathVariable String status){
        return todoRepository.findByStatus(status);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id){
        todoRepository.deleteById(id);
        return "Deleted Successfully";
    }

    @PutMapping("/updateTask/{id}")
    public Todo updateTask(@PathVariable Long id, @Valid @RequestBody Todo task){
        if(!todoRepository.existsById(id)) {
            return null;
        }
        return todoRepository.save(task);
    }
}

package com.example.idea_tracker.controller;

import com.example.idea_tracker.model.Idea;
import com.example.idea_tracker.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin("*")
public class IdeaController {

    @Autowired
    private IdeaService ideaService;

    // Get all ideas
    @GetMapping
    public List<Idea> getAllIdeas() {
        return ideaService.getAllIdeas();
    }

    // Get idea by ID
    @GetMapping("/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable Long id) {
        return ideaService.getIdeaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new idea
    @PostMapping
    public Idea createIdea(@RequestBody Idea idea) {
        return ideaService.createIdea(idea);
    }

    // Update idea
    @PutMapping("/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable Long id, @RequestBody Idea ideaDetails) {
        try {
            Idea updatedIdea = ideaService.updateIdea(id, ideaDetails);
            return ResponseEntity.ok(updatedIdea);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete idea
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdea(@PathVariable Long id) {
        ideaService.deleteIdea(id);
        return ResponseEntity.ok().build();
    }
}
package com.example.idea_tracker.service;

import com.example.idea_tracker.model.Idea;
import java.util.List;
import java.util.Optional;

public interface IdeaService {
    List<Idea> getAllIdeas();
    Optional<Idea> getIdeaById(Long id);
    Idea createIdea(Idea idea);
    Idea updateIdea(Long id, Idea ideaDetails);
    void deleteIdea(Long id);
}
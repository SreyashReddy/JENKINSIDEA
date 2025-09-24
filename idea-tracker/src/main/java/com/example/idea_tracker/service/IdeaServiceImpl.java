package com.example.idea_tracker.service.impl;

import com.example.idea_tracker.model.Idea;
import com.example.idea_tracker.repository.IdeaRepository;
import com.example.idea_tracker.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IdeaServiceImpl implements IdeaService {

    @Autowired
    private IdeaRepository ideaRepository;

    @Override
    public List<Idea> getAllIdeas() {
        return ideaRepository.findAll();
    }

    @Override
    public Optional<Idea> getIdeaById(Long id) {
        return ideaRepository.findById(id);
    }

    @Override
    public Idea createIdea(Idea idea) {
        return ideaRepository.save(idea);
    }

    @Override
    public Idea updateIdea(Long id, Idea ideaDetails) {
        Optional<Idea> optionalIdea = ideaRepository.findById(id);
        if (optionalIdea.isEmpty()) {
            throw new RuntimeException("Idea not found with id: " + id);
        }

        Idea existingIdea = optionalIdea.get();
        existingIdea.setTitle(ideaDetails.getTitle());
        existingIdea.setDescription(ideaDetails.getDescription());

        return ideaRepository.save(existingIdea);
    }

    @Override
    public void deleteIdea(Long id) {
        ideaRepository.deleteById(id);
    }
}
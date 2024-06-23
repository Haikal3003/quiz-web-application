package com.fikry.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fikry.backend.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findQuizByCategory(String category);
}

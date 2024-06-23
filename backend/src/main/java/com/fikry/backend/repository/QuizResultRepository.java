package com.fikry.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fikry.backend.model.QuizResult;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    Optional<QuizResult> findQuizResultByQuizId(Long quizId);
    Optional<QuizResult> findQuizResultByUserId(Long userId);
}

package com.fikry.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fikry.backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}

package com.fikry.backend.service;

import java.util.List;
import java.util.Optional;

import com.fikry.backend.dto.QuestionDTO;

public interface QuestionService {
    public List<QuestionDTO> getAllQuestions();
    public Optional<QuestionDTO> getQuestionById(Long id);
    public QuestionDTO createQuestion(Long quizId, QuestionDTO questionDTO);
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO);
    public void deleteQuestionById(Long id);
}

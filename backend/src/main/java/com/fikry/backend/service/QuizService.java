package com.fikry.backend.service;

import java.util.List;
import java.util.Optional;

import com.fikry.backend.dto.QuizDTO;

public interface QuizService {
    public List<QuizDTO> getAllQuizzes();
    public Optional<QuizDTO> getQuizById(Long id);
    public QuizDTO createQuiz(QuizDTO quizDTO);
    public void deleteQuizById(Long id) ;
    public Optional<QuizDTO> getQuizByCategory(String category);
}

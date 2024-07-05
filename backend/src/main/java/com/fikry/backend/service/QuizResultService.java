package com.fikry.backend.service;

import java.util.List;

import com.fikry.backend.dto.QuizResultDTO;


public interface QuizResultService {
    public List<QuizResultDTO> getAllQuizResults();
    public QuizResultDTO getQuizResultById(Long id);
    public QuizResultDTO createQuizResult(QuizResultDTO quizResultDTO);
    public QuizResultDTO updateQuizResult(Long id, QuizResultDTO quizResultDTO);
    public void deleteQuizResult(Long id);
}

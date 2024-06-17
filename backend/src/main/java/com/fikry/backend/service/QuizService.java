package com.fikry.backend.service;

import com.fikry.backend.model.Questions;
import com.fikry.backend.model.Quiz;
import com.fikry.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public Quiz saveQuiz(Quiz quiz) {
        // Ensure each question is associated with the quiz
        if (quiz.getQuestions() != null) {
            for (Questions question : quiz.getQuestions()) {
                question.setQuiz(quiz);
            }
        }
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }
}

package com.fikry.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fikry.backend.dto.QuestionDTO;
import com.fikry.backend.dto.QuizDTO;
import com.fikry.backend.model.Question;
import com.fikry.backend.model.Quiz;
import com.fikry.backend.repository.QuizRepository;
import com.fikry.backend.service.QuizService;

@Service
public class QuizImpl implements QuizService {

     @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
            .map(this::convertToDtoWithQuestions)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<QuizDTO> getQuizById(Long id) {
        return quizRepository.findById(id)
            .map(this::convertToDtoWithQuestions);
    }

    @Override
    public QuizDTO createQuiz(QuizDTO quizDTO) {
        Quiz quiz = convertToEntity(quizDTO);
        List<Question> questions = convertToEntityQuestions(quizDTO.getQuestions(), quiz);
        quiz.setQuestions(questions);
        Quiz savedQuiz = quizRepository.save(quiz);
        return convertToDtoWithQuestions(savedQuiz);
    }

    @Override
    public void deleteQuizById(Long id) {
        quizRepository.deleteById(id);
    }

    @Override
    public Optional<QuizDTO> getQuizByCategory(String category) {
        return quizRepository.findQuizByCategory(category)
            .map(this::convertToDtoWithQuestions);
    }

    private QuizDTO convertToDtoWithQuestions(Quiz quiz) {
        QuizDTO quizDTO = modelMapper.map(quiz, QuizDTO.class);
        List<QuestionDTO> questionDTOs = quiz.getQuestions().stream()
            .map(question -> modelMapper.map(question, QuestionDTO.class))
            .collect(Collectors.toList());
        quizDTO.setQuestions(questionDTOs);
        return quizDTO;
    }

    private List<Question> convertToEntityQuestions(List<QuestionDTO> questionDTOs, Quiz quiz) {
        return questionDTOs.stream()
            .map(questionDTO -> {
                Question question = modelMapper.map(questionDTO, Question.class);
                question.setQuiz(quiz);
                return question;
            })
            .collect(Collectors.toList());
    }

    private Quiz convertToEntity(QuizDTO quizDTO) {
        return modelMapper.map(quizDTO, Quiz.class);
    }
}

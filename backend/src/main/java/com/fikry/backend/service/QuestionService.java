package com.fikry.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fikry.backend.dto.QuestionDTO;
import com.fikry.backend.model.Question;
import com.fikry.backend.model.Quiz;
import com.fikry.backend.repository.QuestionRepository;
import com.fikry.backend.repository.QuizRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
            .map(question -> modelMapper.map(question, QuestionDTO.class))
            .collect(Collectors.toList());
    }

    public Optional<QuestionDTO> getQuestionById(Long id) {
        return questionRepository.findById(id)
            .map(question -> modelMapper.map(question, QuestionDTO.class));
    }

    public QuestionDTO createQuestion(Long quizId, QuestionDTO questionDTO) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(quizId);
        
        if (!optionalQuiz.isPresent()) {
            throw new RuntimeException("Quiz with id " + quizId + " not found");
        }
        
        Quiz quiz = optionalQuiz.get();
        Question question = modelMapper.map(questionDTO, Question.class);
        question.setQuiz(quiz); 
        Question savedQuestion = questionRepository.save(question);
        return modelMapper.map(savedQuestion, QuestionDTO.class);
    }

    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);

        if (optionalQuestion.isPresent()) {
            Question questionToUpdate = optionalQuestion.get();
            modelMapper.map(questionDTO, questionToUpdate);
            Question savedQuestion = questionRepository.save(questionToUpdate);
            return modelMapper.map(savedQuestion, QuestionDTO.class);
        } else {
            throw new RuntimeException("Question with id " + id + " not found");
        }
    }

    public void deleteQuestionById(Long id) {
        questionRepository.deleteById(id);
    }
}

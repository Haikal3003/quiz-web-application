package com.fikry.backend.service;

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

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
            .map(quiz -> modelMapper.map(quiz, QuizDTO.class))
            .collect(Collectors.toList());
    }

    public Optional<QuizDTO> getQuizById(Long id){
        return quizRepository.findById(id)
            .map(quiz -> modelMapper.map(quiz, QuizDTO.class));
    }

    public QuizDTO createQuiz(QuizDTO quizDTO){
        Quiz quiz = modelMapper.map(quizDTO, Quiz.class);

        if(quizDTO.getQuestions() != null){
            for(QuestionDTO questionDTO : quizDTO.getQuestions()){
                Question question = modelMapper.map(questionDTO, Question.class);
                question.setQuiz(quiz);
                quiz.getQuestions().add(question);
            }           
        }

        Quiz savedQuiz = quizRepository.save(quiz);

        return modelMapper.map(savedQuiz, QuizDTO.class);
    }

    public QuizDTO updateQuiz(Long id, QuizDTO quizDTO){
        Optional<Quiz> optionalQuiz = quizRepository.findById(id);

        if(optionalQuiz.isPresent()){
            Quiz quizToUpdate = optionalQuiz.get();

            quizToUpdate.setTitle(quizDTO.getTitle());
            quizToUpdate.setCategory(quizDTO.getCategory());

            if(quizDTO.getQuestions() != null){
                for(QuestionDTO questionDTO : quizDTO.getQuestions()){
                    if(questionDTO.getId() != null){
                        Optional<Question> optionalQuestion = quizToUpdate.getQuestions().stream()
                                                            .filter(question -> question.getId().equals(questionDTO.getId()))
                                                            .findFirst();

                        if(optionalQuestion.isPresent()){
                            Question question = optionalQuestion.get();
                            modelMapper.map(questionDTO, question);
                        }

                    }else{
                        Question question = modelMapper.map(questionDTO, Question.class);
                        question.setQuiz(quizToUpdate);
                        quizToUpdate.getQuestions().add(question);
                    }
                }
            }

            Quiz savedQuiz = quizRepository.save(quizToUpdate);
            return modelMapper.map(savedQuiz, QuizDTO.class);
        }else{
            throw new RuntimeException("Quiz with id " + id + " not found");
        }
    }

    public void deleteQuizById(Long id){
        quizRepository.deleteById(id);
    }

    public Optional<QuizDTO> getQuizByCategory(String category){
        return quizRepository.findQuizByCategory(category)
                .map(quiz -> modelMapper.map(quiz, QuizDTO.class));
    }
    
}


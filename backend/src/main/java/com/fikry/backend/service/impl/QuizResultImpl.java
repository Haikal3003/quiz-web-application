package com.fikry.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fikry.backend.dto.QuizResultDTO;
import com.fikry.backend.model.Quiz;
import com.fikry.backend.model.QuizResult;
import com.fikry.backend.model.User;
import com.fikry.backend.repository.QuizRepository;
import com.fikry.backend.repository.QuizResultRepository;
import com.fikry.backend.repository.UserRepository;
import com.fikry.backend.service.QuizResultService;

@Service
public class QuizResultImpl implements QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<QuizResultDTO> getAllQuizResults() {
        List<QuizResult> quizResults = quizResultRepository.findAll();
        return quizResults.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public QuizResultDTO getQuizResultById(Long id) {
        Optional<QuizResult> quizResult = quizResultRepository.findById(id);
        return quizResult.map(this::convertToDTO).orElse(null);
    }

    @Override
    public QuizResultDTO createQuizResult(QuizResultDTO quizResultDTO) {
        QuizResult quizResult = convertToEntity(quizResultDTO);
        quizResult.setIsComplete(false); 

        if (quizResult.getUser() == null || quizResult.getQuiz() == null) {
            throw new IllegalArgumentException("User or Quiz not found");
        }

        QuizResult savedQuizResult = quizResultRepository.save(quizResult);

        savedQuizResult.setIsComplete(true);
        QuizResult updatedQuizResult = quizResultRepository.save(savedQuizResult);

        return convertToDTO(updatedQuizResult);
    }

    @Override
    public QuizResultDTO updateQuizResult(Long id, QuizResultDTO quizResultDTO) {
        if (quizResultRepository.existsById(id)) {
            QuizResult quizResult = convertToEntity(quizResultDTO);
            quizResult.setId(id);

            if (quizResult.getUser() == null || quizResult.getQuiz() == null) {
                throw new IllegalArgumentException("User or Quiz not found");
            }

            QuizResult updatedQuizResult = quizResultRepository.save(quizResult);
            return convertToDTO(updatedQuizResult);
        }

        return null;
    }

    @Override
    public void deleteQuizResult(Long id) {
        if (quizResultRepository.existsById(id)) {
            quizResultRepository.deleteById(id);
        }
    }

    private QuizResultDTO convertToDTO(QuizResult quizResult) {
        QuizResultDTO quizResultDTO = modelMapper.map(quizResult, QuizResultDTO.class);
        
        if (quizResult.getUser() != null) {
            quizResultDTO.setUserId(quizResult.getUser().getId());
        }
        if (quizResult.getQuiz() != null) {
            quizResultDTO.setQuizId(quizResult.getQuiz().getId());
        }
        return quizResultDTO;
    }

    private QuizResult convertToEntity(QuizResultDTO quizResultDTO) {
        QuizResult quizResult = modelMapper.map(quizResultDTO, QuizResult.class);
        Optional<User> user = userRepository.findById(quizResultDTO.getUserId());
        Optional<Quiz> quiz = quizRepository.findById(quizResultDTO.getQuizId());

        if (user.isPresent() && quiz.isPresent()) {
            quizResult.setUser(user.get());
            quizResult.setQuiz(quiz.get());
        } else {
            if (!user.isPresent()) {
                throw new IllegalArgumentException("User with ID " + quizResultDTO.getUserId() + " not found");
            }
            if (!quiz.isPresent()) {
                throw new IllegalArgumentException("Quiz with ID " + quizResultDTO.getQuizId() + " not found");
            }
        }
        
        return quizResult;
    }
}

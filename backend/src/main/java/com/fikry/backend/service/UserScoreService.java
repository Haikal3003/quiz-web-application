package com.fikry.backend.service;

import com.fikry.backend.model.UserScore;
import com.fikry.backend.repository.UserScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserScoreService {

    @Autowired
    private UserScoreRepository userScoreRepository;

    public List<UserScore> getAllUsersScore(){
        return userScoreRepository.findAll();
    }

    public UserScore getUserScoreById(Long id){
        return userScoreRepository.findById(id).orElse(null);
    }

    public List<UserScore> getUserScoresByUserId(Long userId) {
        return userScoreRepository.findAll().stream()
                .filter(userScore -> userScore.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public UserScore saveUserScore(UserScore userScore){
        return userScoreRepository.save(userScore);
    }

    public void deleteUserScore(Long id){
        userScoreRepository.deleteById(id);
    }

    public void deleteUserScoreByUserId(Long userId) {
        List<UserScore> deletedUserScore = userScoreRepository.findAll().stream()
                .filter(userScore  -> userScore.getUserId().equals(userId))
                .collect(Collectors.toList());

        userScoreRepository.deleteAll(deletedUserScore);
    }

}

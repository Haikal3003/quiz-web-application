package com.fikry.backend.controller;

import com.fikry.backend.model.UserScore;
import com.fikry.backend.service.UserScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-score")
@CrossOrigin
public class UserScoreController {

    @Autowired
    private UserScoreService userScoreService;

    @GetMapping
    public List<UserScore> getAllUsersScore(){
        return userScoreService.getAllUsersScore();
    }

    @GetMapping("/{id}")
    public UserScore getUserScoreById(@PathVariable Long id){
        return userScoreService.getUserScoreById(id);
    }

    @PutMapping("/{id}")
    public UserScore updateUserScore(@PathVariable Long id, @RequestBody UserScore userScore){
        userScore.setId(id);
        return userScoreService.saveUserScore(userScore);
    }

    @DeleteMapping("/{id}")
    public void deleteUserScoreById(@PathVariable Long id){
        userScoreService.deleteUserScore(id);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteUserScoreByUserId(@PathVariable Long userId){
        userScoreService.deleteUserScoreByUserId(userId);
    }


    @GetMapping("/user/{userId}")
    public List<UserScore> getUserScoreByUserId(@PathVariable Long userId){
        return userScoreService.getUserScoresByUserId(userId);
    }


}

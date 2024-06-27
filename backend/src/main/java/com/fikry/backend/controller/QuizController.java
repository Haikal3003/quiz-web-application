package com.fikry.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fikry.backend.dto.QuizDTO;
import com.fikry.backend.service.QuizService;

@RestController
@RequestMapping("/api/quizzes") 
@CrossOrigin
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping 
    public ResponseEntity<List<QuizDTO>> getAllQuizzes(){
        List<QuizDTO> allQuizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(allQuizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizDTO> getQuizById(@PathVariable Long id){
        Optional<QuizDTO> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<QuizDTO> getQuizByCategory(@PathVariable String category){
        Optional<QuizDTO> quiz = quizService.getQuizByCategory(category);
        return quiz.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    } 

    @PostMapping("/add-quiz") 
    public ResponseEntity<QuizDTO> createQuiz(@RequestBody QuizDTO quizDTO){
        QuizDTO createdQuiz = quizService.createQuiz(quizDTO);
        return ResponseEntity.ok(createdQuiz);
    } 

    @PutMapping("/update/{id}") 
    public ResponseEntity<QuizDTO> updateQuiz(@PathVariable Long id, @RequestBody QuizDTO quizDTO){
        Optional<QuizDTO> updatedQuiz = quizService.getQuizById(id);
        
        if (updatedQuiz.isPresent()) {
            quizDTO.setId(id);
            QuizDTO result = quizService.createQuiz(quizDTO);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}") 
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id){
        quizService.deleteQuizById(id);
        return ResponseEntity.ok("Deleted quiz id " + id + " successfully");
    }
}

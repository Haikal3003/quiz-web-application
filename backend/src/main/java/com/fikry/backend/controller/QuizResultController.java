package com.fikry.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fikry.backend.dto.QuizResultDTO;
import com.fikry.backend.service.QuizResultService;

@RestController
@RequestMapping("/api/quiz-results")
public class QuizResultController {

    @Autowired
    private QuizResultService quizResultService;

    @GetMapping
    public ResponseEntity<List<QuizResultDTO>> getAllQuizResults() {
        List<QuizResultDTO> quizResults = quizResultService.getAllQuizResults();
        return ResponseEntity.ok(quizResults);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResultDTO> getQuizResultById(@PathVariable Long id) {
        QuizResultDTO quizResult = quizResultService.getQuizResultById(id);
        if (quizResult != null) {
            return ResponseEntity.ok(quizResult);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add-quiz-result")
    public ResponseEntity<QuizResultDTO> createQuizResult(@RequestBody QuizResultDTO quizResultDTO) {
        QuizResultDTO createdQuizResult = quizResultService.createQuizResult(quizResultDTO);
        return ResponseEntity.ok(createdQuizResult);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<QuizResultDTO> updateQuizResult(@PathVariable Long id, @RequestBody QuizResultDTO quizResultDTO) {
        QuizResultDTO updatedQuizResult = quizResultService.updateQuizResult(id, quizResultDTO);
        if (updatedQuizResult != null) {
            return ResponseEntity.ok(updatedQuizResult);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteQuizResult(@PathVariable Long id) {
        quizResultService.deleteQuizResult(id);
        return ResponseEntity.ok("Delete quiz result successfully !!!");
    }
}

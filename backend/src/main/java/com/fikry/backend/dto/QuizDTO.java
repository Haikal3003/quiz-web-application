package com.fikry.backend.dto;

import java.util.List;

public class QuizDTO {
    private Long id;
    private String title;
    private String category;
    private List<QuestionDTO> questions;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public List<QuestionDTO> getQuestions() {
        return questions;
    }
    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

    
 
    
}

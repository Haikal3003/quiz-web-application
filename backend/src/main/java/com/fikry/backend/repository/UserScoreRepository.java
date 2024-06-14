package com.fikry.backend.repository;

import com.fikry.backend.model.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserScoreRepository extends JpaRepository<UserScore, Long> {
}

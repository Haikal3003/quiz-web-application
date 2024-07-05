package com.fikry.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fikry.backend.dto.LoginDTO;
import com.fikry.backend.dto.RegisterDTO;
import com.fikry.backend.dto.UserDTO;
import com.fikry.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController  {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO loginDTO){
        try{
            UserDTO loginUser = authService.login(loginDTO);
            return ResponseEntity.ok(loginUser);
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterDTO registerDTO){
        try{
            UserDTO registerUser = authService.register(registerDTO);
            return ResponseEntity.ok(registerUser);
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
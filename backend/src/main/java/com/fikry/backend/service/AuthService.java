package com.fikry.backend.service;


import com.fikry.backend.dto.LoginDTO;
import com.fikry.backend.dto.RegisterDTO;
import com.fikry.backend.dto.UserDTO;


public interface AuthService {
    public UserDTO login(LoginDTO loginDTO);
    public UserDTO register(RegisterDTO registerDTO);
}

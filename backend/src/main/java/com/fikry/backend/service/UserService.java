package com.fikry.backend.service;

import java.util.List;
import java.util.Optional;

import com.fikry.backend.dto.UserDTO;


public interface UserService {
    public List<UserDTO> getAllUsers();
    public Optional<UserDTO> getUserById(Long id);
    public Optional<UserDTO> getUserByUsername(String username);
    public Optional<UserDTO> getUserByEmail(String email);
    public Optional<UserDTO> getUserByRole(String role);
    public void deleteUserById(Long id);
}

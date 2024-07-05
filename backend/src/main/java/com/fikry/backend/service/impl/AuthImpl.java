package com.fikry.backend.service.impl;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fikry.backend.dto.LoginDTO;
import com.fikry.backend.dto.RegisterDTO;
import com.fikry.backend.dto.UserDTO;
import com.fikry.backend.model.User;
import com.fikry.backend.repository.UserRepository;
import com.fikry.backend.service.AuthService;

@Service
public class AuthImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private ModelMapper modelMapper;

   
    @Override
    public UserDTO login(LoginDTO loginDTO){
        Optional<User> optionalUser = userRepository.findByEmail(loginDTO.getEmail());

        if(optionalUser.isPresent() && optionalUser.get().getPassword().equals(loginDTO.getPassword())){
            return modelMapper.map(optionalUser.get(), UserDTO.class);
        }else{
            throw new RuntimeException("Invalid username and password");
        }

    }

    @Override
    public UserDTO register(RegisterDTO registerDTO){
        Optional<User> existingUser = userRepository.findByEmail(registerDTO.getEmail());
        
        if(existingUser.isPresent()){
            throw new RuntimeException("Username already taken");
        }

        User user = modelMapper.map(registerDTO, User.class);

        if(user.getRole() == null || user.getRole().isEmpty()){
            user.setRole("member");
        }

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDTO.class);
    }


}

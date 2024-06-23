package com.fikry.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fikry.backend.dto.UserDTO;
import com.fikry.backend.service.UserService;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/id/{id}")
    public ResponseEntity<Optional<UserDTO>> getUserById(@PathVariable Long id){
        Optional<UserDTO> user = userService.getUserById(id);

        if(user.isPresent()){
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }else{
            return ResponseEntity.notFound().build();
        }
    } 

    @GetMapping("/user/username/{username}")
    public ResponseEntity<Optional<UserDTO>> getUserByUsername(@PathVariable String username){
        Optional<UserDTO> user = userService.getUserByUsername(username);
    
        if(user.isPresent()){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/email/{email}")
    public ResponseEntity<Optional<UserDTO>> getUserByEmail(@PathVariable String email){
        Optional<UserDTO> user = userService.getUserByEmail(email);
    
        if(user.isPresent()){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id){
        Optional<UserDTO> user = userService.getUserById(id);

        if(user.isPresent()){
            userService.deleteUserById(id);
            return ResponseEntity.ok("Delete user successfully");
        }else{
            return ResponseEntity.notFound().build();
        }
    }

}

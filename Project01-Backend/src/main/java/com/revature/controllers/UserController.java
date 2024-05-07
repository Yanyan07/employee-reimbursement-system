package com.revature.controllers;

import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody User user){
        try {
            userService.registerUser(user);
            return ResponseEntity.status(201).body(user.getUsername() + " registered successfully!");
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody IncomingUserDTO userDTO, HttpSession session){
        Optional<User> optionalUser = userService.loginUser(userDTO);
        if(optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body("Failed to login!");
        }
        User user = optionalUser.get();
        session.setAttribute("userId", user.getUserId());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getRole());

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login in to see users");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        return ResponseEntity.ok(userService.allUsers());
    }

    @GetMapping("/session")
    public ResponseEntity<String> getSessionRole(HttpSession session){
        if(session.getAttribute("userId")==null || session.getAttribute("role")==null){
            return ResponseEntity.status(404).body("User Not Found!");
        }
        return ResponseEntity.ok((String)session.getAttribute("role"));
    }

    @DeleteMapping("/{uId}")
    public ResponseEntity<String> deleteUserById(@PathVariable int uId, HttpSession session) {
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login in to see users");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to delete users");
        }
        try{
            userService.deleteUser(uId);
            return ResponseEntity.ok("Delete user with id: " + uId);
        }catch(RuntimeException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("/{uId}")
    public ResponseEntity<String> promoteUser(@PathVariable int uId, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login in to see users");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to promote users");
        }
        try{
            userService.updateUser(uId);
            return ResponseEntity.ok("Promoted user with id: " + uId);
        }catch(RuntimeException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    //for testing
    @PutMapping("/test/{userId}")
    public ResponseEntity<?> setEmpolyeeRole(@PathVariable int userId, String role){
        return ResponseEntity.ok(userService.updateRole(userId, role));
    }


}

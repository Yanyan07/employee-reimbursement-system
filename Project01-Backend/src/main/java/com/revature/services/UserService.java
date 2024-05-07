package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    public User registerUser(User user) throws IllegalArgumentException{
        //firstName lastName username password role
        if(user == null){
            throw new IllegalArgumentException("user can't be empty!");
        }
        if(user.getUsername()==null || user.getUsername().isBlank()){
            throw new IllegalArgumentException("Username can't be empty");
        }
        if(user.getPassword()==null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password can't be empty");
        }
        Optional<User> optionalUser = userDAO.findByUsername(user.getUsername());
        if(optionalUser.isPresent()) {
            throw new IllegalArgumentException("Username is existed");
        }
        if(user.getRole()==null || user.getRole().isBlank()){ //default role "employee"
            user.setRole("employee");
        }
        return userDAO.save(user);
    }

    public Optional<User> loginUser(IncomingUserDTO userDTO) throws IllegalArgumentException{
        if(userDTO.getUsername()==null || userDTO.getUsername().isBlank()){
            throw new IllegalArgumentException("Username can't be empty");
        }
        if(userDTO.getPassword()==null || userDTO.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password can't be empty");
        }

        return userDAO.findByUsernameAndPassword(userDTO.getUsername(), userDTO.getPassword());
    }

    public List<User> allUsers(){
        return userDAO.findAll();
    }

    public void deleteUser(int userId){
        userDAO.deleteById(userId);
    }

    public User updateUser(int userId){
        Optional<User> optionalUser = userDAO.findById(userId);
        if(optionalUser.isEmpty()){
            throw new IllegalArgumentException("can't find user");
        }
        User u = optionalUser.get();
        u.setRole("manager");
        return userDAO.save(u);
    }

    //for testing
    public User updateRole(int userId, String employee){
        Optional<User> optionalUser = userDAO.findById(userId);
        if(optionalUser.isEmpty()){
            throw new IllegalArgumentException("can't find user");
        }
        User u = optionalUser.get();
        u.setRole("employee");
        return userDAO.save(u);
    }


}

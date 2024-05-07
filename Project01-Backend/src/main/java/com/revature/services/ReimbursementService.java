package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private ReimbursementDAO reimbursementDAO;
    private UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO){
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

    public Reimbursement addReimbursement(Reimbursement reimbursement, int userId){
        if(reimbursement == null){
            throw new IllegalArgumentException("reimbursement can't be empty!");
        }
        Optional<User> optionalUser = userDAO.findById(userId);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("User Not Found!");
        }
        reimbursement.setUser(optionalUser.get());
        reimbursement.setStatus("pending");
        return reimbursementDAO.save(reimbursement);
    }

    public List<Reimbursement> getAllReimbursement(int userId, String status){
        List<Reimbursement> allReimbs = reimbursementDAO.findByUserUserId(userId);
        List<Reimbursement> reimbRes = new ArrayList<>();
        if(!"all".equalsIgnoreCase(status)){
            reimbRes = allReimbs.stream()
                    .filter(reim -> reim.getStatus().equalsIgnoreCase(status))
                    .toList();
        }else{
            reimbRes = allReimbs;
        }
        return reimbRes;
    }

    public List<Reimbursement> getAllReimbursementByManager(String status){
        List<Reimbursement> allReimbs = reimbursementDAO.findAll();
        List<Reimbursement> reimbRes = new ArrayList<>();
        if(!"all".equalsIgnoreCase(status)){
            reimbRes = allReimbs.stream()
                    .filter(reim -> reim.getStatus().equalsIgnoreCase(status))
                    .toList();
        }else{
            reimbRes = allReimbs;
        }
        return reimbRes;
    }

    public Reimbursement resolveReimbursement(int reimbId, String status){
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(reimbId);
        if(optionalReimbursement.isEmpty()){
            throw new RuntimeException("optionalReimbursement Not Found!");
        }
        Reimbursement reimbursement = optionalReimbursement.get();
        reimbursement.setStatus(status);
        return reimbursementDAO.save(reimbursement);
    }

    public Reimbursement updateReimbursement(int reimbId, String description, int userId){
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(reimbId);
        if(optionalReimbursement.isEmpty()){
            throw new RuntimeException("optionalReimbursement Not Found!");
        }
        Optional<User> optionalUser = userDAO.findById(userId);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("User Not Found!");
        }
        Reimbursement reimbursement = optionalReimbursement.get();
        if(reimbursement.getUser().getUserId() != userId){
            throw new RuntimeException("current reimbursement not match the user: " + optionalUser.get().getUsername());
        }
        reimbursement.setDescription(description);
        return reimbursementDAO.save(reimbursement);
    }

    public Reimbursement getReimbursementById(int reimbId, int userId){
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(reimbId);
        if(optionalReimbursement.isEmpty()){
            throw new RuntimeException("optionalReimbursement Not Found!");
        }
        Optional<User> optionalUser = userDAO.findById(userId);
        if(optionalUser.isEmpty()){
            throw new RuntimeException("User Not Found!");
        }
        Reimbursement reimbursement = optionalReimbursement.get();
        if(reimbursement.getUser().getUserId() != userId){
            throw new RuntimeException("current reimbursement not match the user: " + optionalUser.get().getUsername());
        }
        return optionalReimbursement.get();
    }

    //for testing
    public Reimbursement backToPending(int reimbId){
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(reimbId);
        if(optionalReimbursement.isEmpty()){
            throw new RuntimeException("optionalReimbursement Not Found!");
        }
        Reimbursement reimbursement = optionalReimbursement.get();

        reimbursement.setStatus("pending");
        return reimbursementDAO.save(reimbursement);
    }


}

package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reimbs")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class ReimbursementController {
    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService){
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<String> addReimbursement(@RequestBody Reimbursement reimbursement, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to post reimbursement!");
        }
        int userId = (int)session.getAttribute("userId");
        try{
            Reimbursement reimb = reimbursementService.addReimbursement(reimbursement, userId);
            return ResponseEntity.status(201).body(reimb.getUser().getUsername() + " posted reimbursement!");
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllReimbursement(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        int userId = (int)session.getAttribute("userId");
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursement(userId,"all");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReimbursement(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        int userId = (int)session.getAttribute("userId");
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursement(userId,"pending");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/denied")
    public ResponseEntity<?> getDeniedReimbursement(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        int userId = (int)session.getAttribute("userId");
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursement(userId,"denied");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/approved")
    public ResponseEntity<?> getProvedReimbursement(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        int userId = (int)session.getAttribute("userId");
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursement(userId,"approved");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/manager")
    public ResponseEntity<?> getAllReimbursementByManager(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursementByManager("all");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/manager/pending")
    public ResponseEntity<?> getPendingReimbursementByManager(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursementByManager("pending");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/manager/denied")
    public ResponseEntity<?> getDeniedReimbursementByManager(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursementByManager("denied");

        return ResponseEntity.ok(reimbs);
    }

    @GetMapping("/manager/approved")
    public ResponseEntity<?> getApprovedReimbursementByManager(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see users");
        }
        List<Reimbursement> reimbs = reimbursementService.getAllReimbursementByManager("approved");

        return ResponseEntity.ok(reimbs);
    }

    @PutMapping("/approved/{reimbId}")
    public ResponseEntity<?> approvedReimbursement(@PathVariable int reimbId, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see resolve a reimbursement");
        }
        try{
            Reimbursement reimbursement = reimbursementService.resolveReimbursement(reimbId, "approved");
            return ResponseEntity.ok(reimbursement);
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/denied/{reimbId}")
    public ResponseEntity<?> deniedReimbursement(@PathVariable int reimbId, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
            return ResponseEntity.status(401).body("Only managers are allowed to see resolve a reimbursement");
        }
        try{
            Reimbursement reimbursement = reimbursementService.resolveReimbursement(reimbId, "denied");
            return ResponseEntity.ok(reimbursement);
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/description/{reimbId}")
    public ResponseEntity<?> updateDescription(@PathVariable int reimbId, @RequestBody String description, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        try{
            Reimbursement reimbursement = reimbursementService.updateReimbursement(reimbId, description, (int)session.getAttribute("userId"));
            return ResponseEntity.ok(reimbursement);
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/{reimbId}")
    public ResponseEntity<?> getReimbursementById(int reimbId, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
        try{
            Reimbursement reimbursement = reimbursementService.getReimbursementById(reimbId, (int)session.getAttribute("userId"));
            return ResponseEntity.ok(reimbursement);
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    //for testing
    @PutMapping("/test/{reimbId}")
    public ResponseEntity<?> backToPending(@PathVariable int reimbId){
        return ResponseEntity.ok(reimbursementService.backToPending(reimbId));
    }



}

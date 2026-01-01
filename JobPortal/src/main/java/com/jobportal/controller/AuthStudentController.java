package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.config.JwtUtil;
import com.jobportal.entity.LoginRequestStudent;
import com.jobportal.service.StudentAuthLogin;
@RestController
@RequestMapping("/api/auth/student/")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthStudentController {
 @Autowired
    private StudentAuthLogin authService;
 @Autowired
    private  JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestStudent request) {

        boolean success = authService.login(request);

       if (!success) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }

    String token = jwtUtil.generateToken(request.getEmail());

    return ResponseEntity.ok(token);
    
}
}


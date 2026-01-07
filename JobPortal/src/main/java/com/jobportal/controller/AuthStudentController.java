package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobportal.config.JwtUtil;
import com.jobportal.entity.LoginRequestStudent;
import com.jobportal.entity.Student;
import com.jobportal.service.StudentAuthLogin;

@RestController
@RequestMapping("/api/auth/student")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthStudentController {

    @Autowired
    private StudentAuthLogin authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestStudent request) {

        Student student = authService.login(request);

        if (student == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        // ✅ USE getId() (as you said)
        String token = jwtUtil.generateStudentToken(
                student.getId(),
                student.getEmail()
        );

        return ResponseEntity.ok(token);
    }
}

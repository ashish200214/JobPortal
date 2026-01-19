package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.entity.Student;
import com.jobportal.repository.StudentRepo;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    @Autowired
    private StudentRepo studentRepo;

    @GetMapping("/me")
    public Student getMyProfile(Authentication authentication) {

        String email = authentication.getName(); // JWT मधून

        return studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
}

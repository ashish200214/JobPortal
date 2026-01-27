package com.jobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.entity.Application;
import com.jobportal.entity.Student;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.StudentRepo;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentApplicationController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ApplicationRepository applicationRepo;

    // GET: /api/student/applications
    @GetMapping("/applications")
    public List<Application> myApplications(Authentication authentication) {

        // 🔐 comes from JWT subject (email)
        String email = authentication.getName();
        System.out.println("Logged in student email: " + email);

        Student student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));

        return applicationRepo.findByStudent(student);
    }
}

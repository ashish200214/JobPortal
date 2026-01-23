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
@RequestMapping("/api/student/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentApplicationController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ApplicationRepository applicationRepo;
@GetMapping
public List<Application> myApplications(Authentication authentication) {

    String email = authentication.getName();
    System.out.println("Logged in email: " + email);

    Student student = studentRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    return applicationRepo.findByStudent(student);
}
    
   }

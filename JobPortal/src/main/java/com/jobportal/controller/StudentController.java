package com.jobportal.controller;

import com.jobportal.entity.Student;
import com.jobportal.repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class StudentController {

    // @Autowired
    // private StudentService studentService;

    @Autowired
    private StudentRepo studentRepo; // ✅ FIX

    // =========================================
    // 🔐 GET LOGGED-IN STUDENT
    // =========================================
    @GetMapping("/me")
    public ResponseEntity<Student> getLoggedInStudent(Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }

        // ✅ EMAIL COMES FROM JWT SUBJECT
        String email = authentication.getName();

        Student student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return ResponseEntity.ok(student);
    }
}

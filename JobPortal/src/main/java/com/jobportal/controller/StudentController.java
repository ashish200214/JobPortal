package com.jobportal.controller;

import org.springframework.web.bind.annotation.RestController;

import com.jobportal.entity.Student;
import com.jobportal.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/me")
    public ResponseEntity<Student> getLoggedInStudent(Authentication authentication) {

        Long studentId = Long.parseLong(authentication.getName());
        Student student = studentService.getStudentById(studentId);

        return ResponseEntity.ok(student);
    }
}

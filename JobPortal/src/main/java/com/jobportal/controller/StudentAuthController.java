package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobportal.config.JwtUtil;
import com.jobportal.dto.StudentLoginDTO;
import com.jobportal.dto.StudentRegisterDTO;
import com.jobportal.entity.Student;
import com.jobportal.service.StudentAuthService;
import com.jobportal.service.StudentService;

@RestController
@RequestMapping("/api/student/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentAuthController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentAuthService studentAuthService;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody StudentRegisterDTO dto) {

        Student student = studentService.register(dto);
        return ResponseEntity.ok(student);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StudentLoginDTO dto) {
        Student student = studentAuthService.login(dto);

        String token = jwtUtil.generateStudentToken(
                student.getId(),
                student.getEmail()
        );
        return ResponseEntity.ok(token);
    }
}

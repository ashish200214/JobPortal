package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.entity.LoginRequestStudent;
import com.jobportal.entity.Student;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentAuthLogin {
@Autowired
    private StudentRepo studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean login(LoginRequestStudent request) {

        Student student = studentRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return passwordEncoder.matches(
                request.getPassword(),   // raw password
                student.getPassword()    // encoded password from DB
        );
    }
}

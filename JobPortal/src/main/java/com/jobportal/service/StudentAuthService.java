package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.StudentLoginDTO;
import com.jobportal.entity.Student;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentAuthService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Student login(StudentLoginDTO dto) {

        Student student = studentRepo
                .findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        boolean match = passwordEncoder.matches(
                dto.getPassword(),
                student.getPassword()
        );

        if (!match) {
            throw new RuntimeException("Invalid password");
        }

        return student;
    }
}

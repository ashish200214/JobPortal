package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.StudentRegisterDTO;
import com.jobportal.entity.Student;
import com.jobportal.mapper.StudentMapper;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =========================
    // REGISTER STUDENT
    // =========================
    public Student register(StudentRegisterDTO dto) {

        Student student = StudentMapper.toEntity(dto);

        // ✅ PASSWORD ENCODING
        student.setPassword(
                passwordEncoder.encode(student.getPassword())
        );

        return studentRepo.save(student);
    }

    // =========================
    // GET STUDENT BY ID
    // =========================
    public Student getStudentById(Long studentId) {

        return studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
}

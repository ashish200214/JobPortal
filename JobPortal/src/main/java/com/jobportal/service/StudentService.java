package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.StudentDTO;
import com.jobportal.entity.Student;
import com.jobportal.mapper.StudentMapper;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ CORRECT

    public void saveStudent(StudentDTO studentDto) {

        Student student = StudentMapper.studentDTOToStudent(studentDto);

        // ✅ PASSWORD ENCODING (WORKS PERMANENTLY)
        String encodedPassword = passwordEncoder.encode(student.getPassword());
        student.setPassword(encodedPassword);

        studentRepo.save(student);
    }
}

package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.config.SecurityConfig;
import com.jobportal.dto.StudentDTO;
import com.jobportal.entity.Student;
import com.jobportal.mapper.StudentMapper;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;
    @Autowired
    SecurityConfig securityConfig;
    public void saveStudent(StudentDTO studentDto) {
        Student student=StudentMapper.studentDTOToStudent(studentDto);
         String encodedPassword = securityConfig.passwordEncoder().encode(student.getPassword());
        student.setPassword(encodedPassword);
        studentRepo.save(student);
    }

}

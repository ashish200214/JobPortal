package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.StudentDTO;
import com.jobportal.entity.Student;
import com.jobportal.mapper.StudentMapper;
import com.jobportal.repository.StudentRepo;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;
    public void saveStudent(StudentDTO studentDto) {
        Student student=StudentMapper.studentDTOToStudent(studentDto);
        studentRepo.save(student);   
    }

}

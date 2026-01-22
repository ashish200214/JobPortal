package com.jobportal.mapper;

import com.jobportal.dto.StudentRegisterDTO;
import com.jobportal.entity.Student;

public class StudentMapper {

    public static Student toEntity(StudentRegisterDTO dto) {

        Student student = new Student();

        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setPassword(dto.getPassword());
        student.setMobileNo(dto.getMobileNo());
        student.setWorkingStatus(dto.getWorkingStatus());

        return student;
    }
}

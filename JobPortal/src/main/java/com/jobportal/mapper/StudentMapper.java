package com.jobportal.mapper;

import com.jobportal.dto.StudentDTO;
import com.jobportal.entity.Student;

public class StudentMapper {
public static Student studentDTOToStudent(StudentDTO studentDTO){
Student student = new Student();
student.setName(studentDTO.getName());
student.setEmail(studentDTO.getEmail());
student.setMobileNo(studentDTO.getMobileNo());
student.setPassword(studentDTO.getPassword());
student.setWorkingStatus(studentDTO.getWorkingStatus());
return student;
}
public static StudentDTO studentToStudentDTO(Student student){
StudentDTO dto = new StudentDTO();
dto.setName(student.getName());
dto.setEmail(student.getEmail());
dto.setMobileNo(student.getMobileNo());
dto.setPassword(student.getPassword());
dto.setWorkingStatus(student.getWorkingStatus());
return dto;
}
}

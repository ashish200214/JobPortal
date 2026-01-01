package com.jobportal.controller;

import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.StudentDTO;
import com.jobportal.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS} //options search gpt
)

public class StudentController {
    @Autowired
    StudentService studentService;
@PostMapping("/register")
public ResponseEntity<StudentDTO> registerStudent(@RequestBody StudentDTO studentDto) {
    studentService.saveStudent(studentDto);
    return ResponseEntity.ok(studentDto);
}

}

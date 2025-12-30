package com.jobportal.controller;

import org.springframework.web.bind.annotation.RestController;

import com.jobportal.entity.Student;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("/api/students/")
public class StudentController {
@PostMapping("")
public void registerStudent(@RequestBody Student student) {
    System.out.println(student.toString());
    
}

}

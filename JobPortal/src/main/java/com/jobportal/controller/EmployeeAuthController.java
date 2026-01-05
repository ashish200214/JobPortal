package com.jobportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.config.JwtUtil;
import com.jobportal.dto.EmployeeLoginDTO;
import com.jobportal.dto.EmployeeRegisterDTO;
import com.jobportal.entity.Employee;
import com.jobportal.repository.JobRepo;
import com.jobportal.service.EmployeeService;

@RestController
@RequestMapping("/api/auth/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeAuthController {

    @Autowired
    private EmployeeService employeeService;
 @Autowired
            JobRepo jobRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody EmployeeRegisterDTO dto) {

        Employee emp = employeeService.register(dto);
        return ResponseEntity.ok(emp);
    }

   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody EmployeeLoginDTO dto) {

    Employee emp = employeeService.login(dto.getEmail(), dto.getPassword());

    String token = jwtUtil.generateToken(emp.getEmpId(), emp.getEmail());

    return ResponseEntity.ok(token);
}


  
}


package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.EmployeeRegisterDTO;
import com.jobportal.entity.Employee;
import com.jobportal.repository.EmployeeRepo;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee register(EmployeeRegisterDTO dto) {

        Employee emp = new Employee();
        emp.setEmail(dto.getEmail());
        emp.setName(dto.getName());
        emp.setCity(dto.getCity());
        emp.setMobileNo(dto.getMobileNo());
        emp.setPassword(passwordEncoder.encode(dto.getPassword()));

        return employeeRepo.save(emp);
    }

    public Employee login(String email, String rawPassword) {

        Employee emp = employeeRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!passwordEncoder.matches(rawPassword, emp.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return emp;
    }

    public Employee getEmployeeById(Long id) {
        
        Employee employee = employeeRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Employee not found"));

        return employee;
    }
}

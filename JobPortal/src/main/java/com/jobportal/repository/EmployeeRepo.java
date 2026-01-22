package com.jobportal.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

}

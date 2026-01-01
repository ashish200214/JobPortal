package com.jobportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Student;

public interface StudentRepo extends JpaRepository<Student,Long>{
        Optional<Student> findByEmail(String email);


}

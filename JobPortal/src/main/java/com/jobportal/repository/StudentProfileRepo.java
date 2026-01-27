package com.jobportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Student;
import com.jobportal.entity.StudentProfile;

public interface StudentProfileRepo extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByStudent(Student student);
}

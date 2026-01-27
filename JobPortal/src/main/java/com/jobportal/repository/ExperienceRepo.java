package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Experience;
import com.jobportal.entity.Student;

public interface ExperienceRepo extends JpaRepository<Experience, Long> {
    List<Experience> findByStudent(Student student);
}

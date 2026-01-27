package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Education;
import com.jobportal.entity.Student;

public interface EducationRepo extends JpaRepository<Education, Long> {

    List<Education> findByStudent(Student student);
}

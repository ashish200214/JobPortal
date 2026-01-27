package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Internship;
import com.jobportal.entity.Student;

public interface InternshipRepo extends JpaRepository<Internship, Long> {

    List<Internship> findByStudent(Student student);
}

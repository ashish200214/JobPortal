package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Project;
import com.jobportal.entity.Student;

public interface ProjectRepo extends JpaRepository<Project, Long> {

    List<Project> findByStudent(Student student);
}

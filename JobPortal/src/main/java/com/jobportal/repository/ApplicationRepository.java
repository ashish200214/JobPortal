package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Application;
import com.jobportal.entity.Job;
import com.jobportal.entity.Student;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    boolean existsByStudentAndJob(Student student, Job job);

    // 🔥 STUDENT APPLIED JOBS
    List<Application> findByStudent(Student student);

    // 🔥 EMPLOYEE → JOB APPLICANTS
    List<Application> findByJob(Job job);
}

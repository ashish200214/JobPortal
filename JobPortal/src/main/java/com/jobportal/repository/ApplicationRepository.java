package com.jobportal.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Application;
import com.jobportal.entity.Student;
import com.jobportal.entity.*;;
public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    boolean existsByStudentAndJob(Student student, Job job);
}

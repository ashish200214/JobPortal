package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.jobportal.entity.Employee;
import com.jobportal.entity.Job;

public interface JobRepo
        extends JpaRepository<Job, Long>,
                JpaSpecificationExecutor<Job> {

    // 🔥 THIS IS THE KEY METHOD
    List<Job> findByEmployee(Employee employee);
}

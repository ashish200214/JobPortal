package com.jobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.jobportal.entity.Job;

public interface JobRepo
        extends JpaRepository<Job, Long>,
                JpaSpecificationExecutor<Job> {
}

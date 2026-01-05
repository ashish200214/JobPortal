package com.jobportal.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Job;

public interface JobRepo extends JpaRepository<Job, Long> {
    List<Job> findByCompanyName(String companyName);
}

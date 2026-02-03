package com.jobportal.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.entity.Employee;
import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepo;
import com.jobportal.specification.JobSpecification;

@Service
public class JobService {

    @Autowired
    private JobRepo jobRepo;

    private static final int DEFAULT_EXPIRY_DAYS = 30;

    // ==========================
    // CREATE / UPDATE JOB
    // ==========================
    public Job save(Job job) {

        // ✅ SAFETY: auto-set expiry date if missing
        if (job.getExpiryDate() == null) {
            job.setExpiryDate(LocalDate.now().plusDays(DEFAULT_EXPIRY_DAYS));
        }

        // default
        job.setExpired(false);

        return jobRepo.save(job);
    }

    // ==========================
    // GET JOB BY ID
    // ==========================
    public Job getJobById(Long id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    // ==========================
    // EMPLOYEE JOBS
    // ==========================
    @Transactional
    public List<Job> getJobsByEmployee(Employee employee) {

        List<Job> jobs = jobRepo.findByEmployee(employee);

        expireOldJobs(jobs);

        return jobs;
    }

    // ==========================
    // PUBLIC JOBS
    // ==========================
    public List<Job> allJobs() {
        return jobRepo.findAll();
    }

    // ==========================
    // SEARCH JOBS (STUDENT)
    // ==========================
    public List<Job> searchJobs(String keyword, String location, String industry, Double salary) {

        Specification<Job> spec = Specification
                .where(JobSpecification.keywordLike(keyword))
                .and(JobSpecification.locationLike(location))
                .and(JobSpecification.industryLike(industry))
                .and(JobSpecification.salaryGreaterThanOrEqual(salary));

        return jobRepo.findAll(spec);
    }

    // ==========================
    // EXPIRY LOGIC (SAFE)
    // ==========================
    private void expireOldJobs(List<Job> jobs) {

        LocalDate today = LocalDate.now();

        for (Job job : jobs) {

            // ✅ NULL SAFE CHECK
            if (job.getExpiryDate() == null) {
                job.setExpiryDate(today.plusDays(DEFAULT_EXPIRY_DAYS));
                job.setExpired(false);
                continue;
            }

            if (!job.isExpired() && job.getExpiryDate().isBefore(today)) {
                job.setExpired(true);
            }
        }

        jobRepo.saveAll(jobs);
    }
}

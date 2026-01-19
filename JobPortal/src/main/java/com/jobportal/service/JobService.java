package com.jobportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.entity.Employee;
import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepo;

@Service
public class JobService {

    @Autowired
    private JobRepo jobRepo;

    public List<Job> allJobs() {
        return jobRepo.findAll();
    }
    public Job getJobById(Long id) {
    return jobRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
}

    public Job save(Job job) {
        return jobRepo.save(job);
    }

    public List<Job> getJobsByEmployee(Employee employee) {
        return jobRepo.findByEmployee(employee);
    }

    public List<Job> searchJobs(String keyword, String location, String industry, Double salary) {
        // your existing spec logic
        return jobRepo.findAll();
    }
}

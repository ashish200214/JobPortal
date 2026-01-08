package com.jobportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepo;
import com.jobportal.specification.JobSpecification;

@Service
public class JobService {

    @Autowired
    private JobRepo jobRepo;

    public List<Job> allJobs() {
        return jobRepo.findAll();
    }

    public List<Job> searchJobs(
            String keyword,
            String location,
            String industry,
            Double salary
    ) {
        Specification<Job> spec = Specification
                .where(JobSpecification.keywordLike(keyword))
                .and(JobSpecification.locationLike(location))
                .and(JobSpecification.industryLike(industry))
                .and(JobSpecification.salaryGreaterThanOrEqual(salary));

        return jobRepo.findAll(spec);
    }
}

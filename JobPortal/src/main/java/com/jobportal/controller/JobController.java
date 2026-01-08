package com.jobportal.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;
import com.jobportal.mapper.JobMapper;
import com.jobportal.repository.JobRepo;
import com.jobportal.service.JobService;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepo jobRepo;

    // ==================================================
    // ✅ PUBLIC – GET ALL JOBS
    // ==================================================
    @GetMapping("/all")
    public List<JobDTO> getAllJobs() {
        return jobService.allJobs()
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());
    }

    // ==================================================
    // 🔍 PUBLIC – SEARCH JOBS
    // ==================================================
    @GetMapping("/search")
    public ResponseEntity<List<JobDTO>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) Double salary
    ) {

        List<JobDTO> jobs = jobService
                .searchJobs(keyword, location, industry, salary)
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
    }

    // ==================================================
    // 🔒 POST JOB – EMPLOYEE ONLY
    // ==================================================
    @PostMapping
    public ResponseEntity<?> addJob(
            @RequestBody JobDTO dto,
            Authentication authentication) {

        // 🔐 Ensure employee is logged in
        if (authentication == null || !(authentication.getPrincipal() instanceof Long)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Job job = JobMapper.jobDTOToJob(dto);

        jobRepo.save(job);

        return ResponseEntity.ok("Job posted successfully");
    }
}

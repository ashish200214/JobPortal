package com.jobportal.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Employee;
import com.jobportal.entity.Job;
import com.jobportal.mapper.JobMapper;
import com.jobportal.repository.SkillRepo;
import com.jobportal.service.EmployeeService;
import com.jobportal.service.JobService;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private SkillRepo skillRepo;

    // ==================================================
    // ✅ PUBLIC – GET ALL JOBS
    // ==================================================
    @GetMapping("/all")
    public ResponseEntity<List<JobDTO>> getAllJobs() {

        List<JobDTO> jobs = jobService.allJobs()
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
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

        if (authentication == null || !(authentication.getPrincipal() instanceof Long)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        Long empId = (Long) authentication.getPrincipal();

        Employee employee = employeeService.getEmployeeById(empId);

        // 🔥 Convert DTO → Entity (skills handled correctly)
        Job job = JobMapper.jobDTOToJob(dto, skillRepo);
        job.setEmployee(employee);

        jobService.save(job);

        return ResponseEntity.ok("Job posted successfully");
    }

    // ==================================================
    // 🔒 EMPLOYEE – MY JOBS
    // ==================================================
    @GetMapping("/my-jobs")
    public ResponseEntity<List<JobDTO>> getMyJobs(Authentication authentication) {

        if (authentication == null || !(authentication.getPrincipal() instanceof Long)) {
            return ResponseEntity.status(403).build();
        }

        Long empId = (Long) authentication.getPrincipal();

        Employee employee = employeeService.getEmployeeById(empId);

        List<JobDTO> jobs = jobService.getJobsByEmployee(employee)
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
    }
}

package com.jobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepo;
import com.jobportal.service.JobService;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobRepo jobRepository;

    @Autowired
private JobService jobService;

    @PostMapping
    public ResponseEntity<?> addJob(
            @RequestBody JobDTO dto,
            Authentication authentication) {

        // ONLY EMPLOYEE CAN POST
        if (authentication == null || !(authentication.getPrincipal() instanceof Long)) {
            return ResponseEntity.status(403)
                    .body("Only logged-in employees can post jobs");
        }

        Long empId = (Long) authentication.getPrincipal();

        Job job = new Job();
        job.setEmp_id(empId);
        job.setJobRole(dto.getJobRole());
        job.setSkills(dto.getSkills());
        job.setDescription(dto.getDescription());
        job.setSalary(dto.getSalary());
        job.setPosition(dto.getPosition());
        job.setCompanyName(dto.getCompanyName());
        job.setMobileNo(dto.getMobileNo());
        job.setCity(dto.getCity());

        jobRepository.save(job);

        return ResponseEntity.ok("Job posted successfully");
    }

    @GetMapping("/search")
public ResponseEntity<List<Job>> searchJobs(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String industry,
        @RequestParam(required = false) Double minSalary,
        @RequestParam(required = false) Double maxSalary
) {
    return ResponseEntity.ok(jobService.searchJobs(
        keyword, location, industry, minSalary, maxSalary
    ));
}

}

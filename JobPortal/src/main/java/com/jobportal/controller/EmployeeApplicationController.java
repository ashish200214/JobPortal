package com.jobportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.entity.Application;
import com.jobportal.entity.ApplicationStatus;
import com.jobportal.repository.ApplicationRepository;

@RestController
@RequestMapping("/api/employee/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeApplicationController {

    @Autowired
    private ApplicationRepository applicationRepo;

    // ==============================
    // GET APPLICANTS FOR A JOB
    // ==============================
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicants(
            @PathVariable Long jobId,
            Authentication authentication
    ) {
        // empId available if you want to add ownership validation later
        Long empId = (Long) authentication.getPrincipal();

        return applicationRepo.findByJobId(jobId);
    }

    // ==============================
    // UPDATE STATUS (ACCEPT / REJECT)
    // ==============================
    @PutMapping("/{applicationId}/status")
    public Application updateStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status
    ) {
        Application app = applicationRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        return applicationRepo.save(app);
    }
}

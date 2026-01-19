package com.jobportal.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.entity.*;
import com.jobportal.repository.*;

@RestController
@RequestMapping("/api/employee/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeApplicationController {

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private ApplicationRepository applicationRepo;

    // ==================================================
    // 👨‍💼 VIEW APPLICANTS FOR A JOB
    // ==================================================
    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicants(
            @PathVariable Long jobId,
            Authentication authentication
    ) {

        Long empId = (Long) authentication.getPrincipal();

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployee().getEmpId().equals(empId)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        List<Application> apps = applicationRepo.findByJob(job);
        return ResponseEntity.ok(apps);
    }

    // ==================================================
    // ✅ SELECT / ❌ REJECT STUDENT
    // ==================================================
    @PostMapping("/{applicationId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status
    ) {

        Application app = applicationRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        applicationRepo.save(app);

        return ResponseEntity.ok("Status updated");
    }
}

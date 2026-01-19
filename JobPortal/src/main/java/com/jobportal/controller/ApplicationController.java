package com.jobportal.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.entity.Application;
import com.jobportal.entity.Job;
import com.jobportal.entity.Student;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepo;
import com.jobportal.repository.StudentRepo;

@RestController
@RequestMapping("/api/student")
public class ApplicationController {

    @Autowired
    private JobRepo jobRepository;

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<?> applyJob(
            @PathVariable Long jobId,
            Authentication authentication
    ) {

        String email = authentication.getName(); // JWT मधून

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ❌ Duplicate apply check
        if (applicationRepository.existsByStudentAndJob(student, job)) {
            return ResponseEntity.badRequest().body("Already applied");
        }

        Application app = new Application();
        app.setStudent(student);
        app.setJob(job);
        app.setAppliedDate(LocalDate.now()); // ✅ NOW WORKS

        applicationRepository.save(app);

        return ResponseEntity.ok("Job applied successfully");
    }
}

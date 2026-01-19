package com.jobportal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.entity.Application;
import com.jobportal.entity.Job;
import com.jobportal.entity.Student;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepo;
import com.jobportal.repository.StudentRepo;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ApplicationRepository applicationRepo;

    // ==================================================
    // 📤 APPLY FOR JOB (PDF RESUME UPLOAD)
    // ==================================================
    @PostMapping(
        value = "/apply/{jobId}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> applyJob(
            @PathVariable Long jobId,
            @RequestParam("resume") MultipartFile resume,
            Authentication authentication
    ) throws IOException {

        // ================= AUTH =================
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        String email = authentication.getName();

        Student student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // ================= DUPLICATE CHECK =================
        if (applicationRepo.existsByStudentAndJob(student, job)) {
            return ResponseEntity.badRequest().body("Already applied");
        }

        // ================= FILE VALIDATION =================
        if (resume == null || resume.isEmpty()) {
            return ResponseEntity.badRequest().body("Resume file is required");
        }

        if (!"application/pdf".equalsIgnoreCase(resume.getContentType())) {
            return ResponseEntity.badRequest().body("Only PDF files are allowed");
        }

        // ================= FILE SAVE =================
        String uploadDir = "uploads/resumes/";
        Files.createDirectories(Paths.get(uploadDir));

        String fileName =
                System.currentTimeMillis() + "_" + resume.getOriginalFilename();

        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, resume.getBytes());

        // ================= SAVE APPLICATION =================
        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);

        // ❌ DO NOT set appliedDate
        // ✅ @CreationTimestamp will handle it

        application.setResumeFileName(fileName);
        application.setResumePath(filePath.toString());

        applicationRepo.save(application);

        return ResponseEntity.ok("Job applied successfully");
    }
}

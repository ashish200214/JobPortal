package com.jobportal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobportal.entity.Application;
import com.jobportal.repository.ApplicationRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeResumeController {

    private final ApplicationRepository applicationRepo;

    @GetMapping("/{applicationId}")
    public ResponseEntity<byte[]> downloadResume(
            @PathVariable Long applicationId
    ) throws IOException {

        Application app = applicationRepo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Path path = Path.of(app.getResumePath());

        byte[] file = Files.readAllBytes(path);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + app.getResumeFileName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                .body(file);
    }
}

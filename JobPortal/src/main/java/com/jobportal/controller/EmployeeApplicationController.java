package com.jobportal.controller;

import java.util.List;
import com.jobportal.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.jobportal.entity.Application;
import com.jobportal.entity.ApplicationStatus;
import com.jobportal.entity.Notification;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.NotificationRepository;

@RestController
@RequestMapping("/api/employee/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeApplicationController {
@Autowired
private EmailService emailService;
@Autowired
private NotificationRepository notificationRepo;

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
        // Long empId = (Long) authentication.getPrincipal();

        return applicationRepo.findByJobId(jobId);
    }

    // ==============================
    //   STATUS (ACCEPT / REJECT)
    
    @PutMapping("/{applicationId}/status")
public Application updateStatus(
        @PathVariable Long applicationId,
        @RequestParam ApplicationStatus status
) {
    Application app = applicationRepo.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

    app.setStatus(status);
    Application savedApp = applicationRepo.save(app);

    // 🔔 CREATE NOTIFICATION FOR STUDENT
    Notification notification = new Notification();
    notification.setStudent(savedApp.getStudent());
    notification.setMessage(
            "Your application for " +
            savedApp.getJob().getJobRole() +
            " is now " + status
    );
    notificationRepo.save(notification);

    // ✅ SEND MAIL ONLY IF SELECTED (YOUR EXISTING LOGIC)
    if (status == ApplicationStatus.SELECTED) {
        emailService.sendSelectionMail(savedApp);
    }

    return savedApp;
}

}

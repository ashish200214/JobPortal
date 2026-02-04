package com.jobportal.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.jobportal.entity.Notification;
import com.jobportal.entity.Student;
import com.jobportal.repository.NotificationRepository;
import com.jobportal.repository.StudentRepo;
@RestController
@RequestMapping("/api/student/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentNotificationController {

    private final NotificationRepository notificationRepo;
    private final StudentRepo studentRepo;

    // ===============================
    // GET ALL NOTIFICATIONS
    // ===============================
    @GetMapping
    public List<Notification> myNotifications(Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return notificationRepo.findByStudentOrderByCreatedAtDesc(student);
    }

    // ===============================
    // UNREAD COUNT
    // ===============================
    @GetMapping("/unread-count")
    public long unreadCount(Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return notificationRepo.countByStudentAndReadFalse(student);
    }

    // ===============================
    // MARK AS READ  ✅ (ADD THIS)
    // ===============================
    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id, Authentication auth) {

        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // 🔐 Safety: ensure student owns this notification
        if (!notification.getStudent().getEmail().equals(auth.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        notification.setRead(true);
        notificationRepo.save(notification);
    }
}

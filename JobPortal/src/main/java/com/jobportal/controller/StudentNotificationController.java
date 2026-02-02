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

    @GetMapping
    public List<Notification> myNotifications(Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow();

        return notificationRepo.findByStudentOrderByCreatedAtDesc(student);
    }

    @GetMapping("/unread-count")
    public long unreadCount(Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow();

        return notificationRepo.countByStudentAndReadFalse(student);
    }
}

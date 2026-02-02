package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Notification;
import com.jobportal.entity.Student;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByStudentOrderByCreatedAtDesc(Student student);

    long countByStudentAndReadFalse(Student student);
}

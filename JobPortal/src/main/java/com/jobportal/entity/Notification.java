package com.jobportal.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private boolean read = false;

    @ManyToOne
    private Student student;

    private LocalDateTime createdAt = LocalDateTime.now();
}

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

    @Column(name = "is_read", nullable = false)
    private boolean read;

    @ManyToOne
    private Student student;

    private LocalDateTime createdAt;
}

package com.jobportal.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
@JsonIgnoreProperties({
    "password",
    "skills",
    "educations",
    "resumeUrl"
})
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties({
    "skills",
    "employee"
    })
    private Job job;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private String resumeFileName;
    private String resumePath;
}

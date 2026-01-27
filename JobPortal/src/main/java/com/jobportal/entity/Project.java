package com.jobportal.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    // OPTIONAL
    private String projectLink;

    // 🔥 THIS WAS MISSING
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // ===== getters & setters =====

}

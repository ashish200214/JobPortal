package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String headline;

    @Column(length = 1000)
    private String summary;

    private String resumePath;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;
}

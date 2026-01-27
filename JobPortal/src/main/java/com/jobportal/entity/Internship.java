package com.jobportal.entity;
import java.time.LocalDate;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;
    private String companyName;

    @Column(length = 2000)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    // OPTIONAL
    private String companyWebsite;

    @ManyToOne
    private Student student;

    // getters & setters
}

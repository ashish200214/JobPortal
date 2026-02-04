package com.jobportal.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobRole;
    private String description;
    private Double salary;
    private Integer openings;
    private String companyName;
    private String mobileNo;
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobCategory category;

    // ✅ EXPIRY
    private LocalDate expiryDate;

    private boolean expired;

    @ManyToMany
    @JoinTable(
        name = "job_skills",
        joinColumns = @JoinColumn(name = "job_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonIgnore
    private Employee employee;

    // ===== COMPANY PROFILE =====
@Column(length = 2000)
private String companyDescription;

private String companyWebsite;

private String companyIndustry;

}

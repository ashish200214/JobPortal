package com.jobportal.entity;

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
    private Integer openings; // ✅ NUMBER OF VACANCIES
    private String companyName;
    private String mobileNo;
    private String city;

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
}

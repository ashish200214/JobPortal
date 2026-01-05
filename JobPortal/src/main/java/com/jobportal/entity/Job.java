package com.jobportal.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity

public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private Long emp_id;
private String jobRole;
@ManyToMany
@JoinTable(
        name = "job_skills",
        joinColumns = @JoinColumn(name = "job_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
private List<Skill> skills;
private String description;
private Double salary;
private Double position;
private String companyName;
private String mobileNo;
private String city;
}

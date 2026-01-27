package com.jobportal.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;
    private String companyName;

    @Column(length = 2000)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate; // null = present

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters & setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}

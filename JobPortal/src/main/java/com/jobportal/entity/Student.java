package com.jobportal.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
private String name;
@Column(unique = true, nullable = false)
private String email;
private String password;
private String mobileNo;
private String workingStatus;
@ManyToMany
 @JoinTable(
    name="student_skills", joinColumns = @JoinColumn(name="student_id"),
    inverseJoinColumns = @JoinColumn(name="skill_id") 
)
private List<Skill> skills;
@Column(length = 1000)
private String profileSummary;

private String resumeUrl; // resume file path


}

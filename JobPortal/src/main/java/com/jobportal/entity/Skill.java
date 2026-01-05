package com.jobportal.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String skillName;
    @ManyToMany(mappedBy = "skills")
private List<Student> students;
@ManyToMany(mappedBy = "skills")
private List<Job> jobs;


}

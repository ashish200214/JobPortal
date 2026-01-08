package com.jobportal.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;   // 🔥 REQUIRED

    @ManyToMany(mappedBy = "skills")
    @JsonIgnore
    private List<Job> jobs;
}

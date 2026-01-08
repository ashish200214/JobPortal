package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
}

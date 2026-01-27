package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // English, Hindi
    private String proficiency; // Fluent, Native

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}

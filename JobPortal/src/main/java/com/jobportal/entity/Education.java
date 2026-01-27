package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String college;
    private String startYear;
    private String endYear;
    private Double percentage;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}

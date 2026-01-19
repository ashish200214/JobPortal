package com.jobportal.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Job job;

    // 🔥 ADD THIS FIELD
    private LocalDate appliedDate;

    // (Optional – if you later add resume upload)
     private String resumeFileName;
     private String resumePath;
}

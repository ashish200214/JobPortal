package com.jobportal.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;

    private String email;
    private String name;
    private String password;
    private String city;
    private String mobileNo;

    @OneToMany(mappedBy = "employee")
    @JsonIgnore
    private List<Job> jobs;
}

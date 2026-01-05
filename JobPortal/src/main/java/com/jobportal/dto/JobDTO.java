package com.jobportal.dto;

import java.util.List;


import com.jobportal.entity.Skill;

import lombok.Data;

@Data
public class JobDTO {
    private String jobRole;
    private List<Skill> skills;
    private String description;
    private Double salary;
    private Double position;
    private String companyName;
    private String mobileNo;
    private String city;
    
}

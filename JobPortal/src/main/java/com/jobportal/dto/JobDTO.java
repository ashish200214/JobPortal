package com.jobportal.dto;

import java.util.List;
import lombok.Data;

@Data
public class JobDTO {
    private Long id;
    private String jobRole;
    private String description;
    private Double salary;
    private Integer openings;
    private String companyName;
    private String mobileNo;
    private String city;

    private List<String> skills;
}


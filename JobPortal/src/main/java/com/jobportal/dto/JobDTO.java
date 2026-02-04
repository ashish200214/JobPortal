package com.jobportal.dto;

import java.time.LocalDate;
import java.util.List;

import com.jobportal.entity.JobCategory;
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

    private JobCategory category;
    private List<String> skills;

    // ✅ EXPIRY INFO
    private LocalDate expiryDate;
    private boolean expired;

    // ✅ ONLY FOR POST JOB
    private Integer expiryDays;
    // ===== COMPANY PROFILE =====
private String companyDescription;
private String companyWebsite;
private String companyIndustry;

}

package com.jobportal.dto;

import java.util.List;

import lombok.Data;

import com.jobportal.entity.*;

@Data
public class StudentDTO {

    private Long id;
    private String name;
    private String email;
    private String mobileNo;
    private String workingStatus;
    private String profileSummary;

    private List<Skill> skills;
    private List<Education> educationList;
    private List<Project> projects;
    private List<Internship> internships;
    private List<Language> languages;
    private List<Accomplishment> accomplishments;
}

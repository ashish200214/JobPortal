package com.jobportal.dto;

import java.util.List;

import com.jobportal.entity.Accomplishment;
import com.jobportal.entity.Internship;
import com.jobportal.entity.Language;
import com.jobportal.entity.Project;
import com.jobportal.entity.Skill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileDTO {

    private Long id;
    private String name;
    private String email;
    private String mobileNo;
    private String workingStatus;

    private String profileSummary;

    private List<Skill> skills;
    private List<Language> languages;
    private List<Internship> internships;
    private List<Project> projects;
    private List<Accomplishment> accomplishments;
}

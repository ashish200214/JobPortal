package com.jobportal.dto;

import java.util.List;

import com.jobportal.entity.Accomplishment;
import com.jobportal.entity.Education;
import com.jobportal.entity.Experience;
import com.jobportal.entity.Internship;
import com.jobportal.entity.Language;
import com.jobportal.entity.Project;
import com.jobportal.entity.Skill;

import lombok.Data;

@Data
public class StudentDTO {

    private Long id;
    private String name;
    private String email;
    private String mobileNo;
    private String workingStatus;
    private String profileSummary;

    // 🔥 resume path / URL (local now, S3 later)
    private String resumeUrl;

    private List<Skill> skills;
    private List<Education> educationList;
    private List<Project> projects;
    private List<Internship> internships;
    private List<Language> languages;
    private List<Accomplishment> accomplishments;
    private List<Experience> experiences;
}

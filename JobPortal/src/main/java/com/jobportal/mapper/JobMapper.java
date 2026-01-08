package com.jobportal.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;
import com.jobportal.entity.Skill;

public class JobMapper {

    // DTO → ENTITY
    public static Job jobDTOToJob(JobDTO dto) {

        if (dto == null) return null;

        Job job = new Job();
        job.setJobRole(dto.getJobRole());
        job.setDescription(dto.getDescription());
        job.setSalary(dto.getSalary());
        job.setOpenings(dto.getOpenings()); // ✅
        job.setCompanyName(dto.getCompanyName());
        job.setMobileNo(dto.getMobileNo());
        job.setCity(dto.getCity());

        if (dto.getSkills() != null) {
            List<Skill> skills = dto.getSkills()
                    .stream()
                    .map(name -> {
                        Skill s = new Skill();
                        s.setName(name);
                        return s;
                    })
                    .collect(Collectors.toList());
            job.setSkills(skills);
        }

        return job;
    }

    // ENTITY → DTO
    public static JobDTO jobToJobDTO(Job job) {

        if (job == null) return null;

        JobDTO dto = new JobDTO();
        dto.setJobRole(job.getJobRole());
        dto.setDescription(job.getDescription());
        dto.setSalary(job.getSalary());
        dto.setOpenings(job.getOpenings()); // ✅
        dto.setCompanyName(job.getCompanyName());
        dto.setMobileNo(job.getMobileNo());
        dto.setCity(job.getCity());

        if (job.getSkills() != null) {
            dto.setSkills(
                job.getSkills()
                    .stream()
                    .map(Skill::getName)
                    .collect(Collectors.toList())
            );
        }

        return dto;
    }
}

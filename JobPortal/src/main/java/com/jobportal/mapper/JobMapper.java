package com.jobportal.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;
import com.jobportal.entity.Skill;
import com.jobportal.repository.SkillRepo;

public class JobMapper {

    // ==================================================
    // DTO → ENTITY (POST JOB)
    // ==================================================
    public static Job jobDTOToJob(JobDTO dto, SkillRepo skillRepo) {

        if (dto == null) return null;

        Job job = new Job();
        job.setJobRole(dto.getJobRole());
        job.setDescription(dto.getDescription());
        job.setSalary(dto.getSalary());
        job.setOpenings(dto.getOpenings());
        job.setCompanyName(dto.getCompanyName());
        job.setMobileNo(dto.getMobileNo());
        job.setCity(dto.getCity());

        // 🔥 FIX: persist or reuse skills
        if (dto.getSkills() != null && !dto.getSkills().isEmpty()) {

            List<Skill> skills = dto.getSkills()
                    .stream()
                    .map(skillName ->
                            skillRepo.findByNameIgnoreCase(skillName)
                                    .orElseGet(() -> {
                                        Skill s = new Skill();
                                        s.setName(skillName);
                                        return skillRepo.save(s);
                                    })
                    )
                    .collect(Collectors.toList());

            job.setSkills(skills);
        }

        return job;
    }

    // ==================================================
    // ENTITY → DTO (GET JOBS)
    // ==================================================
    public static JobDTO jobToJobDTO(Job job) {

        if (job == null) return null;

        JobDTO dto = new JobDTO();
        dto.setJobRole(job.getJobRole());
        dto.setDescription(job.getDescription());
        dto.setSalary(job.getSalary());
        dto.setOpenings(job.getOpenings());
        dto.setCompanyName(job.getCompanyName());
        dto.setMobileNo(job.getMobileNo());
        dto.setCity(job.getCity());

        // 🔁 Convert Skill entities → skill names
        if (job.getSkills() != null && !job.getSkills().isEmpty()) {

            List<String> skills = job.getSkills()
                    .stream()
                    .map(Skill::getName)
                    .collect(Collectors.toList());

            dto.setSkills(skills);
        }

        return dto;
    }
}

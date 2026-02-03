package com.jobportal.mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;
import com.jobportal.entity.Skill;
import com.jobportal.repository.SkillRepo;

public class JobMapper {

    // =========================
    // DTO → ENTITY
    // =========================
    public static Job jobDTOToJob(JobDTO dto, SkillRepo skillRepo) {

        Job job = new Job();

        job.setJobRole(dto.getJobRole());
        job.setDescription(dto.getDescription());
        job.setSalary(dto.getSalary());
        job.setOpenings(dto.getOpenings());
        job.setCompanyName(dto.getCompanyName());
        job.setMobileNo(dto.getMobileNo());
        job.setCity(dto.getCity());
        job.setCategory(dto.getCategory());

        // ✅ EXPIRY LOGIC
        int days = dto.getExpiryDays() != null ? dto.getExpiryDays() : 30;
        job.setExpiryDate(LocalDate.now().plusDays(days));
        job.setExpired(false);

        if (dto.getSkills() != null) {
            List<Skill> skills = dto.getSkills()
                .stream()
                .map(name ->
                    skillRepo.findByNameIgnoreCase(name)
                        .orElseGet(() -> {
                            Skill s = new Skill();
                            s.setName(name);
                            return skillRepo.save(s);
                        })
                )
                .collect(Collectors.toList());
            job.setSkills(skills);
        }

        return job;
    }

    // =========================
    // ENTITY → DTO
    // =========================
    public static JobDTO jobToJobDTO(Job job) {

        JobDTO dto = new JobDTO();

        dto.setId(job.getId());
        dto.setJobRole(job.getJobRole());
        dto.setDescription(job.getDescription());
        dto.setSalary(job.getSalary());
        dto.setOpenings(job.getOpenings());
        dto.setCompanyName(job.getCompanyName());
        dto.setMobileNo(job.getMobileNo());
        dto.setCity(job.getCity());
        dto.setCategory(job.getCategory());
        dto.setExpiryDate(job.getExpiryDate());
        dto.setExpired(job.isExpired());

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

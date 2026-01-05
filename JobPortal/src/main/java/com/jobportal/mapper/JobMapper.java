package com.jobportal.mapper;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Job;

public class JobMapper {
    

    public static Job jobDTOToJob(JobDTO dto){
        if(dto == null) return null;
        Job job = new Job();
        job.setJobRole(dto.getJobRole());
        job.setSkills(dto.getSkills());
        job.setDescription(dto.getDescription());
        job.setSalary(dto.getSalary());
        job.setPosition(dto.getPosition());
        job.setCompanyName(dto.getCompanyName());
        job.setMobileNo(dto.getMobileNo());
        job.setCity(dto.getCity());
        return job;
    }
    
    public static JobDTO jobToJobDTO(Job job){
        if(job == null) return null;
        JobDTO dto = new JobDTO();
        dto.setJobRole(job.getJobRole());
        dto.setSkills(job.getSkills());
        dto.setDescription(job.getDescription());
        dto.setSalary(job.getSalary());
        dto.setPosition(job.getPosition());
        dto.setCompanyName(job.getCompanyName());
        dto.setMobileNo(job.getMobileNo());
        dto.setCity(job.getCity());
        return dto;
    }
    
}

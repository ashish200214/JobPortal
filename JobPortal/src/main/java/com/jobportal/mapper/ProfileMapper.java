package com.jobportal.mapper;

import org.springframework.stereotype.Component;

import com.jobportal.dto.ProfileRequestDto;
import com.jobportal.dto.ProfileResponseDto;
import com.jobportal.entity.Profile;

import lombok.Data;

@Data
@Component
public class ProfileMapper {

    // Dto = Entity

    public Profile dtoToEntity(ProfileRequestDto dto) {
        Profile profile = new Profile();
        profile.setFullName(dto.getFullName());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setSkills(dto.getSkills());
        profile.setExperience(dto.getExperience());
        return profile;
    }


  // Entity → DTO
    public ProfileResponseDto toDto(Profile profile) {

        ProfileResponseDto dto = new ProfileResponseDto();

        dto.setId(profile.getId());
        dto.setFullName(profile.getFullName());
        dto.setEmail(profile.getEmail());
        dto.setPhone(profile.getPhone());
        dto.setSkills(profile.getSkills());
        dto.setExperience(profile.getExperience());
        dto.setResumePath(profile.getResumePath());

        return dto;
    }
}

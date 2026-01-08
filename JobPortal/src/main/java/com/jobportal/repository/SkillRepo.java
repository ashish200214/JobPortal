package com.jobportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.entity.Skill;

public interface SkillRepo extends JpaRepository<Skill, Long> {

    Optional<Skill> findByNameIgnoreCase(String name);
}

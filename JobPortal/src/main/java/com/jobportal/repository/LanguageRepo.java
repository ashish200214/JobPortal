package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Language;
import com.jobportal.entity.Student;

public interface LanguageRepo extends JpaRepository<Language, Long> {

    List<Language> findByStudent(Student student);
}

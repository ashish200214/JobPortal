package com.jobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.entity.Accomplishment;
import com.jobportal.entity.Student;

public interface AccomplishmentRepo extends JpaRepository<Accomplishment, Long> {

    List<Accomplishment> findByStudent(Student student);
}

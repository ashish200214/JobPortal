package com.jobportal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.jobportal.dto.StudentDTO;
import com.jobportal.entity.*;
import com.jobportal.repository.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    private final StudentRepo studentRepo;
    private final SkillRepo skillRepo;
    private final EducationRepo educationRepo;
    private final ProjectRepo projectRepo;
    private final InternshipRepo internshipRepo;
    private final LanguageRepo languageRepo;
    private final AccomplishmentRepo accomplishmentRepo;
    private final ExperienceRepo experienceRepo;

    // ================= RESUME UPLOAD (MULTIPART) =================
    @PostMapping("/upload-resume")
    public String uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication auth) throws IOException {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String uploadDir = "uploads/resumes/";
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = student.getId() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        Files.write(filePath, file.getBytes());

        // 🔥 store path (later replace with S3 URL)
        student.setResumeUrl(filePath.toString());
        studentRepo.save(student);

        return "Resume uploaded successfully";
    }

    // ================= GET PROFILE =================
    @GetMapping("/profile")
    public StudentDTO getStudentProfile(Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setMobileNo(student.getMobileNo());
        dto.setWorkingStatus(student.getWorkingStatus());
        dto.setProfileSummary(student.getProfileSummary());

        // 🔥 resume URL exposed (for now)
        dto.setResumeUrl(student.getResumeUrl());

        dto.setSkills(student.getSkills());
        dto.setEducationList(educationRepo.findByStudent(student));
        dto.setProjects(projectRepo.findByStudent(student));
        dto.setInternships(internshipRepo.findByStudent(student));
        dto.setLanguages(languageRepo.findByStudent(student));
        dto.setAccomplishments(accomplishmentRepo.findByStudent(student));

        // 🔥 experience
        dto.setExperiences(experienceRepo.findByStudent(student));

        return dto;
    }

    // ================= UPDATE PROFILE =================
    @PutMapping("/profile")
    public StudentDTO updateProfile(
            @RequestBody StudentDTO dto,
            Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setName(dto.getName());
        student.setMobileNo(dto.getMobileNo());
        student.setWorkingStatus(dto.getWorkingStatus());
        student.setProfileSummary(dto.getProfileSummary());

        studentRepo.save(student);
        return dto;
    }

    // ================= PROJECT =================
    @PostMapping("/project")
    public Project addProject(@RequestBody Project project, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName()).orElseThrow();
        project.setStudent(student);
        return projectRepo.save(project);
    }

    // ================= INTERNSHIP =================
    @PostMapping("/internship")
    public Internship addInternship(@RequestBody Internship i, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName()).orElseThrow();
        i.setStudent(student);
        return internshipRepo.save(i);
    }

    // ================= ACCOMPLISHMENT =================
    @PostMapping("/accomplishment")
    public Accomplishment addAccomplishment(
            @RequestBody Accomplishment a,
            Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName()).orElseThrow();
        a.setStudent(student);
        return accomplishmentRepo.save(a);
    }

    // ================= EXPERIENCE =================
    @PostMapping("/experience")
    public Experience addExperience(
            @RequestBody Experience exp,
            Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName()).orElseThrow();
        exp.setStudent(student);
        return experienceRepo.save(exp);
    }
}

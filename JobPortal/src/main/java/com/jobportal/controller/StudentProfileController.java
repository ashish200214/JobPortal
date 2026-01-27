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

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    private final StudentRepo studentRepo;
    private final SkillRepo skillRepo;
    private final EducationRepo educationRepo;
    private final ProjectRepo projectRepo;
    private final InternshipRepo internshipRepo;
    private final LanguageRepo languageRepo;
    private final AccomplishmentRepo accomplishmentRepo;

    // ================= RESUME UPLOAD =================
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

        student.setResumeUrl(filePath.toString());
        studentRepo.save(student);

        return "Resume uploaded successfully";
    }

    // ================= GET PROFILE =================
    @GetMapping("/profile")
    public StudentDTO getStudentProfile(Authentication auth) {

        System.out.println("AUTH USER 👉 " + auth.getName());

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setMobileNo(student.getMobileNo());
        dto.setWorkingStatus(student.getWorkingStatus());
        dto.setProfileSummary(student.getProfileSummary());

        dto.setSkills(student.getSkills());
        dto.setEducationList(educationRepo.findByStudent(student));
        dto.setProjects(projectRepo.findByStudent(student));
        dto.setInternships(internshipRepo.findByStudent(student));
        dto.setLanguages(languageRepo.findByStudent(student));
        dto.setAccomplishments(accomplishmentRepo.findByStudent(student));

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

    // ================= SKILLS =================
    @PostMapping("/add-skill")
    public void addSkillByName(
            @RequestParam String skillName,
            Authentication auth) {

        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Skill skill = skillRepo.findByNameIgnoreCase(skillName)
                .orElseGet(() -> {
                    Skill s = new Skill();
                    s.setName(skillName);
                    return skillRepo.save(s);
                });

        if (!student.getSkills().contains(skill)) {
            student.getSkills().add(skill);
            studentRepo.save(student);
        }
    }

    @DeleteMapping("/remove-skill/{skillId}")
    public void removeSkill(@PathVariable Long skillId, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.getSkills().removeIf(s -> s.getId().equals(skillId));
        studentRepo.save(student);
    }

    // ================= EDUCATION =================
    @PostMapping("/education")
    public Education addEducation(@RequestBody Education edu, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        edu.setStudent(student);
        return educationRepo.save(edu);
    }

    @DeleteMapping("/education/{id}")
    public void deleteEducation(@PathVariable Long id) {
        educationRepo.deleteById(id);
    }

    // ================= PROJECT =================
    @PostMapping("/project")
    public Project addProject(@RequestBody Project project, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        project.setStudent(student);
        return projectRepo.save(project);
    }

    @DeleteMapping("/project/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
    }

    // ================= INTERNSHIP =================
    @PostMapping("/internship")
    public Internship addInternship(@RequestBody Internship i, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        i.setStudent(student);
        return internshipRepo.save(i);
    }

    // ================= LANGUAGE =================
    @PostMapping("/language")
    public Language addLanguage(@RequestBody Language l, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        l.setStudent(student);
        return languageRepo.save(l);
    }

    // ================= ACCOMPLISHMENT =================
    @PostMapping("/accomplishment")
    public Accomplishment addAcc(@RequestBody Accomplishment a, Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        a.setStudent(student);
        return accomplishmentRepo.save(a);
    }
}

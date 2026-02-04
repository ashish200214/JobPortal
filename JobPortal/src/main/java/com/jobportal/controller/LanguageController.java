package com.jobportal.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.jobportal.entity.Language;
import com.jobportal.entity.Student;
import com.jobportal.repository.LanguageRepo;
import com.jobportal.repository.StudentRepo;

@RestController
@RequestMapping("/api/student/language")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LanguageController {

    private final LanguageRepo languageRepo;
    private final StudentRepo studentRepo;

    // ✅ ADD LANGUAGE
    @PostMapping
    public Language addLanguage(
            @RequestBody Language language,
            Authentication auth
    ) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        language.setStudent(student);
        return languageRepo.save(language);
    }

    // ✅ GET LANGUAGES
    @GetMapping
    public List<Language> getLanguages(Authentication auth) {
        Student student = studentRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return languageRepo.findByStudent(student);
    }
}

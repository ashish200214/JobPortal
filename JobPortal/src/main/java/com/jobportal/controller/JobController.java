package com.jobportal.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.dto.JobDTO;
import com.jobportal.entity.Application;
import com.jobportal.entity.Employee;
import com.jobportal.entity.Job;
import com.jobportal.entity.Student;
import com.jobportal.mapper.JobMapper;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepo;
import com.jobportal.repository.SkillRepo;
import com.jobportal.repository.StudentRepo;
import com.jobportal.service.EmployeeService;
import com.jobportal.service.JobService;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private SkillRepo skillRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private ApplicationRepository applicationRepo;

    // ==================================================
    // 🔍 PUBLIC – SEARCH JOBS (KEEP FIRST)
    // ==================================================
    @GetMapping("/search")
    public ResponseEntity<List<JobDTO>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String industry,
            @RequestParam(required = false) Double salary
    ) {

        List<JobDTO> jobs = jobService
                .searchJobs(keyword, location, industry, salary)
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
    }

    // ==================================================
    // ✅ PUBLIC – GET ALL JOBS
    // ==================================================
    @GetMapping("/all")
    public ResponseEntity<List<JobDTO>> getAllJobs() {

        List<JobDTO> jobs = jobService.allJobs()
                .stream()
                .map(JobMapper::jobToJobDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(jobs);
    }

    // ==================================================
    // 🔒 POST JOB – EMPLOYEE ONLY
    // ==================================================
    @PostMapping
public ResponseEntity<?> addJob(
        @RequestBody JobDTO dto,
        Authentication authentication) {

    if (authentication == null) {
        return ResponseEntity.status(401).body("Unauthorized");
    }

    String email = authentication.getName(); // ✅ EMAIL FROM JWT

    Employee employee = employeeService.getEmployeeByEmail(email);

    Job job = JobMapper.jobDTOToJob(dto, skillRepo);
    job.setEmployee(employee);

    jobService.save(job);

    return ResponseEntity.ok("Job posted successfully");
}

   @PostMapping(
    value = "/apply/{jobId}",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ResponseEntity<?> applyJob(
        @PathVariable Long jobId,
        @RequestParam("resume") MultipartFile resume,
        Authentication authentication
) throws IOException {

    if (authentication == null) {
        return ResponseEntity.status(401).body("Unauthorized");
    }

    // ✅ EMAIL COMES FROM JWT
    String email = authentication.getName();

    Student student = studentRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Student not found"));

    Job job = jobRepo.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    // ❌ Prevent duplicate apply
    if (applicationRepo.existsByStudentAndJob(student, job)) {
        return ResponseEntity.badRequest().body("Already applied");
    }

    // ✅ Allow only PDF
    if (!"application/pdf".equalsIgnoreCase(resume.getContentType())) {
        return ResponseEntity.badRequest().body("Only PDF resume allowed");
    }

    // 📁 Save resume
    String uploadDir = "uploads/resumes/";
    Files.createDirectories(Paths.get(uploadDir));

    String fileName = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
    Path filePath = Paths.get(uploadDir, fileName);
    Files.write(filePath, resume.getBytes());

    Application app = new Application();
    app.setStudent(student);
    app.setJob(job);
    app.setResumeFileName(fileName);
    app.setResumePath(filePath.toString());

    applicationRepo.save(app);

    return ResponseEntity.ok("Job applied successfully");
}


    // 🔒 EMPLOYEE – MY JOBS
    // ==================================================
  @GetMapping("/my-jobs")
public ResponseEntity<List<JobDTO>> getMyJobs(Authentication authentication) {

    if (authentication == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // ✅ EMAIL FROM JWT
    String email = authentication.getName();

    Employee employee = employeeService.getEmployeeByEmail(email);

    List<JobDTO> jobs = jobService.getJobsByEmployee(employee)
            .stream()
            .map(JobMapper::jobToJobDTO)
            .collect(Collectors.toList());
System.out.println("AUTH = " + authentication);
System.out.println("AUTH NAME = " + (authentication != null ? authentication.getName() : "NULL"));

    return ResponseEntity.ok(jobs);
}



    // ==================================================
    // 📄 PUBLIC – GET SINGLE JOB BY ID (KEEP LAST)
    // ==================================================
   @GetMapping("/{id}")
public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
    Job job = jobService.getJobById(id);
    return ResponseEntity.ok(JobMapper.jobToJobDTO(job));
}

}

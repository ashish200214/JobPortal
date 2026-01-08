package com.jobportal.specification;

import org.springframework.data.jpa.domain.Specification;
import com.jobportal.entity.Job;

public class JobSpecification {

    public static Specification<Job> keywordLike(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return cb.conjunction();
            }
            String like = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("jobRole")), like),
                cb.like(cb.lower(root.get("description")), like)
            );
        };
    }

    public static Specification<Job> locationLike(String location) {
        return (root, query, cb) -> {
            if (location == null || location.trim().isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(
                cb.lower(root.get("city")),
                "%" + location.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Job> industryLike(String industry) {
        return (root, query, cb) -> {
            if (industry == null || industry.trim().isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(
                cb.lower(root.get("companyName")),
                "%" + industry.toLowerCase() + "%"
            );
        };
    }

    // ✅ SINGLE SALARY FILTER
    public static Specification<Job> salaryGreaterThanOrEqual(Double salary) {
        return (root, query, cb) -> {
            if (salary == null) {
                return cb.conjunction(); // no filter
            }
            return cb.greaterThanOrEqualTo(root.get("salary"), salary);
        };
    }
}

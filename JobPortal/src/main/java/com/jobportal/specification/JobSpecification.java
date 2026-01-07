package com.jobportal.specification;


import org.springframework.data.jpa.domain.Specification;
import com.jobportal.entity.Job;

public class JobSpecification {

    public static Specification<Job> keywordLike(String keyword) {
        return (root, query, cb) ->
            keyword == null || keyword.isEmpty()
                ? null
                : cb.or(
                    cb.like(cb.lower(root.get("jobRole")), "%" + keyword.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%")
                );
    }

    public static Specification<Job> locationLike(String location) {
        return (root, query, cb) ->
            location == null || location.isEmpty()
                ? null
                : cb.like(cb.lower(root.get("city")), "%" + location.toLowerCase() + "%");
    }

    public static Specification<Job> industryLike(String industry) {
        return (root, query, cb) ->
            industry == null || industry.isEmpty()
                ? null
                : cb.like(cb.lower(root.get("companyName")), "%" + industry.toLowerCase() + "%");
    }

    public static Specification<Job> salaryBetween(Double min, Double max) {
        return (root, query, cb) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null)
                return cb.between(root.get("salary"), min, max);
            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("salary"), min);
            return cb.lessThanOrEqualTo(root.get("salary"), max);
        };
    }
}

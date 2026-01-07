package com.jobportal.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // 🔐 STATIC SECRET (DO NOT CHANGE)
    private static final String SECRET =
            "jobportal-secret-key-jobportal-secret-key-123456";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    private static final long EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

    // ================= EMPLOYEE TOKEN =================
    public String generateEmployeeToken(Long empId, String email) {
        return Jwts.builder()
                .setSubject(email)
                .claim("empId", empId)
                .claim("role", "EMPLOYEE")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ================= STUDENT TOKEN =================
    public String generateStudentToken(Long studentId, String email) {
        return Jwts.builder()
                .setSubject(email)
                .claim("studentId", studentId)
                .claim("role", "STUDENT")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ================= COMMON =================
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public Long extractEmpId(String token) {
        return extractAllClaims(token).get("empId", Long.class);
    }

    public Long extractStudentId(String token) {
        return extractAllClaims(token).get("studentId", Long.class);
    }

    public boolean validateToken(String token) {
        try {
            return extractAllClaims(token)
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}

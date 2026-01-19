package com.jobportal.config;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    // 🔓 PUBLIC URLs
    private static final List<String> PUBLIC_URLS = List.of(
            "/api/auth/student",
            "/api/auth/employee",
            "/api/students/register",
            "/api/employee/register",
            "/api/job/search",
            "/api/job/all"
    );

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // ✅ Allow OPTIONS
        if (HttpMethod.OPTIONS.matches(method)) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Allow public APIs
        if (PUBLIC_URLS.stream().anyMatch(path::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔐 JWT REQUIRED
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        String token = header.substring(7);

        if (!jwtUtil.validateToken(token)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        String role = jwtUtil.extractRole(token);
        UsernamePasswordAuthenticationToken authentication;

        // ================= STUDENT =================
        if ("STUDENT".equals(role)) {

            String email = jwtUtil.extractAllClaims(token).getSubject();

            authentication = new UsernamePasswordAuthenticationToken(
                    email,               // 🔥 THIS IS USED IN /api/student/me
                    null,
                    Collections.emptyList()
            );
        }
        // ================= EMPLOYEE =================
        else if ("EMPLOYEE".equals(role)) {

            Long empId = jwtUtil.extractEmpId(token);

            authentication = new UsernamePasswordAuthenticationToken(
                    empId,
                    null,
                    Collections.emptyList()
            );
        }
        else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }
}

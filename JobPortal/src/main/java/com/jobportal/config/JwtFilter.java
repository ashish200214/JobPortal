package com.jobportal.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jobportal.entity.Employee;
import com.jobportal.repository.EmployeeRepo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1️⃣ Read Authorization header
        String header = request.getHeader("Authorization");

        // If no token → continue filter chain
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2️⃣ Extract token
        String token = header.substring(7);

        try {
            // 3️⃣ Extract email from token
            String email = jwtUtil.extractEmail(token);

            // 4️⃣ Find employee by email
            Employee emp = employeeRepo.findByEmail(email).orElse(null);

            if (emp != null) {

                // 5️⃣ Extract empId from token
                Long empId = jwtUtil.extractEmpId(token);

                // 6️⃣ Create authentication
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                empId,                     // principal
                                null,
                                Collections.emptyList()    // authorities
                        );

                // 7️⃣ Set authentication in context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception ex) {
            // Invalid / expired token
            SecurityContextHolder.clearContext();
        }

        // 8️⃣ Continue request
        filterChain.doFilter(request, response);
    }
}

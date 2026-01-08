package com.jobportal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            .authorizeHttpRequests(auth -> auth

                // 🔓 PUBLIC AUTH & REGISTRATION
                .requestMatchers(
                    "/api/auth/student/**",
                    "/api/auth/employee/**",
                    "/api/students/register/**",
                    "/api/employee/register/**"
                ).permitAll()

                // 🔓 PUBLIC JOB SEARCH
                .requestMatchers(HttpMethod.GET, "/api/job/**").permitAll()

                // 🔓 PREFLIGHT (CORS)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // 🔒 EVERYTHING ELSE
                .anyRequest().authenticated()
            )

            // JWT FILTER
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ ADD THIS (PERMANENT FIX)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

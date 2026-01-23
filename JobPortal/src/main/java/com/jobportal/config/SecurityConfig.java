package com.jobportal.config;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // ===== BASIC CONFIG =====
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // ===== AUTHORIZATION =====
            .authorizeHttpRequests(auth -> auth

                // 🔓 PUBLIC AUTH
                .requestMatchers(
                        "/api/auth/student/**",
                        "/api/auth/employee/**",
                        "/api/student/auth/**",
                        "/api/employee/register/**"
                ).permitAll()

                // 🔓 PUBLIC JOB READ
                .requestMatchers(HttpMethod.GET, "/api/job/**").permitAll()

                // 🔒 STUDENT ACTIONS
                .requestMatchers(HttpMethod.POST, "/api/job/apply/**").hasRole("STUDENT")
                .requestMatchers("/api/student/**").hasRole("STUDENT")

                // 🔒 EMPLOYEE ACTIONS
                .requestMatchers(HttpMethod.POST, "/api/job").hasRole("EMPLOYEE")
                .requestMatchers("/api/employee/**").hasRole("EMPLOYEE")

                // 🔓 CORS PREFLIGHT
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // 🔒 EVERYTHING ELSE
                .anyRequest().authenticated()
            )

            // ===== JWT FILTER =====
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ===== PASSWORD ENCODER =====
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of("http://localhost:5173"));
    config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
    ));

    // 🔥 THIS IS THE KEY
    config.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "Accept"
    ));

    config.setExposedHeaders(List.of("Authorization"));
    config.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
}
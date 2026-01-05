package com.jobportal.dto;

import lombok.Data;

@Data
public class EmployeeRegisterDTO {
    private String email;
    private String name;
    private String password;
    private String city;
    private String mobileNo;
}

package com.jobportal.dto;

import lombok.Data;

@Data
public class StudentRegisterDTO {

    private String name;
    private String email;
    private String password;
    private String mobileNo;
    private String workingStatus;
}

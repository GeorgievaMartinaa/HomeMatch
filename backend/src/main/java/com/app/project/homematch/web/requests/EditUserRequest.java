package com.app.project.homematch.web.requests;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class EditUserRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String aboutMe;
    private String phoneNumber;
    private LocalDate birthDate;
}

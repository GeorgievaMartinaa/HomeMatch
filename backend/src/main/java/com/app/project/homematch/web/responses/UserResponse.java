package com.app.project.homematch.web.responses;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class UserResponse {
    private String username;
    private String firstName;
    private String lastName;
    private String aboutMe;
    private String email;
    private String phoneNumber;
    private LocalDate birthDate;
    private int age;
}

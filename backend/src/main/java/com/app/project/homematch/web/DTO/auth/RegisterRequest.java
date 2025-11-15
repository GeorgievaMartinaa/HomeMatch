package com.app.project.homematch.web.DTO.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String about;
    private String email;
    private String phoneNumber;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate birthDate;
}

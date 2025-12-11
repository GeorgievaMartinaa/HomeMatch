package com.app.project.homematch.web.requests;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username can only contains letters and numbers")
    private String username;
    @Size(min = 8, message = "Password should be at least 8 characters")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[!@#$%^&+=])(?=\\S+$)(?=.*[A-Z]).*$",
            message = "Password must contain a capital letter, a number, and a special character"
    )
    private String password;
    private String email;
}

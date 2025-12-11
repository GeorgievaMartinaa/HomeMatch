package com.app.project.homematch.web.restController;

import com.app.project.homematch.service.AuthenticationService;
import com.app.project.homematch.web.requests.AuthenticationRequest;
import com.app.project.homematch.web.requests.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request) {

        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyAccount(@RequestParam String token) {

        return new ResponseEntity<>(authService.verifyAccount(token), HttpStatus.OK);
    }

    @GetMapping("/resend-verification")
    public ResponseEntity<Void> resendVerificationToken(@RequestParam String username) {
        authService.resendVerification(username);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

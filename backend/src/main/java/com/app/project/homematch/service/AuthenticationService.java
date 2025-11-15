package com.app.project.homematch.service;

import com.app.project.homematch.web.DTO.auth.AuthenticationRequest;
import com.app.project.homematch.web.DTO.auth.AuthenticationResponse;
import com.app.project.homematch.web.DTO.auth.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest registerRequest);
    AuthenticationResponse authenticate(AuthenticationRequest authRequest);
}

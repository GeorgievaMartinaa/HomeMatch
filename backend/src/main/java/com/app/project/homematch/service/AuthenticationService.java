package com.app.project.homematch.service;

import com.app.project.homematch.web.requests.AuthenticationRequest;
import com.app.project.homematch.web.responses.AuthenticationResponse;
import com.app.project.homematch.web.requests.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest registerRequest);
    AuthenticationResponse authenticate(AuthenticationRequest authRequest);
}

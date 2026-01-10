package com.app.project.homematch.service;

import com.app.project.homematch.web.requests.AuthenticationRequest;
import com.app.project.homematch.web.requests.RegisterRequest;

public interface AuthenticationService {
    void register(RegisterRequest registerRequest);

    String login(AuthenticationRequest authRequest);

    String verifyAccount(String token);

    void resendVerification(String username);
}

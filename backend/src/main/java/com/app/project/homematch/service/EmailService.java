package com.app.project.homematch.service;

public interface EmailService {
    void sendVerificationEmail(String token, String recipientEmail);
}

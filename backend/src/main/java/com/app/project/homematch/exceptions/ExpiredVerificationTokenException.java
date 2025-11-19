package com.app.project.homematch.exceptions;

public class ExpiredVerificationTokenException extends RuntimeException{
    public ExpiredVerificationTokenException() {
        super("This verification token has expired. Please request for new one.");
    }
}

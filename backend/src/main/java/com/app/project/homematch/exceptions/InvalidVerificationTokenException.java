package com.app.project.homematch.exceptions;

public class InvalidVerificationTokenException extends RuntimeException{
    public InvalidVerificationTokenException() {
        super("Invalid verification token");
    }
}

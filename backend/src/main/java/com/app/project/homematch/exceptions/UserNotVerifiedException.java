package com.app.project.homematch.exceptions;

public class UserNotVerifiedException extends RuntimeException{
    public UserNotVerifiedException() {
        super("Account not verified yet");
    }
}

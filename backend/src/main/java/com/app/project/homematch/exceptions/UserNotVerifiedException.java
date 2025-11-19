package com.app.project.homematch.exceptions;

public class UserNotVerifiedException extends RuntimeException{
    public UserNotVerifiedException() {
        super("This account is not verified yet. The verification link in sent to your email address. If you can't find it, please request for new verification link.");
    }
}

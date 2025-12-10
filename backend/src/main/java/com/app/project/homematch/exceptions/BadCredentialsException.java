package com.app.project.homematch.exceptions;

public class BadCredentialsException extends RuntimeException{
    public BadCredentialsException(){
        super("Invalid username or password");
    }
}

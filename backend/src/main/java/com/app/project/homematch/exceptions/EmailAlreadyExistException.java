package com.app.project.homematch.exceptions;

public class EmailAlreadyExistException extends RuntimeException{
    public EmailAlreadyExistException(){
        super("This email already exists in the database");
    }
}

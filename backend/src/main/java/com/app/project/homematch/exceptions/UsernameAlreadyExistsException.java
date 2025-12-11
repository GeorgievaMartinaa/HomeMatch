package com.app.project.homematch.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus()
public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username){
        super(String.format("Username %s already exist.", username));
    }
}

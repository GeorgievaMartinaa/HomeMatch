package com.app.project.homematch.exceptions;


public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException(Long id) {
       super(String.format("Post with id %d not found", id));
    }
}

package com.app.project.homematch.exceptions;

public class NotAnAccommodationPostException extends RuntimeException {
    public NotAnAccommodationPostException() {
        super("Oops! This platform is for accommodation rentals. \n Your post is not related to accommodations");
    }
}

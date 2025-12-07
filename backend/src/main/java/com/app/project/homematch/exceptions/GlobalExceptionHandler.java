package com.app.project.homematch.exceptions;

import com.app.project.homematch.entity.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ErrorResponse handleBadCredentialsException(BadCredentialsException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ErrorResponse handlePostNotFoundException(PostNotFoundException ex) {
        return ErrorResponse.create(ex, HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ExpiredVerificationTokenException.class)
    public ErrorResponse handleExpiredVerificationTokenException(ExpiredVerificationTokenException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserNotVerifiedException.class)
    public ErrorResponse handleUserNotVerifiedException(UserNotVerifiedException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidVerificationTokenException.class)
    public ErrorResponse handleInvalidVerificationTokenException(InvalidVerificationTokenException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handleUserNotFoundException(UserNotFoundException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
        ApiError error = ApiError.builder()
                .httpStatus(HttpStatus.BAD_REQUEST)
                .detail(ex.getMessage())
                .customErrorCode("BAD_USERNAME")
                .build();
        return new ResponseEntity<>(error, error.getHttpStatus());
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<ApiError> handleEmailAlreadyExistException(EmailAlreadyExistException ex) {
        ApiError error = ApiError.builder()
                .httpStatus(HttpStatus.BAD_REQUEST)
                .detail(ex.getMessage())
                .customErrorCode("BAD_EMAIL")
                .build();
        return new ResponseEntity<>(error, error.getHttpStatus());
    }
}

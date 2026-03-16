package com.app.project.homematch.exceptions;

import com.app.project.homematch.entity.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Map<String, List<String>>>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            String field = fieldError.getField();
            String message = fieldError.getDefaultMessage();

            errors.computeIfAbsent(field, key -> new ArrayList<>()).add(message);
        });

        return new ResponseEntity<>(Map.of("errors", errors), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentialsException(BadCredentialsException ex) {
        ApiError error = ApiError.builder()
                .httpStatus(HttpStatus.BAD_REQUEST)
                .customErrorCode("BAD_CREDENTIALS")
                .detail(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, error.getHttpStatus());
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
    public ResponseEntity<ApiError> handleUserNotVerifiedException(UserNotVerifiedException ex) {
        ApiError error = ApiError.builder()
                .httpStatus(HttpStatus.BAD_REQUEST)
                .customErrorCode("USER_NOT_VERIFIED")
                .detail(ex.getMessage())
                .build();

        return new ResponseEntity<>(error, error.getHttpStatus());
    }

    @ExceptionHandler(InvalidVerificationTokenException.class)
    public ErrorResponse handleInvalidVerificationTokenException(InvalidVerificationTokenException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException ex) {
        ApiError error = ApiError.builder()
                .httpStatus(HttpStatus.BAD_REQUEST)
                .customErrorCode("USER_NOT_FOUND")
                .detail(ex.getMessage())
                .build();

        return new ResponseEntity<>(error, error.getHttpStatus());    }

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

    @ExceptionHandler(NotAnAccommodationPostException.class)
    public ErrorResponse handleNotAnAccommodationPostException(NotAnAccommodationPostException ex) {
        return ErrorResponse.create(ex, HttpStatus.BAD_REQUEST, ex.getMessage());
    }
}

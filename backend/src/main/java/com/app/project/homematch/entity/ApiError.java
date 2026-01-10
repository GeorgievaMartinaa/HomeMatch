package com.app.project.homematch.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ApiError {
    private String customErrorCode;
    private HttpStatus httpStatus;
    private String detail;

}

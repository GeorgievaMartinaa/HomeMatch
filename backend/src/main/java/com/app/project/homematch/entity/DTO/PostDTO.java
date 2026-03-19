package com.app.project.homematch.entity.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal price;
    private String currency;
    private Long creatorId;
    private String creatorName;
    private String creatorPhoneNumber;
    private String creatorEmail;
    private String externalApi;
    private String originalPostUrl;
    private LocalDateTime lastTimeUpdated;
    private LocalDateTime createdAt;
}

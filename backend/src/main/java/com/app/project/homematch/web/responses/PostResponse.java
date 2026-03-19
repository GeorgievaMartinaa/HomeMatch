package com.app.project.homematch.web.responses;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
public class PostResponse {
    String id;
    String title;
    String description;
    LocalDateTime lastTimeUpdated;
    LocalDateTime createdAt;
    String location;
    BigDecimal priceAmount;
    String priceCurrency;
    String creatorId;
    String creatorName;
    String creatorEmail;
    String creatorPhoneNumber;
    String fetchedFrom;
    String originalPostUrl;
}

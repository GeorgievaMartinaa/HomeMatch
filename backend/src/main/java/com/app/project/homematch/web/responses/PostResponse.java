package com.app.project.homematch.web.responses;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
public class PostResponse {
    Long id;
    String title;
    String description;
    LocalDateTime lastTimeUpdated;
    String location;
    BigDecimal priceAmount;
    String priceCurrency;
    Long creatorId;
    String fetchedFrom;
    String originalPostUrl;
}

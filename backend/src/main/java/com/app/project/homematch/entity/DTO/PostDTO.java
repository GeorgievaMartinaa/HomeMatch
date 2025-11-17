package com.app.project.homematch.entity.DTO;

import com.app.project.homematch.valueObject.Currency;
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
    private Currency currency;
    private Long creatorId;
    private String externalApi;
    private String originalPostUrl;
    private LocalDateTime lastTimeUpdated;
}

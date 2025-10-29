package com.app.project.homematch.web.DTO;

import com.app.project.homematch.valueObject.Currency;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal price;
    private Currency currency;
    private LocalDate postedOn;
    private Long creatorId;
    private String externalApi;
    private String originalPostUrl;
}

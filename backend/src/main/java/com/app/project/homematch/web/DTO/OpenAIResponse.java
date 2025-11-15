package com.app.project.homematch.web.DTO;

import lombok.Data;

@Data
public class OpenAIResponse {
    private Boolean isAccommodationPost;
    private String location;
    private int price;
    private String currency;
}

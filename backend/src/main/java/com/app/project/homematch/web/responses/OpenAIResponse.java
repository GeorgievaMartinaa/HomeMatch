package com.app.project.homematch.web.responses;

import lombok.Data;

@Data
public class OpenAIResponse {
    private Boolean isAccommodationPost;
    private String location;
    private int price;
    private String currency;
}

package com.app.project.homematch.service.externalAPI;

import com.app.project.homematch.web.responses.OpenAIResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

  private final WebClient openAiWebClient;
  private final ObjectMapper objectMapper;

  public OpenAIService(@Qualifier("openAIWebClient") WebClient openAiWebClient, ObjectMapper objectMapper) {
    this.openAiWebClient = openAiWebClient;
    this.objectMapper = objectMapper;
  }

  public OpenAIResponse analyzePost(String postText) {
    String systemPrompt = """
        You are an AI assistant that analyzes text.
        
        Your task is to determine whether the provided text refers to renting (издавање) or selling (продажба) accommodation (real estate).
        
        You must return a valid JSON object with the following structure:
        
        {
          "isAccommodationPost": boolean,
          "location": string | null,
          "price": number,
          "currency": string | null,
          "category": string | null
        }
        Rules:
        1.Accommodation Detection
          If the text refers to renting or selling residential accommodation (apartment, house, flat, studio, room, etc.), set:
          "isAccommodationPost": true
          Otherwise, set:
          "isAccommodationPost": false
          and return null for "location", "currency", and "category", and 0 for "price".
        2.Location
          Extract the most specific location mentioned (street name, street number, neighborhood, city).
          If no clear location is found, return null.
        3.Price
          Extract the numeric price value only (no text).
          If the price cannot be confidently determined as a number, return 0.
        4.Currency Handling
          If price is in euros → return "EUR".
          If price is in Macedonian denars → return "MKD".
          If price is in another currency → convert it to Macedonian denars (MKD) and return "MKD".
          If currency cannot be determined or is not mentioned → return "NONE".
        5.Category
          If the text refers to renting (e.g., rent, monthly payment, lease, for rent, rental, кирија, наем, издавање) → return "RENT".
          If the text refers to selling (e.g., sale, sell, buying, for sale, продажба, продава) → return "SELL".
          If it is not related to accommodation → return null.
        """;

    Map<String, Object> requestBody = Map.of(
        "model", "gpt-4.1-nano",
        "temperature", 0.2,
        "messages", List.of(
            Map.of("role", "system", "content", systemPrompt),
            Map.of("role", "user", "content", postText)
        )
    );

    String openAiResponse = openAiWebClient.post()
        .bodyValue(requestBody)
        .retrieve()
        .bodyToMono(String.class)
        .block();

    return convertStringToOpenAiResponse(openAiResponse);
  }

  private OpenAIResponse convertStringToOpenAiResponse(String openAiResponse) {

    OpenAIResponse response = new OpenAIResponse();

    try {
      JsonNode root = objectMapper.readTree(openAiResponse);
      String content = root.path("choices").get(0).path("message").path("content").asText();

      response = objectMapper.readValue(content, OpenAIResponse.class);

      System.out.println("Response: " + response);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }

    return response;
  }
}

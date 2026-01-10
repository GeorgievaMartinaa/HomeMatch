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

    //ToDo: Change the systemPrompt to be more precise
    public OpenAIResponse analyzePost (String postText){
        String systemPrompt = """
                Ти си помошник кој анализира текст.
                Твоја задача е да препознаеш дали текстот се однесува за издавање на сместување и да вратиш JSON со:
                isAccommodationPost": true, "location": string, "price": int, "currency": string
                За "location" треба ја препознаеш конкретната локација (улица, број град, населба).
                Ако не можеш со сигурност да ја одредиш цената како број, за "price" врати 0.
                Доколку цената е во евра, за currency стави EUR.
                Доколку цената е во македонски денари, за currency стави MKD.
                Доколку цената е во некоја друга валута, конвертирај ја цената во македонски денари
                и за currency стави MKD.
                Доколку не можеш да ја одредиш валутата или ако нема валута стави NONE.
                Доколку текстот не се однесува за сместување или е напишан од некој кој БАРА сместување,
                врати JSON со "isAccommodationPost": false, и null вредности за "location", "price" и "currency".
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

    private OpenAIResponse convertStringToOpenAiResponse(String openAiResponse){

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

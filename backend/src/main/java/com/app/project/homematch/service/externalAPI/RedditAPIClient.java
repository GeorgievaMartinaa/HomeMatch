package com.app.project.homematch.service.externalAPI;

import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class RedditAPIClient implements ExternalAPIClient {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public RedditAPIClient(@Qualifier("redditWebClient") WebClient webClient, ObjectMapper objectMapper) {
        this.webClient = webClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<FetchedPostDTO> fetchAllNewPosts() {
        String endpoint = "r/mkd/top.json?t=day";

        String response = webClient.get()
                .uri(endpoint)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        List<FetchedPostDTO> posts = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(response);

            JsonNode jsonPostsList = root.path("data").path("children");

            for (JsonNode jsonPost : jsonPostsList) {
                FetchedPostDTO post = new FetchedPostDTO();
                JsonNode data = jsonPost.path("data");

                post.setTitle(data.path("title").asText());
                post.setDescription(data.path("selftext").asText());
                post.setFetchedFrom("Reddit");
                post.setUrlLink(data.path("url").asText());

                posts.add(post);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        return posts;
    }
}

package com.app.project.homematch.service.externalAPI;

import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class RedditAPIClient implements ExternalAPIClient {

    private static final Logger log = LoggerFactory.getLogger(RedditAPIClient.class);

    private static final int PAGE_LIMIT = 20;
    private static final int MAX_PAGES = 20;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public RedditAPIClient(@Qualifier("redditWebClient") WebClient webClient, ObjectMapper objectMapper) {
        this.webClient = webClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<FetchedPostDTO> fetchAllNewPostsWithin24Hours() {
        List<FetchedPostDTO> result = new ArrayList<>();
        String after = null;

        for (int page = 0; page < MAX_PAGES; page++) {
            RedditBatch batch = fetchSinglePage(after);
            List<FetchedPostDTO> recent = filterLast24Hours(batch.posts());
            result.addAll(recent);

            if (recent.size() < batch.posts().size()) {
                return result;
            }
            if (batch.afterCursor() == null || batch.afterCursor().isBlank()) {
                return result;
            }
            after = batch.afterCursor();
        }

        log.warn("Hit {}-page safety cap without crossing the 24h boundary", MAX_PAGES);
        return result;
    }

    private RedditBatch fetchSinglePage(String after) {
        String endpoint = "r/mkd/new.json?limit=" + PAGE_LIMIT;
        if (after != null && !after.isBlank()) {
            endpoint += "&after=" + after;
        }

        String response = webClient.get()
                .uri(endpoint)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        List<FetchedPostDTO> posts = new ArrayList<>();
        String afterCursor;
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode data = root.path("data");
            JsonNode jsonPostsList = data.path("children");

            for (JsonNode jsonPost : jsonPostsList) {
                FetchedPostDTO post = new FetchedPostDTO();
                JsonNode postData = jsonPost.path("data");

                post.setTitle(postData.path("title").asText());
                post.setDescription(postData.path("selftext").asText());
                post.setFetchedFrom("Reddit");
                post.setUrlLink(postData.path("url").asText());
                post.setCreatedAt(postData.path("created_utc").asLong());

                posts.add(post);
            }

            afterCursor = data.path("after").asText(null);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return new RedditBatch(posts, afterCursor);
    }

    private List<FetchedPostDTO> filterLast24Hours(List<FetchedPostDTO> posts) {
        long cutoff = Instant.now().minus(24, ChronoUnit.HOURS).getEpochSecond();
        List<FetchedPostDTO> result = new ArrayList<>();
        for (FetchedPostDTO post : posts) {
            if (post.getCreatedAt() < cutoff) {
                break;
            }
            result.add(post);
        }
        return result;
    }

    private record RedditBatch(List<FetchedPostDTO> posts, String afterCursor) {}
}

package com.app.project.homematch.service.externalAPI;

import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class RedditAPIClient implements ExternalAPIClient {

    private static final Logger log = LoggerFactory.getLogger(RedditAPIClient.class);

    // Reddit's max page size. The RSS feed has no pagination cursor, so this single
    // request is all we get — fine for a small subreddit's 24h window.
    private static final int FEED_LIMIT = 25;

    private final WebClient webClient;
    private final XmlMapper xmlMapper;

    public RedditAPIClient(@Qualifier("redditWebClient") WebClient webClient) {
        this.webClient = webClient;
        this.xmlMapper = (XmlMapper) new XmlMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public List<FetchedPostDTO> fetchAllNewPostsWithin24Hours() {
        String xml = webClient.get()
                .uri("r/mkd/new/.rss?limit=" + FEED_LIMIT)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        AtomFeed feed;
        try {
            feed = xmlMapper.readValue(xml, AtomFeed.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse Reddit RSS feed", e);
        }

        List<FetchedPostDTO> posts = new ArrayList<>();
        for (AtomEntry entry : feed.entries) {
            FetchedPostDTO post = new FetchedPostDTO();
            post.setTitle(entry.title);
            post.setDescription(entry.content);
            post.setFetchedFrom("Reddit");
            post.setUrlLink(entry.link != null ? entry.link.href : null);

            String timestamp = entry.published != null ? entry.published : entry.updated;
            post.setCreatedAt(OffsetDateTime.parse(timestamp).toEpochSecond());

            posts.add(post);
        }

        return filterLast24Hours(posts);
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

    // --- Minimal Atom feed mapping (Reddit serves new/.rss as Atom) ---

    @JacksonXmlRootElement(localName = "feed")
    private static class AtomFeed {
        @JacksonXmlProperty(localName = "entry")
        @JacksonXmlElementWrapper(useWrapping = false)
        public List<AtomEntry> entries = new ArrayList<>();
    }

    private static class AtomEntry {
        public String title;
        public String content;   // <content type="html">…</content> — HTML markup
        public String published; // ISO-8601, e.g. 2026-06-29T12:00:00+00:00
        public String updated;   // fallback if published is absent
        @JacksonXmlProperty(localName = "link")
        public AtomLink link;
    }

    private static class AtomLink {
        @JacksonXmlProperty(isAttribute = true)
        public String href;
    }
}

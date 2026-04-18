package com.app.project.homematch.service.scheduler;

import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.externalAPI.ExternalAPIClient;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.entity.DTO.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExternalApiScheduler {

  private final List<ExternalAPIClient> externalAPIs;
  private final PostService postService;

  public ExternalApiScheduler(List<ExternalAPIClient> externalAPIs, PostService postService) {
    this.externalAPIs = externalAPIs;
    this.postService = postService;
  }

  @Scheduled(cron = "${scheduler.fetch-posts.cron}")
  public void fetchNewData() {
    System.out.println("Scheduler fetching posts starting ...");
    List<FetchedPostDTO> allPosts = new ArrayList<>();
    for (ExternalAPIClient externalAPI : externalAPIs) {
      try {
        allPosts.addAll(externalAPI.fetchAllNewPostsWithin24Hours());
      } catch (Exception e) {
        System.out.printf("Fetch failed for %s: %s\n",
            externalAPI.getClass().getSimpleName(), e.getMessage());
      }
    }

    System.out.printf("Fetching posts finished. Fetched %d posts\n", allPosts.size());

    List<PostDTO> relevantPosts = new ArrayList<>();

    for (FetchedPostDTO post : allPosts) {
      try {
        String postText = getPostText(post);
        OpenAIResponse response = postService.analyzePost(postText);
        if (response.getIsAccommodationPost()) {
          relevantPosts.add(PostMapper.toDTO(post, response));
        }
      } catch (Exception e) {
        System.out.printf("Failed to analyze post %s: %s\n", post.getUrlLink(), e.getMessage());
      }
    }

    System.out.printf("Relevant posts: %d\n", relevantPosts.size());

    for (PostDTO postDTO : relevantPosts) {
      try {
        postService.newFetchedPost(postDTO);
      } catch (Exception e) {
        System.out.printf("Failed to save post %s: %s\n", postDTO.getOriginalPostUrl(), e.getMessage());
      }
    }
  }

  private String getPostText(FetchedPostDTO post) {
    return String.format(post.getTitle() + "\n" + post.getDescription());
  }
}

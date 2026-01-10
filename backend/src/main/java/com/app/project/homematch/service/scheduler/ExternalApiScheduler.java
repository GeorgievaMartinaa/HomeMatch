package com.app.project.homematch.service.scheduler;

import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.externalAPI.ExternalAPIClient;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.entity.DTO.PostDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalApiScheduler {

    private final List<ExternalAPIClient> externalAPIs;
    private final PostService postService;

    public ExternalApiScheduler(List<ExternalAPIClient> externalAPIs, PostService postService) {
        this.externalAPIs = externalAPIs;
        this.postService = postService;
    }

    public void fetchNewData() {
        List<FetchedPostDTO> allPosts = new ArrayList<>();
        for (ExternalAPIClient externalAPI : externalAPIs) {
            allPosts.addAll(externalAPI.fetchAllNewPosts());
        }

        List<PostDTO> relevantPosts = new ArrayList<>();

        allPosts.forEach(post -> {
            String postText = getPostText(post);

            OpenAIResponse response = postService.analyzePost(postText);
            if (response.getIsAccommodationPost()) {
                relevantPosts.add(PostMapper.toDTO(post, response));
            }
        });

        relevantPosts.forEach(postService::newFetchedPost);
    }

    private String getPostText(FetchedPostDTO post) {
        return post.getTitle() + post.getDescription();
    }

}

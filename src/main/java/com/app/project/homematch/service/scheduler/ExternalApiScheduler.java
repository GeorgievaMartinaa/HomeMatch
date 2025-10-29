package com.app.project.homematch.service.scheduler;

import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.externalAPI.ExternalAPIClient;
import com.app.project.homematch.web.DTO.FetchedPostDTO;
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

    public String fetchNewData(){
        // fetch data from each externalAPIs
        List<FetchedPostDTO> allPosts = new ArrayList<>();
        for(ExternalAPIClient externalAPI : externalAPIs){
            allPosts.addAll(externalAPI.fetchAllNewPosts());
        }

        //convert to PostDTO

        //filter data

        //save filtered data

        return null;
    }

}

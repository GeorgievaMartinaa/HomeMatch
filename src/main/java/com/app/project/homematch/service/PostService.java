package com.app.project.homematch.service;

import com.app.project.homematch.web.DTO.FormPostRequest;
import com.app.project.homematch.web.DTO.OpenAIResponse;
import com.app.project.homematch.web.DTO.PostDTO;

public interface PostService {
    OpenAIResponse analyzePost(String text);
    void savePost(PostDTO filteredPosts);
    PostDTO createNewPost(FormPostRequest formPostRequest, OpenAIResponse response);
}

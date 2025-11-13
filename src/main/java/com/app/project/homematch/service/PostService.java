package com.app.project.homematch.service;

import com.app.project.homematch.web.DTO.FormPostRequest;
import com.app.project.homematch.web.DTO.OpenAIResponse;
import com.app.project.homematch.web.DTO.PostDTO;

public interface PostService {
    void newPostFromRequest(FormPostRequest postRequest, OpenAIResponse aiResponse);

    void newFetchedPost(PostDTO postDTO);

    OpenAIResponse analyzePost(String text);
}

package com.app.project.homematch.service;

import com.app.project.homematch.web.requests.FormPostRequest;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.entity.DTO.PostDTO;

public interface PostService {
    void newPostFromRequest(FormPostRequest postRequest, OpenAIResponse aiResponse);

    void newFetchedPost(PostDTO postDTO);

    OpenAIResponse analyzePost(String text);
}

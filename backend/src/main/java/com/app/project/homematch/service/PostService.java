package com.app.project.homematch.service;

import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.web.requests.FormPostRequest;
import com.app.project.homematch.web.responses.OpenAIResponse;
import org.springframework.data.domain.Page;

public interface PostService {

  void newPostFromRequest(FormPostRequest postRequest, OpenAIResponse aiResponse);

  void newFetchedPost(PostDTO postDTO);

  OpenAIResponse analyzePost(String text);

  Page<PostDTO> getAllPosts(int pageSize, int pageNumber, String sortDirection, String sortBy, String location);

  PostDTO getById(Long postId);

  Page<PostDTO> getAllPostsByUser(int pageSize, int pageNumber, String username);

  void editPost(FormPostRequest postRequest, OpenAIResponse aiResponse, Long postId);

  Boolean isPostOwner(Long postId, String username);

  void deletePost(Long postId);
}

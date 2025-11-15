package com.app.project.homematch.service.impl;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.repository.PostRepository;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.externalAPI.OpenAIService;
import com.app.project.homematch.valueObject.Currency;
import com.app.project.homematch.web.DTO.FormPostRequest;
import com.app.project.homematch.web.DTO.OpenAIResponse;
import com.app.project.homematch.web.DTO.PostDTO;
import com.app.project.homematch.web.DTO.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final OpenAIService openAIService;
    private final UserService userService;
    private final PostRepository postRepository;

    @Transactional
    @Override
    public void newPostFromRequest(FormPostRequest postRequest, OpenAIResponse aiResponse) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO userDto = userService.findByUsername(username);

        PostDTO post = PostDTO.builder()
                .title(postRequest.getTitle())
                .description(postRequest.getDescription())
                .location(aiResponse.getLocation())
                .price(BigDecimal.valueOf(aiResponse.getPrice()))
                .currency(Currency.valueOf(aiResponse.getCurrency()))
                .creatorId(userDto.getId())
                .build();

        createNewPost(post);
    }

    @Override
    public void newFetchedPost(PostDTO postDTO) {
        createNewPost(postDTO);
    }

    private void createNewPost(PostDTO postDTO) {
        Post post = Post.create(postDTO);

        postRepository.save(post);
    }

    @Override
    public OpenAIResponse analyzePost(String text) {
        return openAIService.analyzePost(text);
    }


}

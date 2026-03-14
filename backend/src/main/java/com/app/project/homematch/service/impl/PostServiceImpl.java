package com.app.project.homematch.service.impl;

import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.entity.Post;
import com.app.project.homematch.exceptions.PostNotFoundException;
import com.app.project.homematch.repository.PostProjection;
import com.app.project.homematch.repository.PostRepository;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.externalAPI.OpenAIService;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.web.requests.FormPostRequest;
import com.app.project.homematch.web.responses.OpenAIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserDTO userDto = userService.findByUsername(username);

        PostDTO post = PostDTO.builder()
                .title(postRequest.getTitle())
                .description(postRequest.getDescription())
                .location(aiResponse.getLocation())
                .price(BigDecimal.valueOf(aiResponse.getPrice()))
                .currency(aiResponse.getCurrency())
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

    @Override
    public Page<PostDTO> getAllPosts(int pageSize, int pageNumber, String sortDirection, String sortBy, String location ) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.valueOf(sortDirection), sortBy));

        Page<Post> posts = postRepository.findAllByLocationContains(location,pageRequest);

        return posts.map(PostMapper::toDTO);
    }

    @Override
    public PostDTO getById(Long postId) {
        PostProjection post = postRepository.getById(postId).orElseThrow(()-> new PostNotFoundException(postId));
        return PostMapper.toDTO(post);
    }

    @Override
    public Page<PostDTO> getAllPostsByUser(int pageSize, int pageNumber, String username) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdDate"));
        UserDTO userDto = userService.findByUsername(username);

        Page<Post> postsByUser = postRepository.findAllByCreatorId(userDto.getId(), pageRequest);

        return postsByUser.map(PostMapper::toDTO);
    }


}

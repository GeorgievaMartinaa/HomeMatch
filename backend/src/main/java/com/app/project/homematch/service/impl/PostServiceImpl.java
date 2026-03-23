package com.app.project.homematch.service.impl;

import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.entity.Post;
import com.app.project.homematch.exceptions.PostNotFoundException;
import com.app.project.homematch.repository.PostRepository;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.externalAPI.OpenAIService;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.valueObject.PostCategory;
import com.app.project.homematch.valueObject.PostId;
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
        .category(aiResponse.getCategory())
        .creatorId(userDto.getId())
        .build();

    createNewPost(post);
  }

  @Override
  @Transactional(readOnly = true)
  public void newFetchedPost(PostDTO postDTO) {
    createNewPost(postDTO);
  }

  private void createNewPost(PostDTO postDTO) {
    Post post = Post.create(postDTO);

    postRepository.save(post);
  }

  @Override
  @Transactional(readOnly = true)
  public OpenAIResponse analyzePost(String text) {
    return openAIService.analyzePost(text);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<PostDTO> getAllPosts(int pageSize, int pageNumber, String sortDirection, String sortBy, String location, String category) {
    PageRequest pageRequest = PageRequest.of(pageNumber, pageSize,
        Sort.by(Sort.Direction.valueOf(sortDirection), sortBy));

    Page<Post> posts;
    if (category != null) {
      posts = postRepository.findAllByLocationContainsAndCategory(location, PostCategory.valueOf(category), pageRequest);
    } else {
      posts = postRepository.findAllByLocationContains(location, pageRequest);
    }

    return posts.map(PostMapper::toDTO);
  }

  @Override
  @Transactional(readOnly = true)
  public PostDTO getById(Long postId) {
    Post post = postRepository.getById(postId).orElseThrow(() -> new PostNotFoundException(postId));
    if (post.getCreatorId() != null) {
      UserDTO userDTO = userService.findById(post.getCreatorId());
      return PostMapper.toDTO(post, userDTO);
    }
    return PostMapper.toDTO(post);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<PostDTO> getAllPostsByUser(int pageSize, int pageNumber, String username, String category) {
    PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "createdDate"));
    UserDTO userDto = userService.findByUsername(username);

    Page<Post> postsByUser;
    if (category != null) {
      postsByUser = postRepository.findAllByCreatorIdAndCategory(userDto.getId(), PostCategory.valueOf(category), pageRequest);
    } else {
      postsByUser = postRepository.findAllByCreatorId(userDto.getId(), pageRequest);
    }

    return postsByUser.map(PostMapper::toDTO);
  }

  @Override
  @Transactional
  public void editPost(FormPostRequest postRequest, OpenAIResponse aiResponse, Long postId) {
    Post post = postRepository.findById(PostId.toPostId(postId)).orElseThrow(() -> new PostNotFoundException(postId));
    post.update(postRequest.getTitle(), postRequest.getDescription(), aiResponse.getLocation(), aiResponse.getPrice(),
        aiResponse.getCurrency(), aiResponse.getCategory());
  }

  @Override
  @Transactional(readOnly = true)
  public Boolean isPostOwner(Long postId, String username) {
    return postRepository.existsByIdAndCreator(postId, username) ;
  }

  @Override
  @Transactional
  public void deletePost(Long postId) {
    postRepository.deleteById(PostId.toPostId(postId));
  }
}

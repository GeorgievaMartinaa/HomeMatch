package com.app.project.homematch.service.impl;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.entity.User;
import com.app.project.homematch.repository.PostRepository;
import com.app.project.homematch.repository.UserRepository;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.externalAPI.OpenAIService;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.valueObject.UserId;
import com.app.project.homematch.web.DTO.FormPostRequest;
import com.app.project.homematch.web.DTO.OpenAIResponse;
import com.app.project.homematch.web.DTO.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final OpenAIService openAIService;
    //TODO: Should inject UserService not userRepository
    private final UserRepository userRepository;
    private final PostRepository postRepository;


    @Override
    public OpenAIResponse analyzePost(String text) {
        return openAIService.analyzePost(text);
    }

    @Transactional
    @Override
    public void savePost(PostDTO postDTO) {

        Optional<User> user = userRepository.findById(UserId.toUserId(postDTO.getCreatorId()));
        Post post = PostMapper.toEntity(postDTO, user.get());

        postRepository.save(post);

    }

    @Override
    public PostDTO createNewPost(FormPostRequest formPostRequest, OpenAIResponse response) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        //TODO:Implement this
//        PostDTO postDTO = new PostDTO();
//        postDTO.setTitle(formPostRequest.getTitle());
//        postDTO.setDescription(formPostRequest.getDescription());
//        postDTO.setLocation(response.getLocation());
//        postDTO.setPrice(BigDecimal.valueOf(response.getPrice()));
//        postDTO.setCurrency(Currency.valueOf(response.getCurrency()));
//        postDTO.setCreatorId(user.getId());
//        postDTO.setPostedOn(LocalDate.now());



//        return PostMapper.toDTO();
        return PostDTO.builder().build();
    }

}

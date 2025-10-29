package com.app.project.homematch.web.RestController;

import com.app.project.homematch.service.PostService;
import com.app.project.homematch.web.DTO.FormPostRequest;
import com.app.project.homematch.web.DTO.OpenAIResponse;
import com.app.project.homematch.web.DTO.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/post/create")
    public ResponseEntity<String> createNewPost(@RequestBody FormPostRequest formPostRequest) {

        String postText = formPostRequest.getTitle() + formPostRequest.getDescription();

        OpenAIResponse response = postService.analyzePost(postText);

        if (response.getIsAccommodationPost()) {
            PostDTO postDTO = postService.createNewPost(formPostRequest, response);

            postService.savePost(postDTO);

            return ResponseEntity.ok("New post created");
        }

        return ResponseEntity.ok("This post can't be created");

    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test Passed");
    }
}

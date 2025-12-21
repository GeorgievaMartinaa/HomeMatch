package com.app.project.homematch.web.restController;

import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.web.requests.FormPostRequest;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.web.responses.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<String> createNewPost(@RequestBody FormPostRequest formPostRequest) {

        String postText = formPostRequest.getTitle() + formPostRequest.getDescription();

        OpenAIResponse response = postService.analyzePost(postText);

        if (response.getIsAccommodationPost()) {
            postService.newPostFromRequest(formPostRequest, response);

            return new ResponseEntity("New post created", HttpStatus.CREATED);
        }

        return new ResponseEntity("This post can't be created", HttpStatus.BAD_REQUEST);

    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> allPosts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                       @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<PostDTO> postDTOPage = postService.getAllPosts(pageSize, pageNumber);
        return new ResponseEntity(postDTOPage.map(PostMapper::toPostResponse), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> post(@PathVariable Long id){
        return new ResponseEntity(PostMapper.toPostResponse(postService.getById(id)), HttpStatus.OK);
    }
}

package com.app.project.homematch.web.restController;

import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.entity.SortDirection;
import com.app.project.homematch.service.PostService;
import com.app.project.homematch.service.mapper.PostMapper;
import com.app.project.homematch.web.requests.FormPostRequest;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.web.responses.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<String> createNewPost(@RequestBody FormPostRequest formPostRequest) {
        String SUCCESS_MESSAGE = "Your post is successfully created!";
        String FAILED_MESSAGE = "Oops! This platform is for accommodation rentals. Your post doesn't appear to be related to renting a property.";

        String postText = formPostRequest.getTitle() + formPostRequest.getDescription();

        OpenAIResponse response = postService.analyzePost(postText);

        if (!response.getIsAccommodationPost()) {
            return new ResponseEntity(FAILED_MESSAGE, HttpStatus.BAD_REQUEST);
        }

        postService.newPostFromRequest(formPostRequest, response);
        return new ResponseEntity(SUCCESS_MESSAGE, HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> allPosts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                       @RequestParam(defaultValue = "10") Integer pageSize,
                                                       @RequestParam(defaultValue = "DESC") SortDirection direction,
                                                       @RequestParam(defaultValue = "createdDate") String sortBy,
                                                       @RequestParam(defaultValue = "") String location) {
        Page<PostDTO> postDTOPage = postService.getAllPosts(pageSize, pageNumber, direction.name(), sortBy, location);
        return new ResponseEntity(postDTOPage.map(PostMapper::toPostResponse), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> post(@PathVariable Long id) {
        return new ResponseEntity(PostMapper.toPostResponse(postService.getById(id)), HttpStatus.OK);
    }

    @GetMapping("/my")
    public ResponseEntity<PostResponse> allPostsByUser(@RequestParam(defaultValue = "0") Integer pageNumber,
                                                       @RequestParam(defaultValue = "10") Integer pageSize,
                                                       @AuthenticationPrincipal UserDetails userDetails) {
        Page<PostDTO> postDTOPage= postService.getAllPostsByUser(pageSize, pageNumber, userDetails.getUsername());
        return new ResponseEntity(postDTOPage.map(PostMapper::toPostResponse), HttpStatus.OK);

    }
}

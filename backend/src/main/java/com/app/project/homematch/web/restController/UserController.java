package com.app.project.homematch.web.restController;

import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.mapper.UserMapper;
import com.app.project.homematch.web.requests.EditUserRequest;
import com.app.project.homematch.web.responses.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> userInfo(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(UserMapper.toUserResponse(
                userService.findByUsername(userDetails.getUsername())), HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<UserResponse> editUserInfo(@AuthenticationPrincipal UserDetails userDetails, @RequestBody EditUserRequest request) {
        return new ResponseEntity<>(UserMapper.toUserResponse(userService.editUser(userDetails.getUsername(), request)), HttpStatus.OK);
    }
}

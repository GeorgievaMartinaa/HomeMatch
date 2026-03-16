package com.app.project.homematch.service;

import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.web.requests.EditUserRequest;

public interface UserService {

    UserDTO findById(Long id);
    UserDTO findByUsername(String username);
    UserDTO editUser(String username, EditUserRequest request);
}

package com.app.project.homematch.service;

import com.app.project.homematch.entity.DTO.UserDTO;

public interface UserService {

    UserDTO findById(Long id);
    UserDTO findByUsername(String username);
}

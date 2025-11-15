package com.app.project.homematch.service.mapper;

import com.app.project.homematch.entity.User;
import com.app.project.homematch.web.DTO.UserDTO;

public class UserMapper {

    public static UserDTO toUserDTO (User user){
        return UserDTO.builder()
                .id(user.getId().getValue())
                .username(user.getUsername())
                .build();
    }
}

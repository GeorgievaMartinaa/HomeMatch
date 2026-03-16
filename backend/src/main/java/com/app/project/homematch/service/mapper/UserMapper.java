package com.app.project.homematch.service.mapper;

import com.app.project.homematch.entity.User;
import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.web.responses.UserResponse;

public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        boolean hasBirthDate = user.getBirthDate() != null;

        return UserDTO.builder()
                .id(user.getId().getValue())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .aboutMe(user.getAboutMe())
                .email(user.getContact().getEmail())
                .phoneNumber(user.getContact().getPhoneNumber())
                .birthDate(hasBirthDate ? user.getBirthDate().getBirthDate() : null)
                .age(hasBirthDate ? user.getBirthDate().getAge() : 0)
                .build();
    }

    public static UserResponse toUserResponse(UserDTO userDTO) {
        return UserResponse.builder()
                .username(userDTO.getUsername())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .aboutMe(userDTO.getAboutMe())
                .email(userDTO.getEmail())
                .phoneNumber(userDTO.getPhoneNumber())
                .birthDate(userDTO.getBirthDate())
                .age(userDTO.getAge())
                .build();
    }
}

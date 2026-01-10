package com.app.project.homematch.entity.DTO;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDTO {
    private Long id;
    private String username;
}

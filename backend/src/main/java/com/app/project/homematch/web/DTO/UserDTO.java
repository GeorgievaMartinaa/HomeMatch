package com.app.project.homematch.web.DTO;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserDTO {
    private Long id;
    private String username;
}

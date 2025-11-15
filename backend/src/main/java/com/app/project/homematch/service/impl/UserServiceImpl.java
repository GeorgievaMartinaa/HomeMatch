package com.app.project.homematch.service.impl;

import com.app.project.homematch.repository.UserRepository;
import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.mapper.UserMapper;
import com.app.project.homematch.valueObject.UserId;
import com.app.project.homematch.entity.DTO.UserDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO findById(Long id) {
        return UserMapper.toUserDTO(userRepository.findById(UserId.toUserId(id))
                .orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public UserDTO findByUsername(String username) {
        return UserMapper.toUserDTO(userRepository.findByUsername(username)
                .orElseThrow(EntityNotFoundException::new));
    }
}

package com.app.project.homematch.service.impl;

import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.entity.User;
import com.app.project.homematch.exceptions.EmailAlreadyExistException;
import com.app.project.homematch.repository.UserRepository;
import com.app.project.homematch.service.UserService;
import com.app.project.homematch.service.mapper.UserMapper;
import com.app.project.homematch.valueObject.BirthDate;
import com.app.project.homematch.valueObject.ContactInfo;
import com.app.project.homematch.valueObject.UserId;
import com.app.project.homematch.web.requests.EditUserRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        return UserMapper.toUserDTO(userRepository.findById(UserId.toUserId(id))
                .orElseThrow(EntityNotFoundException::new));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO findByUsername(String username) {
        return UserMapper.toUserDTO(userRepository.findByUsername(username)
                .orElseThrow(EntityNotFoundException::new));
    }

    @Override
    @Transactional
    public UserDTO editUser(String username, EditUserRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);

        if (!user.getContact().getEmail().equals(request.getEmail()) && userRepository.existsByContact_Email(request.getEmail())) {
            throw  new EmailAlreadyExistException();
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setContact(new ContactInfo(request.getEmail(), request.getPhoneNumber()));
        user.setAboutMe(request.getAboutMe());
        user.setBirthDate(new BirthDate(request.getBirthDate()));

        User savedUser = userRepository.save(user);

        return UserMapper.toUserDTO(savedUser);
    }
}

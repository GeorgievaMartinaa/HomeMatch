package com.app.project.homematch.service.impl;

import com.app.project.homematch.config.security.JwtService;
import com.app.project.homematch.entity.Role;
import com.app.project.homematch.entity.User;
import com.app.project.homematch.repository.UserRepository;
import com.app.project.homematch.service.AuthenticationService;
import com.app.project.homematch.utils.TsidGenerator;
import com.app.project.homematch.valueObject.BirthDate;
import com.app.project.homematch.valueObject.ContactInfo;
import com.app.project.homematch.valueObject.UserId;
import com.app.project.homematch.web.requests.AuthenticationRequest;
import com.app.project.homematch.web.responses.AuthenticationResponse;
import com.app.project.homematch.web.requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User();

        user.setId(UserId.toUserId(TsidGenerator.getInstance().generateNewTsid()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAboutMe(request.getAbout());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setContact(ContactInfo.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .build());
        user.setBirthDate(BirthDate.builder().birthDate(request.getBirthDate()).build());
        user.setRole(Role.User);

        repository.save(user);

        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = repository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token = jwtService.generateToken(user);
        return new AuthenticationResponse(token);
    }
}

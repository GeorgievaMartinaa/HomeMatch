package com.app.project.homematch.service.impl;

import com.app.project.homematch.config.security.JwtService;
import com.app.project.homematch.entity.Role;
import com.app.project.homematch.entity.User;
import com.app.project.homematch.exceptions.BadCredentialsException;
import com.app.project.homematch.exceptions.EmailAlreadyExistException;
import com.app.project.homematch.exceptions.UserNotFoundException;
import com.app.project.homematch.exceptions.UserNotVerifiedException;
import com.app.project.homematch.exceptions.UsernameAlreadyExistsException;
import com.app.project.homematch.repository.UserRepository;
import com.app.project.homematch.service.AuthenticationService;
import com.app.project.homematch.service.EmailService;
import com.app.project.homematch.utils.TsidGenerator;
import com.app.project.homematch.valueObject.ContactInfo;
import com.app.project.homematch.valueObject.UserId;
import com.app.project.homematch.web.requests.AuthenticationRequest;
import com.app.project.homematch.web.requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Override
    public void register(RegisterRequest request) {

        if(usernameExist(request.getUsername())){
            throw new UsernameAlreadyExistsException(request.getUsername());
        }

        if(emailExist(request.getEmail())){
            throw new EmailAlreadyExistException();
        }

        User user = new User();

        user.setId(UserId.toUserId(TsidGenerator.getInstance().generateNewTsid()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setContact(ContactInfo.builder()
                .email(request.getEmail())
                .build());
        user.setRole(Role.User);
        user.setVerified(false);

        repository.save(user);

        String token = jwtService.generateVerificationToken(user.getUsername());
        emailService.sendVerificationEmail(token, user.getContact().getEmail());
    }

    private boolean usernameExist(String username){

        return repository.existsByUsername(username);
    }

    private boolean emailExist(String email){
        return repository.existsByContact_Email(email);
    }

    @Override
    public String login(AuthenticationRequest request) {
        User user = getUser(request.getUsername());

        if (!user.isVerified())
            throw new UserNotVerifiedException();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        }catch (AuthenticationException e){
            throw new BadCredentialsException();
        }

        return jwtService.generateToken(user);
    }

    @Override
    public String verifyAccount(String token) {

        String username = jwtService.verifyTokenAndExtractUsername(token);

        User user = getUser(username);

        if (user.isVerified()) {
            return "Email is already verified";
        }

        user.verify();
        repository.save(user);
        return "Email verification successful";

    }

    @Override
    public void resendVerification(String username) {
        String token = jwtService.generateVerificationToken(username);

        User user = getUser(username);

        emailService.sendVerificationEmail(token, user.getContact().getEmail());
    }

    private User getUser(String username){
        return repository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));

    }
}

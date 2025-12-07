package com.app.project.homematch.repository;

import com.app.project.homematch.entity.User;
import com.app.project.homematch.valueObject.UserId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UserId> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByContact_Email(String email);

}

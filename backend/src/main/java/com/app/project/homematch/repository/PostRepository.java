package com.app.project.homematch.repository;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.valueObject.PostId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, PostId> {
}

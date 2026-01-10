package com.app.project.homematch.repository;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.valueObject.PostId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, PostId> {
    @Query(value = """
            SELECT p.id, p.title, p.description, p.updated_date as last_time_updated, p.location, p.price_amount, p.price_currency, p.creator_id,
            u.first_name as creator_first_name, u.last_name as creator_last_name, u.phone_number as creator_phone_number, u.email as creator_email,
            p.fetched_from, p.original_post_url
            FROM post p JOIN user u ON p.creator_id = u.id
            WHERE p.id = :id
            """,
            nativeQuery = true)
    Optional<PostProjection> getById(@Param(value = "id")Long id);
}

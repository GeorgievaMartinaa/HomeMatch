package com.app.project.homematch.repository;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.valueObject.PostId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, PostId> {
    @Query(value = """
            SELECT p.id, p.title, p.description, p.updated_date, p.created_date, p.location, p.price_amount, p.price_currency, p.creator_id,
            p.fetched_from, p.original_post_url, p.price_mkd
            FROM post p
            WHERE p.id = :id
            """,
            nativeQuery = true)
    Optional<Post> getById(@Param(value = "id")Long id);

    Page<Post> findAllByLocationContains(String location, Pageable pageable);

    Page<Post> findAllByCreatorId(Long creatorId, Pageable pageable);

    @Query(nativeQuery = true, value = """
                    SELECT IF(COUNT(*) > 0, 'true', 'false')
                    FROM post p join user u on p.creator_id = u.id
                    WHERE p.id = :id AND u.username = :creatorUsername
        """)
    Boolean existsByIdAndCreator(@Param("id") Long id, @Param("creatorUsername") String creatorUsername );
}

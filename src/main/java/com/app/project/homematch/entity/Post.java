package com.app.project.homematch.entity;

import com.app.project.homematch.valueObject.Money;
import com.app.project.homematch.valueObject.PostId;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;

@Entity
@Table(name = "post")
@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class Post {

    @EmbeddedId
    private PostId id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "created_date")
    @CreatedDate
    private Instant createdDate;
    @Column(name = "updated_date")
    @LastModifiedDate
    private Instant updatedDate;
    @Column(name = "location")
    private String location;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "amount", column = @Column(name = "price_amount")),
            @AttributeOverride(name = "currency", column = @Column(name = "price_currency"))
    })
    private Money price;
    @Column(name = "original_post_url")
    private String originalPostURL;
    @Column(name = "fetched_from")
    private String fetchedFrom;
    @Column(name = "creator_id")
    private Long creatorId;

    public Post(String title, String description, String location, Money price, String originalPostURL, String fetchedFrom) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.originalPostURL = originalPostURL;
        this.fetchedFrom = fetchedFrom;
    }

    public Post(String title, String description, String location, Money price, Long creatorId) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
        this.creatorId = creatorId;
    }
}

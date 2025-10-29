package com.app.project.homematch.service.mapper;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.entity.User;
import com.app.project.homematch.valueObject.Money;
import com.app.project.homematch.web.DTO.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;

@Component
@RequiredArgsConstructor
public class PostMapper {

    public static Post toEntity(PostDTO postDTO, User postCreator) {

        return Post.builder()
                .title(postDTO.getTitle())
                .description(postDTO.getDescription())
                .creatorId(postCreator.getId().getValue())
                .fetchedFrom(postDTO.getExternalApi())
                .location(postDTO.getLocation())
                .originalPostURL(postDTO.getOriginalPostUrl())
                .price(new Money(postDTO.getPrice(), postDTO.getCurrency()))
                .build();
    }

    public static PostDTO toDTO(Post post) {
       return PostDTO.builder()
               .id(post.getId().getValue())
               .title(post.getTitle())
               .description(post.getDescription())
               .location(post.getLocation())
               .creatorId(post.getCreatorId())
               .price(post.getPrice().getAmount())
               .currency(post.getPrice().getCurrency())
               .externalApi(post.getFetchedFrom())
               .originalPostUrl(post.getOriginalPostURL())
               .postedOn(LocalDate.ofInstant(post.getCreatedDate(), ZoneId.systemDefault()))
               .build();
    }
}

package com.app.project.homematch.service.mapper;

import com.app.project.homematch.entity.Post;
import com.app.project.homematch.valueObject.Currency;
import com.app.project.homematch.valueObject.Money;
import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.entity.DTO.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class PostMapper {

    public static Post toEntity(PostDTO postDTO) {

        return Post.builder()
                .title(postDTO.getTitle())
                .description(postDTO.getDescription())
                .creatorId(postDTO.getCreatorId())
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
               .build();
    }

    public static PostDTO toDTO(FetchedPostDTO fetchedPostDTO, OpenAIResponse aiResponse){
        return PostDTO.builder()
                .title(fetchedPostDTO.getTitle())
                .description(fetchedPostDTO.getDescription())
                .externalApi(fetchedPostDTO.getFetchedFrom())
                .originalPostUrl(fetchedPostDTO.getUrlLink())
                .location(aiResponse.getLocation())
                .price(BigDecimal.valueOf(aiResponse.getPrice()))
                .currency(Currency.valueOf(aiResponse.getCurrency()))
                .build();
    }
}

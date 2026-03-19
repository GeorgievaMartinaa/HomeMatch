package com.app.project.homematch.service.mapper;

import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import com.app.project.homematch.entity.DTO.PostDTO;
import com.app.project.homematch.entity.DTO.UserDTO;
import com.app.project.homematch.entity.Post;
import com.app.project.homematch.valueObject.Currency;
import com.app.project.homematch.valueObject.Money;
import com.app.project.homematch.web.responses.OpenAIResponse;
import com.app.project.homematch.web.responses.PostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;

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
        .price(new Money(postDTO.getPrice(), Currency.valueOf(postDTO.getCurrency())))
        .build();
  }

  public static PostDTO toDTO(Post post, UserDTO userDTO) {
    return PostDTO.builder()
        .id(post.getId() != null ? post.getId().value : null)
        .title(post.getTitle())
        .description(post.getDescription())
        .location(post.getLocation())
        .creatorId(post.getCreatorId())
        .creatorName(creatorFullName(userDTO.getFirstName(), userDTO.getLastName()))
        .creatorEmail(userDTO.getEmail())
        .creatorPhoneNumber(userDTO.getPhoneNumber())
        .price(post.getPrice().getAmount())
        .currency(post.getPrice().getCurrency().name())
        .lastTimeUpdated(LocalDateTime.ofInstant(post.getUpdatedDate(), ZoneId.of("Europe/Skopje")))
        .createdAt(LocalDateTime.ofInstant(post.getCreatedDate(), ZoneId.of("Europe/Skopje")))
        .build();
  }

  private static String creatorFullName(String creatorFirstName, String creatorLastName) {

    if (creatorFirstName != null && creatorLastName != null) {
      return creatorFirstName + " " + creatorLastName;
    }

    return null;
  }

  public static PostDTO toDTO(Post post) {
    return PostDTO.builder()
        .id(post.getId() != null ? post.getId().getValue() : null)
        .title(post.getTitle())
        .description(post.getDescription())
        .location(post.getLocation())
        .creatorId(post.getCreatorId())
        .price(post.getPrice().getAmount())
        .currency(post.getPrice().getCurrency().name())
        .externalApi(post.getFetchedFrom())
        .originalPostUrl(post.getOriginalPostURL())
        .lastTimeUpdated(LocalDateTime.ofInstant(post.getUpdatedDate(), ZoneId.of("Europe/Skopje")))
        .createdAt(LocalDateTime.ofInstant(post.getCreatedDate(), ZoneId.of("Europe/Skopje")))
        .build();
  }

  public static PostDTO toDTO(FetchedPostDTO fetchedPostDTO, OpenAIResponse aiResponse) {
    return PostDTO.builder()
        .title(fetchedPostDTO.getTitle())
        .description(fetchedPostDTO.getDescription())
        .externalApi(fetchedPostDTO.getFetchedFrom())
        .originalPostUrl(fetchedPostDTO.getUrlLink())
        .location(aiResponse.getLocation())
        .price(BigDecimal.valueOf(aiResponse.getPrice()))
        .currency(aiResponse.getCurrency())
        .build();
  }

  public static PostResponse toPostResponse(PostDTO postDTO) {
    return PostResponse.builder()
        .id(String.valueOf(postDTO.getId()))
        .title(postDTO.getTitle())
        .description(postDTO.getDescription())
        .lastTimeUpdated(postDTO.getLastTimeUpdated())
        .createdAt(postDTO.getCreatedAt())
        .priceAmount(postDTO.getPrice())
        .priceCurrency(postDTO.getCurrency())
        .location(postDTO.getLocation())
        .creatorId(postDTO.getCreatorId() != null ? String.valueOf(postDTO.getCreatorId()): null)
        .creatorName(postDTO.getCreatorName())
        .creatorEmail(postDTO.getCreatorEmail())
        .creatorPhoneNumber(postDTO.getCreatorPhoneNumber())
        .fetchedFrom(postDTO.getExternalApi())
        .originalPostUrl(postDTO.getOriginalPostUrl())
        .build();
  }
}

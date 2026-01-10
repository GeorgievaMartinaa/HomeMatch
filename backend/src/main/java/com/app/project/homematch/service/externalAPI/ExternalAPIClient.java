package com.app.project.homematch.service.externalAPI;

import com.app.project.homematch.entity.DTO.FetchedPostDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ExternalAPIClient {
     List<FetchedPostDTO> fetchAllNewPosts();
}

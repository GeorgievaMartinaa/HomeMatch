package com.app.project.homematch.web.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FetchedPostDTO {
    private String title;
    private String description;
    private String fetchedFrom;
    private String urlLink;
}

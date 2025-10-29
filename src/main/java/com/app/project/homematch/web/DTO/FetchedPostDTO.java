package com.app.project.homematch.web.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FetchedPostDTO {
    private String id;
    private String title;
    private String description;
    private LocalDate created_on;
    private String fetchedFrom;
    private String urlLink;
}
